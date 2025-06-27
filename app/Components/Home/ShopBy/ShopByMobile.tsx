// components/AutoSwiper.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ShopByCategory } from "./ShopBy";
import Image from "next/image";
import Link from "next/link";

interface ShopByMobileProps {
  categories: ShopByCategory[];
}

export default function ShopByMobile({ categories }: ShopByMobileProps) {
  return (
    <section className="lg:hidden">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        spaceBetween={30}
        className="lg:hidden block"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.name}>
            <div className="relative group overflow-hidden shadow-2xl hover:scale-105 transition ease-in-out">
              <Image
                src={cat.image}
                alt={cat.name}
                width={8000}
                height={200}
                className="w-full h-full object-cover max-h-[480px]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <Link
                  href={cat.href}
                  className="text-white text-lg font-semibold"
                >
                  {cat.name} →
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
