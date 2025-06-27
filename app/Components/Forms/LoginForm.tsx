'use client'
import React, { useState } from 'react'
import FormInput from './FormInput';
import { motion } from "framer-motion";

const LoginForm = () => {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-[90%] md:w-full max-w-sm mx-auto p-6 shadow-xl border-[0.5px] border-[#d1d5db80] rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium mb-1">Password</label>
        <span className="text-sm text-gray-500 cursor-pointer">Forgot Password?</span>
      </div>
      <FormInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full py-2 mt-4 rounded bg-accent text-white hover:text-titles font-semibold px-6 hover:bg-accentLight transition">Sign in</button>
      <p className="text-center mt-4 text-sm">I dont have an account? <span className="font-semibold cursor-pointer">Sign Up</span></p>
    </motion.div>
  );
}

export default LoginForm