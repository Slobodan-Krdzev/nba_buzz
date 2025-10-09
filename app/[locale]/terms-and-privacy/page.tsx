// import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const TearmsAndPrivacy = () => {
  const t = useTranslations("terms");
  return (
    <section className="py-[8dvh] m-auto w-[90%] md:w-[60%] ">
      <div className="relative flex flex-col items-center gap-2 w-full">
        {/* <Image src={"/logo.png"} alt="Logo" width={120} height={120} /> */}
        <h1 className="text-4xl md:text-6xl font-bold text-center text-accent relative z-10 ">
          TROJKA.mk
        </h1>
        <h2 className="text-lg md:text-xl mb-[5vh] text-center tracking-tighter">
          {t("tagline")}
        </h2>
      </div>
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh]">
        {t("privacyTitle")}
      </h2>
      {/* <br /> */}
      {t("intro")}
      <br />
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh] mt-[2vh]">
        {t("collectTitle")}
      </h2>
      &bull; {t("collect.name")}
      <br />
      &bull; {t("collect.contact")}
      <br />
      &bull; {t("collect.address")}
      <br />
      &bull; {t("collect.payment")}
      <br />
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh] mt-[2vh]">
        {t("useTitle")}
      </h2>
      &bull; {t("use.processing")}
      <br /> &bull; {t("use.notifications")}
      <br /> &bull; {t("use.promo")}
      <br /> &bull; {t("use.improve")} <br />
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh] mt-[2vh]">
        {t("protectionTitle")}
      </h2>
      {t("protectionText")}
      <br />
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh] mt-[2vh]">
        {t("rightsTitle")}
      </h2>
      &bull; {t("rights.access")} <br /> &bull; {t("rights.delete")}
      <br /> &bull; {t("rights.unsubscribe")}
      <h2 className="text-2xl  tracking-tighter mb-[1vh] mt-[2vh]">
        {t("contactTitle")} <b>support@trojka.mk</b>
      </h2>
    </section>
  );
};

export default TearmsAndPrivacy;
