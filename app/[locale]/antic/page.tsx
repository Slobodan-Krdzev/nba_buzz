import React from "react";
import Image from "next/image";
import SectionTitle from "@/app/Components/Common/SectionTitle";
import AnimatedSlogans from "@/app/Components/Common/AnimatedSlogans";
import BouncingBasketball from "@/app/Components/Common/BouncingBasketball";

const AnticPage = () => {
  return (
    <>
      <section
        className="w-full flex flex-col justify-center items-center text-white relative bg-cover bg-center"
        style={{ backgroundImage: "url(/common/heroSection2.jpg)", height: "calc(100dvh - 62.6px)" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 text-center">
          <AnimatedSlogans items={["The", "Real Mvp", "Has Arrived"]} />
        </div>
        <BouncingBasketball />
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 ">
        <SectionTitle title="Pero Antić" />

        <p className="m-auto w-[90%] md:w-[70%] lg:w-[50%] text-center">
          From Skopje courts to NBA spotlights, Pero Antić brought toughness,
          personality, and a fearless shot. This drop leans into the moment —
          Pero striding forward while LeBron’s on the deck — not disrespect,
          just that playful, unstoppable swagger. In-house designs blend
          Macedonian heritage, bold typography, and a tongue-in-cheek
          walk-over silhouette. Built for those who carry pride — on and off the
          court.
        </p>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-6">
        <div className="basis-1 lg:basis-[45%]">
          <SectionTitle title="Design With Heart, Made For Hoops" />

          <p className="lg:w-[80%] m-auto text-center">
            The graphics lean into Pero’s identity — the eagle, the stripes,
            the grit — and that iconic walk-over stance. Expect oversized tees,
            premium hoodies, sharp prints, and funky color pops that nod to the
            golden years of European hoopers making noise in the league. Every
            piece is sketched and refined by our team — no copies, no shortcuts,
            just authentic NBABUZZ craft.
          </p>
        </div>

        <div className="basis-1 lg:basis-[70%]">
          <Image src={'/common/productsHero.jpg'} alt="Antic collection" width={1920} height={100} className="shadow-xl"/>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-6">
        <div className="basis-1 lg:basis-[70%] order-2 lg-order-1">
          <Image src={'/poses/8.jpg'} alt="Pero walking over LeBron — inspired design" width={1920} height={100} className="shadow-xl"/>
        </div>
        <div className="basis-1 lg:basis-[60%] order-1 lg:order-2">
          <SectionTitle title="Why This Collection Matters" />

          <p className="lg:w-[80%] m-auto text-center">
            Pero Antić isn’t just a name — he’s a mindset. Confidence without
            compromise. These pieces channel that edge into wearables that feel
            as strong as they look. For the fans who remember the memes, the
            moment, and the pride of seeing a Macedonian stand tall — step by
            step — on the biggest stage.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 ">
        <SectionTitle title="Premium Materials, Maximum Comfort" />

        <ul className="pl-6 space-y-2 text-lg w-[90%] lg:w-[60%] m-auto">
          <li className="text-center">
            <strong>Heavyweight Cotton</strong> → Built for everyday wear with a
            soft hand-feel.
          </li>
          <li className="text-center">
            <strong>Durable Hoodies</strong> → Cozy, structured, and ready for
            the season.
          </li>
          <li className="text-center">
            <strong>Sharp, Fade-Resistant Prints</strong> → Graphics that keep
            their edge after every wash.
          </li>
          <li className="text-center">
            <strong>Made to Last</strong> → Because real MVPs don’t fade.
          </li>
        </ul>
      </section>
    </>
  );
};

export default AnticPage;



