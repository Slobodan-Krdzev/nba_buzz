"use client";
import { Product } from "@/app/Types/Types";
import React, { useState } from "react";
import CounterAddButton from "./CounterAddButton";
import { useTranslations } from "next-intl";

interface DesktopSizesAndColorsProps {
  product: Product;
}

const DesktopSizesAndColors = ({ product }: DesktopSizesAndColorsProps) => {
  const t = useTranslations('product');
  const [itemColorSize, setItemColorSize] = useState({
    color: "",
    size: "",
  });

  return (
    <div className="mb-6">
      <h2 className="text-xl tracking-tighter mb-2 font-black capitalize">
        {t('sizes')}
      </h2>
      <div className="flex justify-start items-center gap-1">
        {Object.entries(product.sizes)
          .filter(([name]) => name.toLowerCase() !== "xs")
          .map(([name, quantity]) => ({ name, quantity }))
          .map((s) => (
            <button
              disabled={s.quantity === 0}
              key={s.name}
              className={`cursor-pointer flex justify-center items-center uppercase text-sm font-medium border-[1px]  p-1 w-[30px] h-[30px] ${
                s.quantity === 0
                  ? "bg-[#e0dede] border-gray-400 text-gray-500"
                  : "border-black"
              } ${
                itemColorSize?.size === s.name
                  ? "border-green-500 bg-green-200 text-green-600 shadow-lg shadow-green-100 scale-110 transition-all ease-in-out duration-75"
                  : ""
              }`}
              onClick={() =>
                setItemColorSize((prev) => ({ ...prev, size: s.name }))
              }
            >
              {s.name}
            </button>
          ))}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl tracking-tighter mb-2 font-black capitalize">
          {t('colors')}
        </h2>
        <div className="flex justify-start items-center gap-1">
          {product.colors.map((s) => (
            <button
              key={s.name}
              className={`rounded-full cursor-pointer flex justify-center items-center uppercase text-sm font-medium border-[1px] p-1 w-[30px] h-[30px] ${
                itemColorSize?.color === s.name
                  ? " !border-green-500 shadow-lg shadow-green-100 scale-110 transition-all ease-in-out duration-75"
                  : ""
              }`}
              style={{ backgroundColor: s.color }}
              onClick={() =>
                setItemColorSize((prev) => ({ ...prev, color: s.name }))
              }
            ></button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <CounterAddButton product={product} itemColorSize={itemColorSize}/>
      </div>
    </div>
  );
};

export default DesktopSizesAndColors;
