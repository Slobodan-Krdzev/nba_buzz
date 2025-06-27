import { ShoppingCart, Shirt, PenTool } from "lucide-react";
import SectionTitle from "../../Common/SectionTitle";
import SingleFeature from "./SingleFeature";

const features = [
  {
    icon: Shirt,
    title: "Premium & Recycled Materials",
    description:
      "NBABuzz clothing is made from high-quality materials, combined with durable printing.",

  },
  {
    icon: PenTool,
    title: "Original Designs",
    description:
      "All of our designs are completely unique, carefully crafted and developed in-house by our dedicated design team...",
    
  },
  {
    icon: ShoppingCart,
    title: "Risk Free Shopping",
    description:
      "The purchase is completely secure and can be made directly via the website, via email, or social media...",

  },
];

export default function PremiumQualitySection() {
  return (
    <section className="px-6 py-[6dvh] 2xl:py-[25dvh] bg-white">
      <SectionTitle title="Premium Quality" />

      <div className="grid md:grid-cols-3 gap-8 lg:gap-20 w-[90%] md:w-[70%] lg:w-[80%] m-auto mt-[5dvh]">
        {/* Card 1 */}
        {features.map((item, index) => (
        <SingleFeature
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
      </div>
    </section>
  );
}
