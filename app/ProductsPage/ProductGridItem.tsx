"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Product } from "../Types/Types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';

interface ProductGridItem {
  product: Product;
}

const ProductGridItem = ({ product }: ProductGridItem) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const images = useMemo(() => {
    const g = product.gallery;
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
  }, [product.gallery]);

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
    <div
      className="border rounded-xl p-4 hover:shadow-lg transition"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {images.length > 1 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            loop
            pagination={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="rounded-md mb-3 md:mb-5 w-full h-[400px] sm:h-[390px] md:h-[390px] lg:h-[480px]"
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx} >
                <Image
                  src={src}
                  alt={`${product.name}-${idx}`}
                  width={1080}
                  height={1280}
                  className=" w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Image
            src={images[0] ?? "/placeholder.jpg"}
            alt={product.name}
            width={400}
            height={500}
            className="rounded-md mb-3 md:mb-5 w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[380px] object-cover"
          />
        )}
        {product.name && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            {product.name}
          </span>
        )}
        <span className="absolute bottom-2 right-2 bg-white shadow px-2 py-1 text-sm rounded">
          ⭐ {5}
        </span>
      </div>

      <h3 className="mt-3 text-sm font-medium">{product.name}</h3>
      <p className="text-gray-700">$ {product.price}.00</p>
      <button className="mt-2 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        Buy now →
      </button>
    </div>
  );
};

export default ProductGridItem;
