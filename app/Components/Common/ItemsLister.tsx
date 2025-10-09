"use client";
import { Product } from "@/app/Types/Types";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleItem from "./SingleItem";

import 'swiper/css';

interface ItemsListerProps {
  title: string;
  items: Product[];
}

const ItemsLister = ({ title, items = [] }: ItemsListerProps) => {
  return (
    <section className="lg:py-[9vh] py-[6vh]">
      <h2 className="ml-[20px] md:ml-[40px] lg:ml-[90px] text-2xl lg:text-4xl lg:w-[50%] tracking-tighter mb-3 lg:mb-6 font-black uppercase text-titles w-[80%]">
        {title}
      </h2>

      {/* <div className="flex gap-4"> */}
      <Swiper
        navigation={false}
        loop={false}
        breakpoints={{
          320: {
            slidesPerView: 1.3,
            spaceBetween: 12,
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 20,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 16,
            slidesOffsetBefore: 40,
            slidesOffsetAfter: 40,
          },
          800: {
            slidesPerView: 2.3,
            spaceBetween: 20,
            slidesOffsetBefore: 32,
            slidesOffsetAfter: 32,
          },
          1280: {
            slidesPerView: 3.5,
            spaceBetween: 15,
            slidesOffsetBefore: 90,
            slidesOffsetAfter: 90,
          },
          1500: {
            slidesPerView: 4.5,
            spaceBetween: 24,
            slidesOffsetBefore: 90,
            slidesOffsetAfter: 90,
          },
        }}
        className="!py-8"
      >
        {[...items]
          .sort((a, b) => (b.isPromotion ? 1 : 0) - (a.isPromotion ? 1 : 0))
          .map((item, idx) => (
            <SwiperSlide key={idx}>
              <SingleItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
      {/* </div> */}
    </section>
  );
};

export default ItemsLister;
