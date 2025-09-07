"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { title: "Products", link: "/products" },
  { title: "Our Story", link: "/about" },
  { title: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const pathname = usePathname();

  // const [showTitle, setShowTitle] = useState(pathname !== "/"); // 👈 show by default if not "/"

  // useEffect(() => {
  //   if (pathname !== "/") {
  //     // if not homepage → always show title, no scroll logic
  //     setShowTitle(true);
  //     return;
  //   }

  //   // homepage → add scroll listener
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setShowTitle(true);
  //     } else {
  //       setShowTitle(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll(); // check initial position

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [pathname]);

  //   "bg-white shadow-custom-green text-titles"

  return (
    <header
      className={`fixed z-[99999]  top-0 left-0 right-0  px-4 py-1.5 transition-colors text-titles bg-white shadow-custom-green
      `}
    >
      <div className="flex items-center justify-between relative">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2 basis-2/12">
          <Image
            src={"/common/nbaBuzzLogo.png"}
            alt="Logo"
            width={50}
            height={120}
          />
        </Link>

        {/* {showTitle && ( */}
        <AnimatePresence mode="wait">
          <div className="absolute left-1/2 -translate-x-1/2 inline-block basis-8/12">
            <motion.p
              key={"title"}
              initial={{ x: 0, y: -2, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-bold text-center text-accent"
            >
              NBABUZZ.mk
            </motion.p>
          </div>
        </AnimatePresence>
        {/* )} */}

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-6 basis-2/12 justify-end">
          {navItems.map((item) => (
            <Link
              href={item.link}
              key={item.title}
              className="font-medium cursor-pointer hover:scale-105 transition-transform ease-in-out duration-75"
            >
              {item.title}
            </Link>
          ))}
          <div className="flex gap-4 items-center">
            <Link href={"/cart"}>
              <ShoppingCart
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-transform ease-in-out duration-75"
                fill="white"
              />
            </Link>

            <Link href={"/login"}>
              <User
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-transform ease-in-out duration-75"
                fill="white"
              />
            </Link>
          </div>
        </nav>

        {/* Hamburger menu */}
        <button
          className="xl:hidden text-black"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Slide-in menu */}
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="border-2 fixed top-0 right-0 w-full h-full bg-white z-50 p-6 flex flex-col"
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
                <Link
                  href={item.link}
                  key={item.title}
                  className="font-medium cursor-pointer hover:scale-105 transition-transform ease-in-out duration-75"
                >
                  {item.title}
                </Link>
              ))}
              <Link href={"/cart"}>🛒 Cart</Link>
              <span>👤 Account</span>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
