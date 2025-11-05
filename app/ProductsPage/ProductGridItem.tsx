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
      className={`border rounded-xl p-2 sm:p-4 hover:shadow-lg transition relative ${product.isPromotion ? "bg-gradient-to-br from-[#FFE5B4] via-[#FFD89B] to-[#FFCC80] border-orange-200" : "bg-white"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.isPromotion && (
        <div className="absolute bottom-8 h-[30%] w-[80%] left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#DAE2F8] via-[#ce4949] to-[#DAE2F8] filter blur-xl z-10 rounded-[25px]"></div>
      )}
      <div className="relative">
        {/* HOT Badge for promotions */}
        {product.isPromotion && (
        <div className="z-20 absolute text-white top-3 left-3 px-3 py-2 md:px-6 md:py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] font-black rounded-md shadow-lg text-sm md:text-base">
          {t("onSale")}
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

      <h3 className={`mt-1 sm:mt-3 text-sm lg:text-xl font-medium ${product.isPromotion ? "text-orange-900" : ""}`}>{product.title}</h3>
      <div className={`flex items-center gap-2 ${product.isPromotion ? "text-orange-900" : "text-gray-700"}`}>
        {product.isPromotion && product.salePrice ? (
          <>
            <p className="text-lg lg:text-2xl font-bold text-[#FF6B35]">€ {product.salePrice}</p>
            <p className="text-sm lg:text-lg line-through opacity-70">€ {product.price}</p>
          </>
        ) : (
          <p className="text-base lg:text-xl">€ {product.price}</p>
        )}
      </div>
      <Link href={`/products/${product._id}`} className={`block text-center mt-1 sm:mt-2 w-full py-1.5 sm:py-2 rounded transition ${
        product.isPromotion 
          ? "bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white hover:from-[#FF8C42] hover:to-[#FF6B35]" 
          : "bg-accent text-white hover:bg-[#e6ab62]"
      }`}>
        {t("buyNow")}
      </Link>
    </div>
  );
};

export default ProductGridItem;
