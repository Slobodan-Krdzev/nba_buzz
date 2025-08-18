// import JerseyListingTest from "./Components/JerseyListingTest";

// import ProductCard from "./Components/Common/ProductCard";
import HeroV2 from "./Components/Home/HeroV2";
import ListItemsByTypeSection from "./Components/Home/ListItemsByTypeSection";
import PremiumQualitySection from "./Components/Home/PremiumQualitySection/PremiumQualitySection";
import StandOutSection from "./Components/Home/StandOut/StandOutSection";
import NewsletterSection from "./Components/Newsletter/Newsletter";

export default function Home() {
  return (
    <>
      <HeroV2 />

      <ListItemsByTypeSection />
      <StandOutSection />
      <PremiumQualitySection />
      <NewsletterSection />

      {/* <JerseyListingTest /> */}
    </>
  );
}
