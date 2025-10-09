import React from "react";
import Image from "next/image";
import SectionTitle from "@/app/Components/Common/SectionTitle";
import AnimatedSlogans from "@/app/Components/Common/AnimatedSlogans";
import BouncingBasketball from "@/app/Components/Common/BouncingBasketball";
import { useTranslations } from "next-intl";
import FeaturedProducts from "@/app/Components/Common/FeaturedProducts";

const TheJokerPage = () => {
  const t = useTranslations("collections.joker");
  const slogans = [t("s1"), t("s2"), t("s3")];
  return (
    <>
      <section
        className="w-full flex flex-col justify-center items-center text-white relative bg-cover bg-center h-[calc(40dvh-70px)] md:h-[calc(60dvh-70px)] lg:h-[calc(100dvh-62.6px)]"
        style={{ backgroundImage: "url(/common/heroSection3.png)"}}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 text-center">
          <AnimatedSlogans items={slogans} />
        </div>
        <BouncingBasketball />
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 ">
        <SectionTitle title={t("title")} />

        <p className="m-auto w-[90%] md:w-[70%] lg:w-[50%] text-center">{t("intro")}</p>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-6">
        <div className="basis-1 lg:basis-[45%]">
          <SectionTitle title={t("unleashTitle")} />

          <p className="lg:w-[80%] m-auto text-center">{t("unleashText")}</p>
        </div>

        <div className="basis-1 lg:basis-[70%]">
          <Image src={'/common/newsletter.jpg'} alt="Image" width={1920} height={100} className="shadow-xl"/>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-6">
        <div className="basis-1 lg:basis-[70%] order-2 lg-order-1">
          <Image src={'/poses/9.jpg'} alt="Image" width={1920} height={100} className="shadow-xl"/>
        </div>
        <div className="basis-1 lg:basis-[60%] order-1 lg:order-2">
          <SectionTitle title={t("whyTitle")} />

        <p className="lg:w-[80%] m-auto text-center">{t("whyText")}</p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 ">
        <SectionTitle title={t("materialsTitle")} />

        <ul className="pl-6 space-y-2 text-lg w-[90%] lg:w-[60%] m-auto">
          <li className="text-center">{t("materials.soft")}</li>
          <li className="text-center">{t("materials.hoodies")}</li>
          <li className="text-center">{t("materials.prints")}</li>
          <li className="text-center">{t("materials.durable")}</li>
        </ul>
      </section>


      <FeaturedProducts />

    </>
  );
};

export default TheJokerPage;

