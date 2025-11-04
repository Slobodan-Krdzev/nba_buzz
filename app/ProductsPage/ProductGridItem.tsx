"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Product } from "../Types/Types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ProductGridItem {
  product: Product;
}

const ProductGridItem = ({ product }: ProductGridItem) => {
  const t = useTranslations("filters");
  const swiperRef = useRef<SwiperType | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const images = useMemo(() => {
    if (product.galleryImages && product.galleryImages.length > 0) {
      return product.galleryImages;
    }
    if (product.featuredImage) return [product.featuredImage];
    return [] as string[];
  }, [product.galleryImages, product.featuredImage]);

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
      className={`border rounded-xl p-2 sm:p-4 hover:shadow-lg transition ${product.isPromotion ? "bg-gradient-to-l from-[#FBB951] to-[#ffcc66]" : "bg-white"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* HOT Badge for promotions */}
        {product.isPromotion && (
        <div className="z-20 absolute text-white top-3 left-3 px-3 py-2 md:px-6 md:py-3 bg-[#FBB951] font-black  rounded-md shadow text-sm md:text-base">
          HOT!
        </div>
      )}
        
        {images.length > 1 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            loop
            pagination={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="rounded-md mb-2 sm:mb-3 md:mb-5 w-full h-[200px] sm:h-[280px] md:h-[350px] lg:h-[480px]"
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx} >
                <Image
                  src={src}
                  alt={`${product.title}-${idx}`}
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
            alt={product.title}
            width={400}
            height={500}
            className="rounded-md mb-2 sm:mb-3 md:mb-5 w-full h-[200px] sm:h-[280px] md:h-[350px] lg:h-[420px] object-cover"
          />
        )}
        {product.type?.name && !product.isPromotion && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            {product.type.name}
          </span>
        )}
        <span className="absolute bottom-2 right-2 bg-white shadow px-2 py-1 text-sm rounded">
          ⭐ {5}
        </span>
      </div>

      <h3 className={`mt-1 sm:mt-3 text-sm font-medium ${product.isPromotion ? "text-white" : ""}`}>{product.title}</h3>
      <p className={`${product.isPromotion ? "text-white" : "text-gray-700"}`}>€ {product.price}</p>
      <Link href={`/products/${product._id}`} className="block text-center mt-1 sm:mt-2 w-full bg-accent text-white py-1.5 sm:py-2 rounded hover:bg-[#e6ab62]">
        {t("buyNow")}
      </Link>
    </div>
  );
};

export default ProductGridItem;
