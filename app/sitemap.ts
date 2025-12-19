import type { MetadataRoute } from 'next';

const BASE_URL = 'https://trojka.mk';
const SUPPORTED_LOCALES = ['en', 'mk', 'rs'] as const;

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// Minimal shape needed for sitemap entries
type ApiProduct = {
  _id?: string;
  id?: string;
  isActive?: boolean;
  updatedAt?: string;
  updated?: string;
};

// Known static, indexable routes relative to /[locale]
const staticPaths: string[] = [
  '', // home
  '/products',
  '/antic',
  '/luka',
  '/theJoker',
  '/ourStory',
  '/contact',
  '/faq',
  '/terms-and-privacy',
];

async function fetchProducts(locale: SupportedLocale): Promise<ApiProduct[]> {
  try {
    const params = new URLSearchParams();
    params.set('locale', locale);
    // Only fetch active products; API already supports server-side filtering
    const res = await fetch(`https://adminbuzzmk.com/api/products?${params.toString()}`, {
      // Do not cache at build time; allow ISR by Next if needed
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const products: ApiProduct[] = Array.isArray(data?.products) ? (data.products as ApiProduct[]) : [];
    // Only include active products
    return products.filter((p) => p.isActive === true);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Add static localized pages
  for (const locale of SUPPORTED_LOCALES) {
    for (const relPath of staticPaths) {
      const loc = `${BASE_URL}/${locale}${relPath}`;
      entries.push({
        url: loc,
        changeFrequency: 'weekly',
        priority: relPath === '' ? 1 : 0.6,
      });
    }
  }

  // Add product detail URLs per locale
  const perLocaleProducts = await Promise.all(
    SUPPORTED_LOCALES.map(async (locale) => {
      const items = await fetchProducts(locale);
      return { locale, items };
    })
  );

  for (const { locale, items } of perLocaleProducts) {
    for (const p of items) {
      const id = String(p?._id ?? p?.id ?? '').trim();
      if (!id) continue;
      const url = `${BASE_URL}/${locale}/products/${encodeURIComponent(id)}`;
      const lastmod: string | undefined = p?.updatedAt || p?.updated || undefined;
      entries.push({
        url,
        changeFrequency: 'daily',
        priority: 0.7,
        lastModified: lastmod ? new Date(lastmod) : undefined,
      });
    }
  }

  return entries;
}


