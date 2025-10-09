"use client";
import { setToken, setUser } from "@/app/Redux/Slices/userSlice";
import { AppDispatch } from "@/app/Redux/store";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "./FormInput";

const registerErrorMap: Record<string, string> = {
  "email already registered": "emailExists",
  "invalid credentials": "invalidCredentials",
  "invalid credential": "invalidCredentials",
  "credentials are invalid": "invalidCredentials",
};

interface Props { tNs?: string }
type RegisterFormData = {
  Name: string;
  Lastname: string;
  Email: string;
  Password: string;
  ConfirmPass: string;
}
const RegisterFrom = ({ tNs = 'auth.register' }: Props) => {
  const t = useTranslations(tNs);
  const tErrors = useTranslations('auth.errors');
  const [formData, setFormData] = useState<RegisterFormData>({
    Name: "",
    Lastname: "",
    Email: "",
    Password: "",
    ConfirmPass: "",
  });
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const formatErrorMessage = (value?: string | null) => {
    if (!value) return tErrors('general');
    const trimmed = value.trim().replace(/^error:\s*/i, "");
    if (!trimmed) return tErrors('general');
    const lower = trimmed.toLowerCase();
    const normalizedKey = lower.replace(/\.+$/, "");
    if (registerErrorMap[normalizedKey]) return tErrors(registerErrorMap[normalizedKey]);
    if (lower.includes("failed to fetch") || lower.includes("network")) return tErrors('network');
    if (lower.includes("too many")) return tErrors('tooManyRequests');
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

  const handleChange = (key: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));

  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-[90%] md:w-full max-w-sm mx-auto lg:mr-5 p-6 shadow-xl border-[0.5px] border-[#d1d5db80] rounded-lg bg-white/95 backdrop-blur-sm text-titles"
    >
      <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
      {(Object.entries(formData) as [keyof RegisterFormData, string][]).map(([key, value], index) => (
        <FormInput
          key={index}
          type={
            key === "Password" || key === "ConfirmPass"
              ? "password"
              : key === "Email"
                ? "email"
                : "text"
          }
          value={value}
          onChange={(e) => handleChange(key, e.currentTarget.value)}
          label={t(key)}
          name={String(key)}
          required
        />
      ))}
      <label className="flex items-center gap-2 text-sm mt-2">
        <input
          type="checkbox"
          checked={newsletterConsent}
          onChange={(e) => setNewsletterConsent(e.currentTarget.checked)}
          className="h-4 w-4"
        />
        <span>{t('newsletterConsent')}</span>
      </label>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      <button
        onClick={async () => {
          setError(null);
          setSuccess(null);
          const { Name, Lastname, Email, Password, ConfirmPass } = formData;
          if (!Name || !Lastname || !Email || !Password || !ConfirmPass) {
            setError(t('validationRequired'));
            return;
          }
          if (Password !== ConfirmPass) {
            setError(t('validationPasswords'));
            return;
          }
          try {
            setSubmitting(true);
            const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
            const res = await fetch(`${base}/auth/register`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                firstName: Name,
                lastName: Lastname,
                email: Email,
                password: Password,
                marketingOptIn: newsletterConsent || false,
              }),
            });
            if (!res.ok) {
              const serverMessage = await parseErrorResponse(res);
              setError(formatErrorMessage(serverMessage));
              return;
            }
            const data = await res.json();
            if (data?.token) dispatch(setToken(data.token));
            setSuccess(t('success'));
            // Assume backend returns user object
            if (data?.user) {
              dispatch(setUser({
                id: data.user.id || data.user._id || '',
                firstName: data.user.firstName || Name,
                lastName: data.user.lastName || Lastname,
                imageUrl: data.user.imageUrl || '/poses/3.jpg',
                address: data.user.address || { street: '', city: '', state: '', zip: '', phone: '' },
                email: data.user.email || Email,
              }));
            }
            setFormData({ Name: '', Lastname: '', Email: '', Password: '', ConfirmPass: '' });
            setNewsletterConsent(false);
            router.push('/profile');
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Error';
            console.error('Register error:', message);
            setError(formatErrorMessage(message));
          } finally {
            setSubmitting(false);
          }
        }}
        disabled={submitting}
        className="w-full py-2 mt-4 rounded bg-accent text-white hover:text-titles font-semibold px-6 hover:bg-accentLight transition disabled:opacity-60"
      >
        {submitting ? t('submitting') : t('submit')}
      </button>
      <Link href="/contact" className="block text-center mt-4 text-sm underline-offset-2 hover:underline">{t('help')}</Link>
    </motion.div>
  );
};

export default RegisterFrom;
