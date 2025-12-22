import { Product } from "@/app/Types/Types";
import React from "react";
import ItemsLister from "../Common/ItemsLister";
import { getTranslations } from "next-intl/server";

type ListItemsByTypeSectionProps = { locale: string };

const ListItemsByTypeSection = async ({ locale }: ListItemsByTypeSectionProps) => {
  const t = await getTranslations("home.titles");

  const res = await fetch(`https://adminbuzzmk.com/api/products?locale=${locale.toUpperCase()}`);
  const data: { products: Product[] } = await res.json();
  const activeProducts = (data.products ?? []).filter((p) => p.isActive);
  const allHoodies = activeProducts.slice().filter((p) => p.type.name === "Hoodie");
  const allTshirts = activeProducts.slice().filter((p) => p.type.name === "T-shirt");
  const allJerseys = activeProducts.slice().filter((p) => p.type.name === "Jersey");

  console.log(allHoodies);
  return (
    <div>
      {Boolean(allHoodies.length) && (
        <ItemsLister title={t("hoodies")} items={allHoodies} />
      )}
      {Boolean(allTshirts.length) && (
        <ItemsLister title={t("tshirts")} items={allTshirts} />
      )}
      {Boolean(allJerseys.length) && (
        <ItemsLister title={t("jerseys")} items={allJerseys} />
      )}
    </div>
  );
};

export default ListItemsByTypeSection;
