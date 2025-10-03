'use client'

import { RootState } from "@/app/Redux/store";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";


export default function NewsletterSection() {

const t = useTranslations("newsletter");

const cart = useSelector((state: RootState) => state.cart.items);


  console.log(cart)

  return (
    <section className="relative min-h-[800px] flex items-center justify-center bg-[url('/common/newsletter.jpg')] bg-cover lg:bg-center">
      {/* Background image */}
      

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-2xl w-full">
        <h2 className="text-2xl md:text-5xl font-bold mb-3 tracking-tighter">
          {t("title")}
        </h2>
        <p className="text-sm md:text-base mb-5">
          {t("description")}
        </p>

        {/* Input */}
        <form className="flex items-center justify-center ">
          <input
            type="email"
            placeholder={t("inputPlaceholder")}
            className="w-full md:w-[300px] px-4 py-3 text-black focus:outline-none rounded-l rounded-none" 
          />
          <button
            type="submit"
            className="bg-white text-black font-semibold px-4 py-3 rounded-r hover:bg-accentLight transition"
          >
            {t("btn")}
          </button>
        </form>
      </div>
    </section>
  )
}
