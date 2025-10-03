import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";      

const StandOutSection = () => {
  const t = useTranslations("standOut");


  return (
    <section className="flex flex-col lg:flex-row items-center justify-between  gap-10 bg-white">
      {/* Left - Image */}
      
      <div className="w-full lg:w-1/2 relative order-2 md:order-1">
        <Image
          src="/common/standOut1.jpg" 
          alt="Unique T-shirt Display"
          width={8000}
          height={8000}
          className="w-full h-auto object-cover max-h-[100dvh] shadow-2xl"
        />
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/15"></div>
      </div>

      {/* Right - Text and Button */}
       <div className="w-[90%] lg:w-1/2 text-center flex flex-col justify-center items-center order-1 md:order-2">
        <h2 className="text-center text-2xl lg:text-4xl w-[90%] lg:w-[50%] tracking-tighter mb-6 font-black uppercase text-titles">
          {t("title")}
        </h2>
        <p className="text-sm lg:text-base text-gray-700 mb-6 max-w-lg mx-auto lg:mx-0">
          {t("description")}
        </p>
        <button className="bg-[linear-gradient(to_right,_#ffd452,_#544a7d)]
             bg-[length:200%_200%]
             animate-gradientMove text-white hover:text-titles font-semibold py-2 px-6 hover:bg-accentLight transition">
          {t("button")}
        </button>
      </div>
    </section>
  );
};

export default StandOutSection;
