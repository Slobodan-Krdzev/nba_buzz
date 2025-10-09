'use client'
import React, { useState } from 'react'
import FormInput from './FormInput';
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/Redux/store';
import { setUser, setToken } from '@/app/Redux/Slices/userSlice';
import { useRouter } from 'next/navigation';

const loginErrorMap: Record<string, string> = {
  "invalid credentials": "invalidCredentials",
  "invalid credential": "invalidCredentials",
  "email already registered": "emailExists",
};

interface Props { tNs?: string }
const LoginForm = ({ tNs = 'auth.login' }: Props) => {
  const t = useTranslations(tNs);
  const tErrors = useTranslations('auth.errors');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const formatErrorMessage = (value?: string | null) => {
    if (!value) return tErrors('general');
    const trimmed = value.trim().replace(/^error:\s*/i, "");
    if (!trimmed) return tErrors('general');
    const lower = trimmed.toLowerCase();
    const normalizedKey = lower.replace(/\.+$/, "");
    if (loginErrorMap[normalizedKey]) return tErrors(loginErrorMap[normalizedKey]);
    if (lower.includes("failed to fetch") || lower.includes("network")) return tErrors('network');
    if (lower.includes("too many")) return tErrors('tooManyRequests');
    if (lower.includes("invalid credential") || lower === "invalid credentials") return tErrors('invalidCredentials');
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };

  const parseErrorResponse = async (res: Response) => {
    const contentType = res.headers.get("content-type") || "";
    try {
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (typeof data?.error?.message === "string") return data.error.message;
        if (typeof data?.message === "string") return data.message;
      }
      const text = await res.text();
      return text;
    } catch {
      return "";
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-titles w-[90%] md:w-full max-w-sm mx-auto p-6 shadow-xl border-[0.5px] border-[#d1d5db80] rounded-lg">
      <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
      <FormInput label={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium mb-1">{t('password')}</label>
        <span className="text-sm text-gray-500 cursor-pointer">{t('forgot')}</span>
      </div>
      <FormInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      <button
        onClick={async () => {
          setError(null);
          if (!email || !password) { setError(t('validationRequired') as string); return; }
          try {
            setSubmitting(true);
            const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
            const res = await fetch(`${base}/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
              const serverMessage = await parseErrorResponse(res);
              setError(formatErrorMessage(serverMessage));
              return;
            }
            const data = await res.json();
            console.log(data);
            if (data?.token) dispatch(setToken(data.token));
            else {
              // Fallback: fetch token endpoint (reads from httpOnly cookie server-side)
              try {
                const tkRes = await fetch(`${base}/auth/token`, { credentials: 'include' });
                if (tkRes.ok) {
                  const tk = await tkRes.json();
                  if (tk?.token) dispatch(setToken(tk.token));
                }
              } catch { }
            }
            if (data?.user) {
              const addr = data.user.shippingAddress || {};
              dispatch(setUser({
                id: data.user.id || data.user._id || '',
                firstName: data.user.firstName || '',
                lastName: data.user.lastName || '',
                imageUrl: data.user.imageUrl || '/poses/3.jpg',
                address: {
                  street: addr.street1 || '',
                  street2: addr.street2 || '',
                  city: addr.city || '',
                  state: addr.state || '',
                  zip: addr.zip || '',
                  phone: addr.phone || '',
                },
                email: data.user.email || email,
                phone: addr.phone || '',
              }));
            }
            router.push('/profile');
          } catch (e) {
            const msg = e instanceof Error ? e.message : 'Error';
            console.error('Login error:', msg);
            setError(formatErrorMessage(msg));
          } finally {
            setSubmitting(false);
          }
        }}
        disabled={submitting}
        className="w-full py-2 mt-4 rounded bg-accent text-white hover:text-titles font-semibold px-6 hover:bg-accentLight transition disabled:opacity-60"
      >
        {t('submit')}
      </button>
      <p className="text-center mt-4 text-sm">{t('noAccount')} <Link href="/register" className="font-semibold cursor-pointer underline-offset-2 hover:underline">{t('signupCta')}</Link></p>
    </motion.div>
  );
}

export default LoginForm
