import React from "react";
import Image from "next/image";
import SectionTitle from "@/app/Components/Common/SectionTitle";
import AnimatedSlogans from "@/app/Components/Common/AnimatedSlogans";
import BouncingBasketball from "@/app/Components/Common/BouncingBasketball";

const TheJokerPage = () => {
  return (
    <>
      <section
        className="w-full flex flex-col justify-center items-center text-white relative bg-cover bg-center"
        style={{ backgroundImage: "url(/common/heroSection3.png)", height: "calc(100dvh - 62.6px)" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 text-center">
          <AnimatedSlogans items={["The Joker", "Is", "Here"]} />
        </div>
        <BouncingBasketball />
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 ">
        <SectionTitle title="The Joker" />

        <p className="m-auto w-[90%] md:w-[70%] lg:w-[50%] text-center">
          When Nikola Jokić steps on the court, you never know what’s coming — a
          no-look pass, a triple-double, or a game-winning smile. That same
          spirit lives in The Joker Collection, a line of tees and hoodies
          designed in-house to capture his playful energy and MVP legacy. This
          is not just fanwear — it’s a creative statement piece built for those
          who dare to stand out.
        </p>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-6">
        <div className="basis-1 lg:basis-[45%]">
          <SectionTitle title="Unleash Your Inner Joker" />

          <p className="lg:w-[80%] m-auto text-center">
            Every item in this collection tells a story. Bold graphics,
            oversized fits, and sleek prints are all crafted with a mix of fun
            and finesse, just like Jokić himself. The designs are born in our
            studio — exclusive in-house artwork that you won’t find anywhere
            else. Whether it’s a hoodie with a twist of surreal humor, or a tee
            that nods to his Serbian roots and larger-than-life personality, the
            collection brings that Joker unpredictability to your wardrobe.
          </p>
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
          <SectionTitle title="Why This Collection Hits Different" />

        <p className="lg:w-[80%] m-auto text-center">
          This isn’t a random print-on-demand job. Every design is sketched,
          refined, and finalized by our creative team, making each piece
          authentically ours. Think playful illustrations, clever typography,
          and graphics that mix basketball culture with Joker-esque mischief.
          It’s a combination of street art vibes, premium fashion feel, and pure
          hoops passion.
        </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 ">
        <SectionTitle title="Premium Materials, Maximum Comfort" />

        <ul className="pl-6 space-y-2 text-lg w-[90%] lg:w-[60%] m-auto">
          <li className="text-center">
            <strong>Soft, Heavyweight Cotton</strong> &rarr; The kind of fabric
            that feels fresh on day one and still strong on day one hundred.
          </li>
          <li className="text-center">
            <strong>High-Quality Hoodies</strong> &rarr; Warm, durable, and cut
            to move with you, whether you’re chilling or running the fast break.
          </li>
          <li className="text-center">
            <strong>Fade-Resistant Prints</strong> &rarr; Vibrant colors and
            crisp lines that keep their edge, wash after wash.
          </li>
          <li className="text-center">
            <strong>Designed to Last</strong> &rarr; Because like Jokić’s game,
            style this good doesn’t fade away.
          </li>
        </ul>
      </section>
    </>
  );
};

export default TheJokerPage;

