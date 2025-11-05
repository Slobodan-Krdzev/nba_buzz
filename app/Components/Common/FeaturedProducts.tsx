import ItemsLister from './ItemsLister';
import { Product } from '@/app/Types/Types';
import { getTranslations } from 'next-intl/server';

function pickRandom<T>(arr: T[], count: number): T[] {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  if (count >= arr.length) return [...arr];
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default async function FeaturedProducts() {
  const t = await getTranslations('home.titles');
  let products: Product[] = [];
  try {
    const res = await fetch('https://adminbuzzmk.com/api/products', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      products = (data?.products ?? []).filter((p: Product) => p.isActive) as Product[];
    }
  } catch {
    products = [];
  }

  const randomProducts = pickRandom(products, 6);

  if (randomProducts.length === 0) return null;

  return (
    <section className="py-16">
      <ItemsLister items={randomProducts} title={t('featured')} />
    </section>
  );
}

