"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar, Filter } from "lucide-react";
import { Order, OrderStatus } from "@/app/Types/Types";

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    let next = [...orders];
    if (status !== "all") {
      next = next.filter((o) => o.status === status);
    }
    if (from) {
      const fromDate = new Date(from).getTime();
      next = next.filter((o) => new Date(o.date).getTime() >= fromDate);
    }
    if (to) {
      const toDate = new Date(to).getTime();
      next = next.filter((o) => new Date(o.date).getTime() <= toDate);
    }
    return next.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [orders, status, from, to]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <section className="w-full bg-white rounded-2xl shadow-custom-white-light p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-6 mb-4">
        <div className="flex items-center gap-2 text-titles">
          <Filter className="w-4 h-4 text-accent" />
          <span className="font-semibold">Filters</span>
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
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="finished">Finished</option>
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
            <span className="text-sm text-titles">to</span>
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
        {pageItems.map((order) => (
          <div key={order.id} className="py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    order.status === "open"
                      ? "bg-accentLight text-titles"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.status === "open" ? "Open" : "Finished"}
                </span>
                <span className="text-sm text-titles">
                  {new Date(order.date).toLocaleDateString()}
                </span>
                <span className="text-sm text-titles font-semibold">#{order.id}</span>
              </div>
              <div className="text-sm font-bold text-titles">${order.total.toFixed(2)}</div>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3 p-2 rounded-lg border">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-titles line-clamp-1">{item.title}</p>
                    <p className="text-xs text-titles/70">
                      x{item.quantity} · ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {pageItems.length === 0 && (
          <div className="py-8 text-center text-titles">No orders found.</div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>
        <div className="text-sm text-titles">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border disabled:opacity-50"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}


