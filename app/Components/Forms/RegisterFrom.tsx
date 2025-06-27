"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import FormInput from "./FormInput";

const RegisterFrom = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Lastname: "",
    Email: "",
    Password: "",
    ConfirmPass: "",
  });

  const handleChange = (key: string, value: string) => {
  setFormData((prev) => ({ ...prev, [key]: value }));

};


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-[90%] md:w-full max-w-sm mx-auto lg:mr-5 p-6 shadow-xl border-[0.5px] border-[#d1d5db80] rounded-lg text-titles"
    >
      <h2 className="text-3xl font-bold mb-6">Sign up</h2>
      {Object.entries(formData).map(([key, value], index) => (
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
          label={key}
          name={key}
        />
      ))}
      <button className="w-full py-2 mt-4 rounded bg-accent text-white hover:text-titles font-semibold px-6 hover:bg-accentLight transition">
        Register
      </button>
      <p className="text-center mt-4 text-sm">Help →</p>
    </motion.div>
  );
};

export default RegisterFrom;
