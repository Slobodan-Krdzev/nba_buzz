"use client";
import SectionTitle from "@/app/Components/Common/SectionTitle";
import OrdersList from "@/app/Components/Profile/OrdersList";
import UserCard from "@/app/Components/Profile/UserCard";
import ContactForm from "@/app/Components/Contact/ContactForm";
import FavoritesSection from "@/app/Components/Profile/FavoritesSection";
import { Order, OrderStatus, UserProfile } from "@/app/Types/Types";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/Redux/Slices/userSlice";
import { AppDispatch } from "@/app/Redux/store";
import { useRouter } from "@/i18n/navigation";

// For now we provide dummy data. Replace with API fetch when ready.
function getDummyUser(): UserProfile {
  return {
    id: "u_001",
    firstName: "Jordan",
    lastName: "Smith",
    imageUrl: "/poses/3.jpg",
    address: {
      street: "123 Court Ave",
      street2: "",
      city: "Hoops City",
      state: "CA",
      zip: "90210",
      phone: "+1 (555) 234-9876",
    },
    email: "jordan.smith@example.com",
    phone: "+1 (555) 234-9876",
  };
}

// Dummy orders removed; now using backend data exclusively

export default function ProfilePage() {
  const t = useTranslations("profile");
  const storedUser = useSelector((s: RootState) => s.user.currentUser);
  const isAuthenticated = useSelector((s: RootState) => s.user.isAuthenticated);
  const authToken = useSelector((s: RootState) => s.user.token);
  const dispatch = useDispatch<AppDispatch>();
  const user = storedUser ?? getDummyUser();
  const [, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace('/login');
    }
  }, [mounted, isAuthenticated, router]);

  useEffect(() => {
    if (!mounted || !isAuthenticated) return;
    let cancelled = false;
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const headers: Record<string, string> = {};
        if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
        const res = await fetch(`${base}/users/me`, {
          credentials: 'include',
          headers,
        });
        if (!res.ok) return;
        const data = await res.json();
        console.log(data);
        const u = data?.user;
        if (!u) return;
        const addr = u.shippingAddress || {};
        const mapped = {
          id: u.id || u._id || '',
          firstName: u.firstName || '',
          lastName: u.lastName || '',
          imageUrl: u.imageUrl || '/poses/3.jpg',
          address: {
            street: addr.street1 || '',
            street2: addr.street2 || '',
            city: addr.city || '',
            state: addr.state || '',
            zip: addr.zip || '',
            phone: addr.phone || '',
          },
          email: u.email || '',
          phone: (addr.phone || ''),
          marketingOptIn: Boolean(u.marketingOptIn),
        } as const;
        if (!cancelled) {
          dispatch(setUser(mapped));
        }
      } catch {
        // ignore
      }
    })();
    return () => { cancelled = true; };
  }, [mounted, isAuthenticated, authToken, dispatch]);

  // Fetch user's orders with filters from UI (status, from, to) - simple fetch with current filters
  // For now, fetch latest 50 and filter client-side mirroring existing UI
  useEffect(() => {
    if (!mounted || !isAuthenticated) return;
    let cancelled = false;
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const headers: Record<string, string> = {};
        if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
        const res = await fetch(`${base}/orders/mine/list?limit=50&sort=createdAt&order=desc`, {
          credentials: 'include',
          headers,
        });
        if (!res.ok) return;
        const data = await res.json();
        const items = (data?.orders || []) as Array<Record<string, unknown>>;
        const mapped: Order[] = items.map((o) => ({
          id: String(o._id || o.id),
          date: String(o.placedAt || o.createdAt || new Date().toISOString()),
          status: String(o.status || 'pending').toLowerCase() as OrderStatus,
          total: Number(o.total) || 0,
          items: (Array.isArray(o.items) ? o.items : []).map((it: unknown) => {
            const item = it as Record<string, unknown>;
            return {
              productId: String(item.productId || item._id || ''),
              title: String(item.title || ''),
              quantity: Number(item.quantity) || 1,
              price: Number(item.price) || 0,
              imageUrl: String(item.imageUrl || '/poses/1.jpg'),
            };
          }),
        }));
        if (!cancelled) setOrders(mapped);
      } catch { }
    })();
    return () => { cancelled = true; };
  }, [mounted, isAuthenticated, authToken]);

  if (!mounted || !isAuthenticated) return null;

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionTitle title={t("title")} />
        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          <UserCard user={user} />

          <OrdersHeader />
          <OrdersList />
        </div>
      </main>

      <div>
        <FavoritesSection />
      </div>

      <div className="max-w-6xl mx-auto mb-6">
        <h3 className="text-xl font-bold text-titles mb-3">{t("helpTitle")}</h3>
        <p className="text-titles/80 mb-4">{t("helpText")}</p>
        <ContactForm />
      </div>
    </>
  );
}

function OrdersHeader() {
  const t = useTranslations("profile");
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-titles mb-3">{t("ordersTitle")}</h3>
    </div>
  );
}
