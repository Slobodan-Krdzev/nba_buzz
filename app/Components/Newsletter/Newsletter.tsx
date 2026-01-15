'use client'

import { useTranslations } from "next-intl";
import { useState } from "react";


export default function NewsletterSection() {

  const t = useTranslations("newsletter");

  
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <section className="relative h-[50vh] lg:min-h-[800px] flex items-center justify-center bg-[url('/common/newsletter.jpg')] bg-cover bg-center">
      {/* Background image */}


      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-2xl w-full">
        <h2 className="text-2xl md:text-5xl font-bold mb-3 tracking-tighter">
          {t("title")}
        </h2>
        <p className="text-sm md:text-base mb-5">
          {t("description")}
        </p>

        {/* Input */}
        <form className="flex items-center justify-center " onSubmit={async (e) => {
          e.preventDefault();
          setMessage(null);
          if (!email) {
            setMessage(t("validation"));
            return;
          }
          try {
            setSubmitting(true);
            const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
            const res = await fetch(`${base}/newsletter/subscribe`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error('Subscribe failed');
            setMessage(t("success"));
            setEmail('');
          } catch {
            setMessage(t("error"));
          } finally {
            setSubmitting(false);
          }
        }}>
          <input
            type="email"
            placeholder={t("inputPlaceholder")}
            className="w-full md:w-[300px] px-4 py-3 text-black focus:outline-none rounded-l rounded-none"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <button
            type="submit"
            className="bg-white text-black font-semibold px-4 py-3 rounded-r hover:bg-accentLight transition disabled:opacity-60"
            disabled={submitting}
          >
            {t("btn")}
          </button>
        </form>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </div>
    </section>
  )
}
