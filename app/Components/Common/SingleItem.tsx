"use client";
import { Product } from "@/app/Types/Types";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SingleItemProps {
  item: Product;
}

const SingleItem = ({ item }: SingleItemProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const images = useMemo(() => {
    const g = item.gallery;
    return [
      g.front,
      g.back,
      g.left,
      g.right,
      g.modelFront,
      g.modelBack,
      g.modelLeft,
      g.modelRight,
    ].filter(Boolean);
  }, [item.gallery]);

  useEffect(() => {
    if (!swiperRef.current || images.length < 2) return;
    if (isHovered) {
      swiperRef.current.autoplay.start();
    } else {
      swiperRef.current.autoplay.stop();
      swiperRef.current.slideTo(0); // reset to first image
    }
  }, [isHovered, images.length]);

  return (
    <Link
      href={""}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`block relative p-3 rounded-xl border shadow-lg transition-all duration-300
        ${item.isPromotion
          ? "text-white bg-gradient-to-l from-[#ffd452] to-[#544a7d] border-none shadow-[#fadd87]"
          : "bg-white"
        }`}
    >
      {/* Promo Label */}
      {item.isPromotion && (
        <div className="z-20 absolute top-0 left-0 px-3 py-2 md:px-6 md:py-3 bg-[#544a7d] font-black rounded-br-md rounded-tl-md shadow text-sm md:text-base">
          HOT!
        </div>
      )}

      {/* Image Swiper */}
      {images.length > 1 ? (
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="rounded-md mb-3 md:mb-5 w-full h-[400px] sm:h-[390px] md:h-[390px] lg:h-[480px]"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={src}
                alt={`${item.name}-${idx}`}
                width={400}
                height={500}
                className="rounded-md w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Image
          src={images[0] ?? "/placeholder.jpg"}
          alt={item.name}
          width={400}
          height={500}
          className="rounded-md mb-3 md:mb-5 w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[380px] object-cover"
        />
      )}

      {/* Favorite Button */}
      <button className="z-20 absolute rounded-full p-2 bg-white top-5 right-5  shadow-md">
        <Heart className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" color="#9ca3af" />
      </button>

      {/* Item Info */}
      <p className={`${item.isPromotion ? "text-white" : "text-gray-500"} text-sm md:text-md`}>
        {item.type}
      </p>
      <p className="font-semibold text-lg md:text-xl">{item.name}</p>
      <p className={`absolute bottom-3 right-3 md:bottom-4 md:right-4 ${item.isPromotion ? "text-lg md:text-xl font-semibold tracking-tighter" : ""}`}>
        € {item.price}
      </p>
    </Link>
  );
};

export default SingleItem;
