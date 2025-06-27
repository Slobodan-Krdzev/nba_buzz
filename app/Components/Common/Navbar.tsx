"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = ["Products", "Our Story"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white flex items-center justify-between px-4 py-3 shadow-custom-green z-20 text-titles">
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src={"/common/nbaBuzzLogo.png"}
          alt="Logo"
          width={50}
          height={120}
        />
        {/* <span className="font-bold">NBABUZZ.MK</span> */}
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <span key={item} className="font-medium cursor-pointer">
            {item}
          </span>
        ))}
        <div className="flex gap-4 items-center">
          <Search className="w-5 h-5 cursor-pointer" />
          <ShoppingCart className="w-5 h-5 cursor-pointer" fill="black" />

          <Link href={"/login"}>
            <User className="w-5 h-5 cursor-pointer" fill="black" />
          </Link>
        </div>
      </nav>

      {/* Hamburger menu */}
      <button className="md:hidden text-black" onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>

      {/* Slide-in menu */}
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-full h-full bg-white z-50 p-6 flex flex-col"
        >
          <div className="flex justify-between mb-8">
            <Link href={"/"} className="flex items-center gap-2">
              <Image
                src={"/common/nbaBuzzLogo.png"}
                alt="Logo"
                width={50}
                height={120}
              />
              <span className="font-bold">NBABUZZ.MK</span>
            </Link>

            <button onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>
          </div>
          <div className="flex flex-col gap-6 text-xl font-medium">
            {navItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
            <span>🔍 Search</span>
            <span>🛒 Cart</span>
            <span>👤 Account</span>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
