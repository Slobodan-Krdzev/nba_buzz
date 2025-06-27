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
          <SwiperSlide key={cat.name} className="p-4">
            <div className="shadow-custom-white-light relative group overflow-hidden hover:scale-105 transition ease-in-out rounded-md">
              <Image
                src={cat.image}
                alt={cat.name}
                width={8000}
                height={200}
                className="w-full h-full object-cover max-h-[480px]"
              />
              <div className="absolute top-0 left-0 right-0 p-4">
                <Link                  href={cat.href}
                  className="text-titles text-lg font-semibold"
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
