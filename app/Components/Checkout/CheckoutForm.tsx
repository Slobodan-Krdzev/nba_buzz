'use client'
import { RootState } from '@/app/Redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { clearCart } from '@/app/Redux/Slices/cartSlice';
import Image from 'next/image';

const CheckoutForm = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const authToken = useSelector((state: RootState) => state.user.token);
  const couponCode = useSelector((state: RootState) => state.cart.couponCode);
  const discountAmount = useSelector((state: RootState) => state.cart.discountAmount) || 0;
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations('checkout');

  const selectedItems = useMemo(() => cart.filter((i) => i.checked), [cart]);
  const cartCount = selectedItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = selectedItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const [shippingClasses, setShippingClasses] = useState<Array<{ _id: string, country: string, name: string, price: number }>>([]);
  const [country, setCountry] = useState<string>('');
  const shippingPrice = useMemo(() => {
    const prices = shippingClasses.filter(sc => sc.country === country).map(sc => Number(sc.price || 0));
    if (prices.length === 0) return 0;
    return Math.min(...prices);
  }, [shippingClasses, country]);
  const totalAfterDiscount = Math.max(0, cartTotal - discountAmount + shippingPrice);

  const [form, setForm] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    county: '',
    zip: '',
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      setForm((f) => ({
        ...f,
        name: f.name || user.firstName || '',
        lastname: f.lastname || user.lastName || '',
        email: f.email || user.email || '',
        phone: f.phone || user.address?.phone || user.phone || '',
        address: f.address || user.address?.street || '',
        city: f.city || user.address?.city || '',
        county: f.county || user.address?.state || '',
        zip: f.zip || user.address?.zip || '',
      }));
    }
  }, [isAuthenticated, user]);

  // Fetch shipping classes and try to preselect user's saved country
  useEffect(() => {
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const res = await fetch(`${base}/shipping-classes`);
        if (!res.ok) return;
        const data = await res.json();
        const scs = Array.isArray(data?.shippingClasses) ? data.shippingClasses : [];
        setShippingClasses(scs);
        // Attempt to fetch user's full profile for country if authenticated
        if (isAuthenticated && !country) {
          try {
            const headers: Record<string, string> = {};
            if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
            const meRes = await fetch(`${base}/users/me`, { credentials: 'include', headers });
            if (meRes.ok) {
              const me = await meRes.json();
              const c = me?.user?.shippingAddress?.country;
              if (c) setCountry(c);
            }
          } catch { }
        }
      } catch { }
    })();
  }, [isAuthenticated, authToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validate(): string | null {
    if (selectedItems.length === 0) return t('validation.noItems') as string;
    const required = ['name', 'lastname', 'email', 'phone', 'address', 'city', 'county', 'zip'] as const;
    for (const key of required) {
      if (!form[key] || !form[key].trim()) return t('validation.required') as string;
    }
    const emailOk = /.+@.+\..+/.test(form.email);
    if (!emailOk) return t('validation.email') as string;
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 6) return t('validation.phone') as string;
    if (!country) return t('validation.required') as string;
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) { setErrors(v); return; }
    setErrors(null);
    try {
      const items = selectedItems.map((ci) => ({
        productId: ci.product._id,
        title: ci.product.title as unknown as string,
        quantity: ci.qty,
        price: ci.product.price,
        size: ci.size,
        color: ci.color,
      }));
      const orderPayload: any = {
        items,
        shippingAddress: {
          email: form.email,
          firstName: form.name,
          lastName: form.lastname,
          street1: form.address,
          city: form.city,
          state: form.county,
          country: country,
          zip: form.zip,
          phone: form.phone,
        },
        notes: '',
      };
      if (couponCode) orderPayload.couponCode = couponCode;
      const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const orderHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
      if (authToken) orderHeaders['Authorization'] = `Bearer ${authToken}`;
      const res = await fetch(`${base}/orders`, {
        method: 'POST',
        headers: orderHeaders,
        credentials: 'include',
        body: JSON.stringify(orderPayload),
      });
      if (!res.ok) throw new Error('Order failed');
      // Update user's shipping address on success if authenticated
      if (isAuthenticated) {
        try {
          const headers: Record<string, string> = { 'Content-Type': 'application/json' };
          if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
          await fetch(`${base}/users/me`, {
            method: 'PUT',
            headers,
            credentials: 'include',
            body: JSON.stringify({
              shippingAddress: {
                email: form.email,
                firstName: form.name,
                lastName: form.lastname,
                street1: form.address,
                city: form.city,
                state: form.county,
                zip: form.zip,
                phone: form.phone,
              },
            }),
          });
        } catch { }
      }
      setShowModal(true);
      dispatch(clearCart());
      // Redirect based on auth status
      if (isAuthenticated) {
        router.push('/profile');
      } else {
        router.push('/');
      }
    } catch (err) {
      setErrors(t('validation.submitFailed') as string);
    }
  };

  return (
    <>
      <section className="w-full lg:w-1/2 flex justify-center items-center  px-4 md:px-12 py-8 order-1 md:order-1">
        <div className="w-full max-w-2xl  rounded-lg shadow p-6 bg-gray-50">
          <h1 className="text-3xl font-bold mb-6 text-center tracking-tighter">{t('title')}</h1>
          <div className="mb-6 flex flex-col gap-2">
            <p className="text-lg font-semibold">
              {t('itemsInCart')}: <span className="text-accent">{cartCount}</span>
            </p>
            {couponCode && (
              <p className="text-sm text-green-700 font-semibold">Coupon {couponCode}: -€{discountAmount?.toFixed(2)}</p>
            )}
            <p className="text-lg font-semibold">
              {t('total')}: <span className="text-accent">€{totalAfterDiscount}.00</span>
            </p>
            <p className="text-sm text-titles/80">Shipping: €{shippingPrice.toFixed(2)}</p>
          </div>

          {/* Items summary */}
          <div className="bg-white border border-gray-200 rounded-md p-3 mb-4">
            {selectedItems.length === 0 && (
              <div className="text-sm text-gray-600">{t('noItems')}</div>
            )}
            {selectedItems.map((item) => (
              <div key={item.product._id} className="flex items-center gap-3 py-2 border-b last:border-b-0">
                <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
                  <Image src={item.product.galleryImages?.[0] || item.product.featuredImage || '/placeholder.jpg'} alt={String(item.product.title)} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{item.product.title}</div>
                  <div className="text-xs text-gray-500">{t('qty')}: {item.qty}</div>
                </div>
                <div className="text-sm font-semibold">€{(item.product.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>

          {errors && <div className="text-red-600 text-sm mb-3">{errors}</div>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                name="name"
                placeholder={t('firstName')}
                value={form.name}
                onChange={handleChange}
                required
                className="w-1/2 border rounded px-3 py-2"
              />
              <input
                type="text"
                name="lastname"
                placeholder={t('lastName')}
                value={form.lastname}
                onChange={handleChange}
                required
                className="w-1/2 border rounded px-3 py-2"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder={t('email')}
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="tel"
              name="phone"
              placeholder={t('phone')}
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="address"
              placeholder={t('address')}
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="city"
                placeholder={t('city')}
                value={form.city}
                onChange={handleChange}
                required
                className="w-1/2 border rounded px-3 py-2"
              />
              <select
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-1/2 border rounded px-3 py-2 bg-white"
              >
                <option value="">{t('country') as unknown as string || 'Country'}</option>
                {Array.from(new Set(shippingClasses.map(sc => sc.country))).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <input
              type="text"
              name="zip"
              placeholder={t('zip')}
              value={form.zip}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            <button
              type="submit"
              className="w-full py-3 bg-accent text-white font-bold rounded mt-4 hover:scale-105 transition-transform"
              disabled={selectedItems.length === 0}
            >
              {t('orderNow')}
            </button>
          </form>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
            <svg className="mb-4 text-green-500" width="48" height="48" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="#22c55e" opacity="0.2" />
              <path d="M7 13l3 3 7-7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2 className="text-2xl font-bold mb-2 text-center">{t('confirmedTitle')}</h2>
            <p className="text-gray-700 mb-2 text-center">
              {t('confirmedText1')}
            </p>
            <p className="text-gray-700 mb-2 text-center">
              {t('confirmedText2')}
            </p>
            <p className="text-gray-700 mb-4 text-center">
              {t('confirmedHelp')} <br /> <span className="font-semibold text-accent">+389 77 123 123</span>
            </p>
            <button
              className="mt-2 px-6 py-2 bg-accent text-white rounded font-bold hover:scale-105 transition-transform"
              onClick={() => {
                setShowModal(false);
                setForm({
                  name: '',
                  lastname: '',
                  email: '',
                  phone: '',
                  address: '',
                  city: '',
                  county: '',
                  zip: '',
                });
                router.push('/');
              }}
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CheckoutForm