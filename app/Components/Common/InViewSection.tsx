"use client";
import { motion } from "framer-motion";
import React from "react";

interface InViewSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const InViewSection = ({ children, className = "", delay = 0 }: InViewSectionProps) => {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.section>
  );
};

export default InViewSection;


