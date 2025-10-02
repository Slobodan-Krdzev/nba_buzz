// import HeroV2 from "./Components/Home/HeroV2";
import HeroV3 from "../Components/Home/HeroV3";
import JoinUs from "../Components/Home/JoinUs/JoinUs";
import ListItemsByTypeSection from "../Components/Home/ListItemsByTypeSection";
import PremiumQualitySection from "../Components/Home/PremiumQualitySection/PremiumQualitySection";
import StandOutSection from "../Components/Home/StandOut/StandOutSection";
import NewsletterSection from "../Components/Newsletter/Newsletter";

export default function Home() {
  return (
    <>
      {/* <HeroV2 /> */}
      <HeroV3/>
      <ListItemsByTypeSection />
      <StandOutSection />
      <PremiumQualitySection />
      <NewsletterSection />
      <JoinUs />
    </>
  );
}
