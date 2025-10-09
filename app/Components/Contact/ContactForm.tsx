'use client'
import React, { useState } from "react";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const t = useTranslations('contact.form');
  const [form, setForm] = useState({ name: '', lastname: '', email: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  return (
    <form className="w-[90%] mx-auto bg-white border rounded-lg shadow p-6 space-y-4 mt-[1vh]" onSubmit={async (e) => {
      e.preventDefault();
      setStatus(null);
      try {
        setSubmitting(true);
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const res = await fetch(`${base}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Failed');
        setStatus('Message sent! We will get back to you soon.');
        setForm({ name: '', lastname: '', email: '', message: '' });
      } catch {
        setStatus('Failed to send message. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          {t('name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 block w-full py-2 rounded-md border-gray-300 border shadow-sm focus:border-accent focus:ring-accent"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.currentTarget.value }))}
        />
      </div>
      <div>
        <label
          htmlFor="lastname"
          className="block text-sm font-medium text-gray-700"
        >
          {t('lastname')}
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          className="py-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
          required
          value={form.lastname}
          onChange={(e) => setForm((f) => ({ ...f, lastname: e.currentTarget.value }))}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {t('email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full py-2 rounded-md border-gray-300 border shadow-sm focus:border-accent focus:ring-accent"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.currentTarget.value }))}
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="mt-1 block w-full py-2 rounded-md border-gray-300 border shadow-sm focus:border-accent focus:ring-accent"
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.currentTarget.value }))}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-accent text-white font-bold py-2 px-4 rounded hover:bg-accent-dark transition disabled:opacity-60"
        disabled={submitting}
      >
        {t('submit')}
      </button>
      {status && <p className="text-sm text-gray-700">{status}</p>}
    </form>
  );
};

export default ContactForm;
