// import JerseyListingTest from "./Components/JerseyListingTest";

// import ProductCard from "./Components/Common/ProductCard";
import HeroV2 from "./Components/Home/HeroV2";
import PremiumQualitySection from "./Components/Home/PremiumQualitySection/PremiumQualitySection";
import StandOutSection from "./Components/Home/StandOut/StandOutSection";
import NewsletterSection from "./Components/Newsletter/Newsletter";

export default function Home() {
  return (
    <>

    <HeroV2 />
      {/* <video
        className="w-full h-full"
        preload="none"
        muted
        autoPlay
        playsInline
        loop
      >
        <source src="/common/nbaHero.mov" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video> */}

      {/* </div> */}
      {/* <ShopBy /> */}
      {/* <ProductCard /> */}
      <PremiumQualitySection />

      <StandOutSection />
      <NewsletterSection />
      {/* <JerseyListingTest /> */}
    </>
  );
}
