'use client'
import { useEffect, useState } from 'react';
import { allProducts } from '../Home/ListItemsByTypeSection';
import ItemsLister from './ItemsLister';

function getRandomItems<T>(arr: T[], count: number): T[] {
  if (count >= arr.length) return [...arr]; // return all if count > length

  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const FeaturedProducts = () => {
  const [randomProducts, setRandomProducts] = useState<typeof allProducts>([]);

  useEffect(() => {
    setRandomProducts(getRandomItems(allProducts, 6));
  }, []);

  return (
    <section className="py-16">
      {randomProducts.length > 0 && (
        <ItemsLister items={randomProducts} title="Featured Products" />
      )}
    </section>
  );
};

export default FeaturedProducts;
