"use client";
import { addFaveItem, removeFaveItem } from "@/app/Redux/Slices/counterSlice";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { Product } from "@/app/Types/Types";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";

interface SingleItemProps {
  item: Product;
}

const SingleItem = ({ item }: SingleItemProps) => {
  const t = useTranslations("filters");
  const swiperRef = useRef<SwiperType | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
const favouriteItems = useSelector((state: RootState) => state.counter.favouriteItems);

const isItemInFaves = favouriteItems.some((i) => i._id === item._id);
  
  useEffect(() => {
    if (!swiperRef.current || item.galleryImages.length < 2) return;
    if (isHovered) {
      swiperRef.current.autoplay.start();
    } else {
      swiperRef.current.autoplay.stop();
      swiperRef.current.slideTo(0); // reset to first image
    }
  }, [isHovered, item.galleryImages.length]);


  const onFaveClick = () => {

    if(isItemInFaves){

      dispatch(removeFaveItem(item))
    }else {

      dispatch(addFaveItem(item))

    }
  }
  //  "text-white bg-gradient-to-l from-[#ffd452] to-[#544a7d] border-none shadow-[0_4px_20px_rgba(84,74,125,0.5),0_4px_20px_rgba(255,212,82,0.6)]"
  // 
  return (
    <Link
      href={`/products/${item._id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`block relative p-3 rounded-xl border shadow-lg transition-all duration-300
        ${item.isPromotion
          ? "text-orange-900 bg-gradient-to-br from-[#FF6B35]/70 via-[#FFD89B]/80 to-[#FFCC80]/20 border-orange-200 shadow-[0_4px_20px_rgba(255,182,77,0.3),0_4px_20px_rgba(255,204,128,0.4)]"
          : "bg-white"
        }`}
    >
      {/* Promo Label */}
      {item.isPromotion && (
        <div className="z-20 absolute top-5 left-5 px-3 py-2 md:px-6 md:py-3 bg-gradient-to-br from-[#FF6B35]/70 via-[#FFD89B]/80 to-[#FFCC80]/60 text-white font-black rounded-md shadow-lg text-sm md:text-base">
          {t("onSale")}
        </div>
      )}

      {/* Image Swiper */}
      {item.galleryImages.length > 1 ? (
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="rounded-md mb-3 md:mb-5 w-full h-[400px] sm:h-[390px] md:h-[390px] lg:h-[480px]"
        >
          {item.galleryImages.map((src, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={src}
                alt={`${item.title}-${idx}`}
                width={1080}
                height={1280}
                className="rounded-md w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Image
          src={item.galleryImages[0] ?? "/placeholder.jpg"}
          alt={item.title}
          width={400}
          height={500}
          className="rounded-md mb-3 md:mb-5 w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[380px] object-cover"
        />
      )}

      {/* Favorite Button */}
      <button className="z-20 absolute rounded-full p-2 bg-white top-5 right-5  shadow-md" onClick={(e) => {
        e.stopPropagation()
         e.preventDefault();
        console.log('Clicked')
        onFaveClick()}}>
        <Heart className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" fill={isItemInFaves ? "#da5252": "white"} color={isItemInFaves ? "#da5252": "#9ca3af"} />
      </button>

      {/* Item Info */}
      <p className={`${item.isPromotion ? "text-orange-800" : "text-gray-500"} text-sm md:text-md`}>
        {item.type.name}
      </p>
      <p className={`font-semibold text-lg md:text-xl lg:text-2xl ${item.isPromotion ? "text-orange-900" : ""}`}>{item.title}</p>
      <div className={`absolute bottom-3 right-3 md:bottom-4 md:right-4 flex items-center gap-2 ${item.isPromotion ? "text-lg md:text-xl lg:text-2xl font-semibold tracking-tighter" : "lg:text-xl"}`}>
        {item.isPromotion && item.salePrice ? (
          <>
            <p className="text-[#FF6B35] font-bold">€ {item.salePrice}</p>
            <p className="text-orange-700 line-through opacity-70 text-sm md:text-base lg:text-lg">€ {item.price}</p>
          </>
        ) : (
          <p>€ {item.price}</p>
        )}
      </div>
    </Link>
  );
};

export default SingleItem;
