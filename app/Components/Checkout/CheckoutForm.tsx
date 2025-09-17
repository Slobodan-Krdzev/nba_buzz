'use client'
import { RootState } from '@/app/Redux/store';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const CheckoutForm = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
const router = useRouter();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormComplete = Object.values(form).every((v) => v.trim() !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormComplete) {
      setShowModal(true);
    }
  };

  return (
    <>
      <section className="w-full lg:w-1/2 flex justify-center items-center  px-4 md:px-12 py-8 order-1 md:order-1">
        <div className="w-full max-w-2xl  rounded-lg shadow p-6 bg-gray-50">
          <h1 className="text-3xl font-bold mb-6 text-center tracking-tighter">Checkout</h1>
          <div className="mb-6 flex flex-col gap-2">
            <p className="text-lg font-semibold">
              Items in Cart: <span className="text-accent">{cartCount}</span>
            </p>
            <p className="text-lg font-semibold">
              Total: <span className="text-accent">€{cartTotal}.00</span>
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                name="name"
                placeholder="First Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-1/2 border rounded px-3 py-2"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={form.lastname}
                onChange={handleChange}
                required
                className="w-1/2 border rounded px-3 py-2"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
                className="w-1/2 border rounded px-3 py-2"
              />
              <input
                type="text"
                name="county"
                placeholder="County"
                value={form.county}
                onChange={handleChange}
                required
                className="w-1/2 border rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-accent text-white font-bold rounded mt-4 hover:scale-105 transition-transform"
              disabled={!isFormComplete}
            >
              Order Now
            </button>
          </form>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
      <svg className="mb-4 text-green-500" width="48" height="48" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#22c55e" opacity="0.2"/>
        <path d="M7 13l3 3 7-7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <h2 className="text-2xl font-bold mb-2 text-center">Order Confirmed!</h2>
      <p className="text-gray-700 mb-2 text-center">
        Thank you for your order. We will contact you soon for delivery details.
      </p>
      <p className="text-gray-700 mb-2 text-center">
        We will send a confirmation email to you.
      </p>
      <p className="text-gray-700 mb-4 text-center">
        For any help, feel free to call us at <br /> <span className="font-semibold text-accent">+389 77 123 123</span>
      </p>
      <button
  className="mt-2 px-6 py-2 bg-accent text-white rounded font-bold hover:scale-105 transition-transform"
  onClick={() => {
    setShowModal(false);
    setForm({
      name: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      county: "",
    });
    router.push("/");
  }}
>
  Close
</button>
    </div>
  </div>
)}
    </>
  )
}

export default CheckoutForm