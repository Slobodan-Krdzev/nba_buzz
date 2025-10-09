"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import LocaleSwitcher from "./LocalleSwitcher";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import { clearUser, setToken } from "@/app/Redux/Slices/userSlice";

// Navigation items are built from translations to support localized headers

const Navbar = () => {
  const t = useTranslations("navbar");
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector((s: RootState) => s.user.isAuthenticated);
  const dispatch = useDispatch();
  const [accountOpen, setAccountOpen] = useState(false);
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
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed z-[99999]  top-0 left-0 right-0  px-4 py-1.5 transition-colors text-titles bg-white shadow-custom-green
      `}
    >
      <div className="flex items-center justify-between relative">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2 basis-2/12">
          <Image src={"/logo.png"} alt="Logo" width={50} height={120} />
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
              TROJKA.mk
            </motion.p>
          </div>
        </AnimatePresence>
        {/* )} */}

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-6  justify-end">
          <LocaleSwitcher />

          {[
            { title: t("shop"), link: "/products" },
            { title: t("aboutUs"), link: "/ourStory" },
            { title: t("contact"), link: "/contact" },
          ].map((item) => (
            <Link
              href={item.link}
              key={item.title}
              className="font-medium cursor-pointer hover:scale-105 transition-transform ease-in-out duration-75"
            >
              {item.title}
            </Link>
          ))}
          <div className="flex gap-4 items-center relative">
            <Link href={"/cart"}>
              <ShoppingCart
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-transform ease-in-out duration-75"
                fill="white"
              />
            </Link>

            <button
              type="button"
              aria-label="Account menu"
              onClick={() => setAccountOpen((v) => !v)}
              className="relative"
            >
              <User
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-transform ease-in-out duration-75"
                fill="white"
              />
            </button>

            {accountOpen && (
              <div className="absolute right-0 top-7 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-[100000]">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-titles hover:bg-gray-50"
                      onClick={() => setAccountOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={async () => {
                        try {
                          const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
                          await fetch(`${base}/auth/logout`, { method: 'POST', credentials: 'include' });
                        } catch { }
                        dispatch(clearUser());
                        dispatch(setToken(null));
                        try { sessionStorage.removeItem('currentUser'); sessionStorage.removeItem('authToken'); } catch { }
                        window.location.href = '/login';
                      }}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm text-titles hover:bg-gray-50"
                    onClick={() => setAccountOpen(false)}
                  >
                    Log In
                  </Link>
                )}
              </div>
            )}
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
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 z-[99998]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[85%] sm:w-[70%] max-w-[420px] bg-white z-[99999] p-6 flex flex-col shadow-2xl rounded-l-2xl border-l border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <Link href={"/"} className="flex items-center gap-2">
                  <Image src={"/logo.png"} alt="Logo" width={50} height={120} />
                  <span className="font-bold">TROJKA.mk</span>
                </Link>
                <div className="flex items-center gap-3">
                  <LocaleSwitcher />
                  <button
                    aria-label="Close navigation"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 hover:bg-gray-100 active:bg-gray-200"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              <nav className="flex flex-col gap-2 text-base">
                {[
                  { title: t("shop"), link: "/products" },
                  { title: t("aboutUs"), link: "/ourStory" },
                  { title: t("contact"), link: "/contact" },
                ].map((item) => (
                  <Link
                    href={item.link}
                    key={item.title}
                    className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="font-medium">{item.title}</span>
                    <span className="text-gray-400">›</span>
                  </Link>
                ))}
                <Link
                  href={"/cart"}
                  className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center gap-3 font-medium">
                    <ShoppingCart className="w-5 h-5" /> {t("cart")}
                  </span>
                  <span className="text-gray-400">›</span>
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center gap-3 font-medium">
                        <User className="w-5 h-5" /> Profile
                      </span>
                      <span className="text-gray-400">›</span>
                    </Link>
                    <button
                      className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-red-50 active:bg-red-100 transition text-left text-red-600"
                      onClick={async () => {
                        try {
                          const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
                          await fetch(`${base}/auth/logout`, { method: 'POST', credentials: 'include' });
                        } catch { }
                        dispatch(clearUser());
                        dispatch(setToken(null));
                        try { sessionStorage.removeItem('currentUser'); sessionStorage.removeItem('authToken'); } catch { }
                        setIsOpen(false);
                        window.location.href = '/login';
                      }}
                    >
                      <span className="flex items-center gap-3 font-medium w-full">
                        <User className="w-5 h-5" /> Log Out
                      </span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-3 font-medium">
                      <User className="w-5 h-5" /> Log In
                    </span>
                    <span className="text-gray-400">›</span>
                  </Link>
                )}
              </nav>
              <div className="mt-auto pt-6 text-xs text-gray-400">
                © {new Date().getFullYear()} TROJKA.mk
              </div>
            </motion.div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
