'use client'
import React, { useState } from 'react'
import FormInput from './FormInput';
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

interface Props { tNs?: string }
const LoginForm = ({ tNs = 'auth.login' }: Props) => {
 const t = useTranslations(tNs);
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-titles w-[90%] md:w-full max-w-sm mx-auto p-6 shadow-xl border-[0.5px] border-[#d1d5db80] rounded-lg">
      <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
      <FormInput label={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium mb-1">{t('password')}</label>
        <span className="text-sm text-gray-500 cursor-pointer">{t('forgot')}</span>
      </div>
      <FormInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full py-2 mt-4 rounded bg-accent text-white hover:text-titles font-semibold px-6 hover:bg-accentLight transition">{t('submit')}</button>
      <p className="text-center mt-4 text-sm">{t('noAccount')} <span className="font-semibold cursor-pointer">{t('signupCta')}</span></p>
    </motion.div>
  );
}

export default LoginForm