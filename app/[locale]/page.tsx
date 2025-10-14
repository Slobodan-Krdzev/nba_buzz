// import HeroV2 from "./Components/Home/HeroV2";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import HeroV3 from "../Components/Home/HeroV3";
import JoinUs from "../Components/Home/JoinUs/JoinUs";
import ListItemsByTypeSection from "../Components/Home/ListItemsByTypeSection";
import PremiumQualitySection from "../Components/Home/PremiumQualitySection/PremiumQualitySection";
import StandOutSection from "../Components/Home/StandOut/StandOutSection";
import NewsletterSection from "../Components/Newsletter/Newsletter";
import InViewSection from "../Components/Common/InViewSection";

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale)

  return (
    <>
      {/* <HeroV2 /> */}
      <HeroV3/>
      <InViewSection>
        <ListItemsByTypeSection locale={locale}/>
      </InViewSection>
      <InViewSection>
        <StandOutSection/>
      </InViewSection>
      <InViewSection>
        <PremiumQualitySection/>
      </InViewSection>
      <InViewSection>
        <NewsletterSection/>
      </InViewSection>
      <InViewSection>
        <JoinUs />
      </InViewSection>
    </>
  );
}
