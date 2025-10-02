
import { useTranslations } from "next-intl";
import SwiperComp from "./Hero3Components/Swiper";

const HeroV3 = () => {

  const t = useTranslations("home");
  

  return (
    <>

   <SwiperComp />
    <h1 className="text-3xl font-bold text-center my-10">{t("welcome")}</h1>

    </>
  );
};

export default HeroV3;
