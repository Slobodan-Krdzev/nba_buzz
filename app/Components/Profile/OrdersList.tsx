"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar, Filter } from "lucide-react";
import { Order, OrderStatus } from "@/app/Types/Types";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";

export default function OrdersList() {
  const t = useTranslations("profile.orders");
  const authToken = useSelector((s: RootState) => s.user.token);
  const isAuthenticated = useSelector((s: RootState) => s.user.isAuthenticated);
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = 5;
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const statusToClasses: Record<OrderStatus, string> = {
    pending: 'bg-amber-100 text-amber-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const filtered = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [orders]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered; // already limited by backend

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(pageSize));
        params.set('sort', 'createdAt');
        params.set('order', 'desc');
        if (status !== 'all') params.set('status', status);
        if (from) params.set('from', from);
        if (to) params.set('to', to);
        const headers: Record<string, string> = {};
        if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
        const res = await fetch(`${base}/orders/mine/list?${params.toString()}`, { credentials: 'include', headers });
        if (!res.ok) throw new Error('Failed to load orders');
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
              size: typeof item.size === 'string' ? item.size : undefined,
              color: typeof item.color === 'string' ? item.color : undefined,
            };
          }),
        }));
        if (!cancelled) {
          setOrders(mapped);
          setTotal(Number(data?.total || mapped.length));
        }
      } catch {
        if (!cancelled) {
          setOrders([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [isAuthenticated, authToken, page, pageSize, status, from, to]);

  return (
    <section className="w-full bg-white rounded-2xl shadow-custom-white-light p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-6 mb-4">
        <div className="flex items-center gap-2 text-titles">
          <Filter className="w-4 h-4 text-accent" />
          <span className="font-semibold">{t("filters")}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as OrderStatus | "all");
              setPage(1);
            }}
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">{t("status.all")}</option>
            <option value="pending">{t("status.pending")}</option>
            <option value="confirmed">{t("status.confirmed")}</option>
            <option value="shipped">{t("status.shipped")}</option>
            <option value="delivered">{t("status.delivered")}</option>
            <option value="cancelled">{t("status.cancelled")}</option>
          </select>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            <input
              type="date"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setPage(1);
              }}
              className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <span className="text-sm text-titles">{t("to")}</span>
            <input
              type="date"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setPage(1);
              }}
              className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </div>

      <div className="divide-y">
        {loading && (
          <div className="py-8 text-center text-titles/70">{t('loading')}</div>
        )}
        {pageItems.map((order) => (
          <div key={order.id} className="py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusToClasses[order.status] || 'bg-gray-100 text-gray-800'}`}>
                  {t(`status.${order.status}`)}
                </span>
                <span className="text-sm text-titles">
                  {new Date(order.date).toLocaleDateString()}
                </span>
                <span className="text-sm text-titles font-semibold">#{order.id}</span>
              </div>
              <div className="text-sm font-bold text-titles">${order.total.toFixed(2)}</div>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {order.items.map((item, idx) => (
                <div key={`${item.productId}:${item.size || ''}:${item.color || ''}:${idx}`} className="flex items-center gap-3 p-2 rounded-lg border">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-titles line-clamp-1">{item.title}</p>
                    <p className="text-xs text-titles/70">x{item.quantity} · ${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-[10px] text-titles/60">Size: {item.size || '-'} · Color: {item.color || '-'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {pageItems.length === 0 && (
          <div className="py-8 text-center text-titles">{t("empty")}</div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          {t("prev")}
        </button>
        <div className="text-sm text-titles">
          {t("page", { current: currentPage, total: totalPages })}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border disabled:opacity-50"
        >
          {t("next")}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}


