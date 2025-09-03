"use client";
import Image from "next/image";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/pagination";

interface Props {
  images: string[];
}

const MobileProductGalery = ({ images }: Props) => {
  return (
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper mb-6 !h-[90%]">
      {images.map((i) => (
        <SwiperSlide key={i}>
          <Image src={i} alt={i} width={1080} height={1280} className=""/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MobileProductGalery;
