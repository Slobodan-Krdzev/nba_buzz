"use client";
import ItemsLister from "./ItemsLister";
import { Product } from "@/app/Types/Types";

interface FeaturedProductsListProps {
  items: Product[];
  title: string;
}

export default function FeaturedProductsList({ items, title }: FeaturedProductsListProps) {
  if (!items?.length) return null;
  return (
    <section className="py-16">
      <ItemsLister items={items} title={title} />
    </section>
  );
}


