import ItemsLister from './ItemsLister';
import { Product } from '@/app/Types/Types';

function pickRandom<T>(arr: T[], count: number): T[] {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  if (count >= arr.length) return [...arr];
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default async function FeaturedProducts() {
  let products: Product[] = [];
  try {
    const res = await fetch('https://adminbuzzmk.com/api/products', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      products = (data?.products ?? []) as Product[];
    }
  } catch {
    products = [];
  }

  const randomProducts = pickRandom(products, 6);

  if (randomProducts.length === 0) return null;

  return (
    <section className="py-16">
      <ItemsLister items={randomProducts} title="Featured Products" />
    </section>
  );
}

