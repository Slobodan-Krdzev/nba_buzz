import React from "react";
import Image from "next/image";
import SectionTitle from "@/app/Components/Common/SectionTitle";
import AnimatedSlogans from "@/app/Components/Common/AnimatedSlogans";
import BouncingBasketball from "@/app/Components/Common/BouncingBasketball";

const LukaPage = () => {
  return (
    <>
      <section
        className="w-full flex flex-col justify-center items-center text-white relative bg-cover bg-center"
        style={{ backgroundImage: "url(/common/heroSection.png)", height: "calc(100dvh - 62.6px)" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 text-center">
          <AnimatedSlogans items={["Luka", "Goes To", "Hollywood"]} />
        </div>
        <BouncingBasketball />
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 ">
        <SectionTitle title="Luka Dončić" />

        <p className="m-auto w-[90%] md:w-[70%] lg:w-[50%] text-center">
          Lights, camera, step-back. Luka’s game has that blockbuster charm — a
          mix of craft, calm, and clutch that plays like a highlight reel. The
          Luka Goes to Hollywood collection blends European finesse with
          big-screen flair: think film-grain textures, marquee-inspired
          typography, and NBABUZZ’s signature gold accents for that premiere-
          night glow.
        </p>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-6">
        <div className="basis-1 lg:basis-[45%]">
          <SectionTitle title="From Ljubljana to the Big Screen" />

          <p className="lg:w-[80%] m-auto text-center">
            Story-driven graphics nod to Luka’s journey — the step-back frame,
            starlit backdrops, and playful references to scene-stealing moments.
            Expect oversized tees, premium hoodies, and sharp prints that feel
            as effortless as his pace control. Designed in-house, crafted to be
            worn on set or courtside.
          </p>
        </div>

        <div className="basis-1 lg:basis-[70%]">
          <Image src={'/common/newsletter.jpg'} alt="Luka collection" width={1920} height={100} className="shadow-xl"/>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-6">
        <div className="basis-1 lg:basis-[70%] order-2 lg-order-1">
          <Image src={'/poses/7.jpg'} alt="Luka step-back inspired design" width={1920} height={100} className="shadow-xl"/>
        </div>
        <div className="basis-1 lg:basis-[60%] order-1 lg:order-2">
          <SectionTitle title="Step-Back. Cut. Action." />

          <p className="lg:w-[80%] m-auto text-center">
            This collection is about cool control — the kind that makes crowds
            whisper before they roar. Clean silhouettes, vivid prints, and a
            dash of Hollywood gold bring the spotlight to everyday wear.
            Authentically NBABUZZ, made to be rewatched.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 ">
        <SectionTitle title="Premium Materials, Maximum Comfort" />

        <ul className="pl-6 space-y-2 text-lg w-[90%] lg:w-[60%] m-auto">
          <li className="text-center">
            <strong>Soft, Heavyweight Cotton</strong> → Stays fresh from first
            watch to the encore.
          </li>
          <li className="text-center">
            <strong>Premium Hoodies</strong> → Cozy structure with that red-carpet feel.
          </li>
          <li className="text-center">
            <strong>Crisp, Fade-Resistant Prints</strong> → Colors that keep
            their edge, scene after scene.
          </li>
          <li className="text-center">
            <strong>Designed to Last</strong> → Because classics don’t go out of style.
          </li>
        </ul>
      </section>
    </>
  );
};

export default LukaPage;


