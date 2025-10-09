"use client";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import FeaturedProductsList from "@/app/Components/Common/FeaturedProductsList";

export default function FavoritesSection() {
  const t = useTranslations("profile");
  const favourites = useSelector((s: RootState) => s.counter.favouriteItems);

  if (!favourites?.length) return null;

  return (
    <section>
      <FeaturedProductsList items={favourites} title={t("favoritesTitle")} />
    </section>
  );
}


