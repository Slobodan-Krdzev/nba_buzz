import { ShoppingCart, Shirt, PenTool } from "lucide-react";
import SectionTitle from "../../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import { useTranslations } from "next-intl";

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

  const t = useTranslations("premiumQuality");
  return (
    <section className="px-6 py-[8dvh] xl:py-[16dvh] bg-white">
      <SectionTitle title={t("title")} />

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-20 w-[90%] md:w-[70%] lg:w-[80%] m-auto mt-[5dvh]">
        {/* Card 1 */}
        {features.map((item, index) => (
        <SingleFeature
          key={index}
          icon={item.icon}
          title={t(`item${index + 1}.title`)}
          description={t(`item${index + 1}.description`)}
        />
      ))}
      </div>
    </section>
  );
}
