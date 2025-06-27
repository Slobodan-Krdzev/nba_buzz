"use client";

import Image from "next/image";
import Link from "next/link";
import ShopByMobile from "./ShopByMobile";
import SectionTitle from "../../Common/SectionTitle";

export interface ShopByCategory {
  name: string;
  href: string;
  image: string;
}

const categories: ShopByCategory[] = [
  {
    name: "Jerseys",
    href: "/jerseys",
    image: "/shopBy/DSC062272222.webp",
  },
  {
    name: "Hoodies",
    href: "/hoodies",
    image: "/shopBy/DSC06464222.webp",
  },
  {
    name: "T-Shirts",
    href: "/t-shirts",
    image: "/shopBy/DSC06787.jpg",
  },
];

const ShopBy = () => {
  return (
    <section className="px-4 py-[6dvh] 2xl:py-[10dvh] w-[90%] lg:w-[80%] m-auto ">
      <SectionTitle title="Shop By"/>
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        {categories.map((category, idx: number) => (
          <Link href={category.href}
            key={category.name}
            className={`relative group overflow-hidden shadow-lg hover:scale-105 transition ease-in-out ${idx === 1 ? "max-h-[650px]" : 'max-h-[600px]'}`}
          >
            <Image
              src={category.image}
              alt={category.name}
              width={8000}
              height={300}
              className={`w-full h-full object-cover max-h-[650px]`}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <span
                className="text-white text-lg font-semibold"
              >
                {category.name} →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <ShopByMobile categories={categories} />
    </section>
  );
};

export default ShopBy;
