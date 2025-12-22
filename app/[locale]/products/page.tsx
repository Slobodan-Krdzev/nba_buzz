"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Filter } from "../../ProductsPage/Filters";
import { ProductGrid } from "../../ProductsPage/ProductGrid";
import { Product } from "@/app/Types/Types";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/Redux/store";
import { setSelectedCollection } from "@/app/Redux/Slices/filtersSlice";
import { useTranslations } from "next-intl";

const ProductsPageInner = () => {

  const locale = useLocale();
  // const t = useTranslations("products.hero.slogans");
  const tFilters = useTranslations("filters");
  const tProducts = useTranslations("products.list");
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [filters, setFilters] = useState<Record<string, string | number | boolean>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Store all products for collections
  const [total, setTotal] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const slogans = useMemo(
  //   () => [
  //     t("jerseys"),
  //     t("tshirts"),
  //     t("hoodies"),
  //     t("unisex"),
  //     t("basketball"),
  //   ],
  //   [t]
  // );

  // Fetch all products once on mount to get all collections for filter UI
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const params = new URLSearchParams();
        params.set("locale", locale);
        const res = await fetch(`https://adminbuzzmk.com/api/products?${params.toString()}`, { cache: 'no-store' });
        const data = await res.json();
        const all: Product[] = (data.products ?? []).filter((p: Product) => p.isActive);
        setAllProducts(all);
      } catch {
        setAllProducts([]);
      }
    };
    fetchAllProducts();
  }, [locale]);

  // Read URL parameters on mount
  useEffect(() => {
    const collection = searchParams.get('collection');
    if (collection) {
      setFilters((prev) => ({ ...prev, collection }));
      // Also update Redux state so the filter UI shows it as selected
      dispatch(setSelectedCollection(collection));
    }
  }, [searchParams, dispatch]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("locale", locale);
    if (filters.q) params.set("q", String(filters.q));
    // Category (type) is filtered client-side per requirements
    if (filters.isActive !== undefined) params.set("isActive", String(filters.isActive));
    const isFeaturedVal = filters.isFeatured as string | undefined;
    if (isFeaturedVal === 'true' || isFeaturedVal === 'false') params.set("isFeatured", isFeaturedVal);
    if (filters.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
    if (filters.collection) params.set("collection", String(filters.collection));
    if (filters.sizes) params.set("sizes", String(filters.sizes));
    return params.toString();
  }, [filters, locale]);



  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://adminbuzzmk.com/api/products?${queryString}`, { cache: 'no-store' });
        const data = await res.json();
        const raw: Product[] = data.products ?? [];

        console.log(raw);

        // Apply front-end filters: collections/trending, category (type), sizes
        const selectedCollection = (filters.collection as string) || '';
        const isTrending = (filters.isFeatured as string) === 'true';
        const selectedType = (filters.type as string) || '';
        const selectedSizes = (filters.sizes as string)?.split(',').filter(Boolean) || [];

        const filtered = raw.filter((p) => {
          // Filter out inactive products
          if (!p.isActive) return false;
          
          // Collections / Trending
          if (isTrending) {
            if (!p.isFeatured) return false;
          } else if (selectedCollection) {
            if (p.collection !== selectedCollection) return false;
          }
          // Category filter
          if (selectedType && p.type?.name !== selectedType) return false;
          // Sizes filter: keep only products where all selected sizes have stock > 0
          if (selectedSizes.length > 0) {
            const ps = p.sizes as unknown as Record<string, number>;
            const ok = selectedSizes.every((s) => (ps?.[s] ?? 0) > 0);
            if (!ok) return false;
          }
          return true;
        });

        setProducts(filtered);
        setTotal(data.total ?? 0);
      } catch {
        setProducts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [queryString, filters.type, filters.sizes, filters.collection, filters.isFeatured, locale]);

  return (
    <main>
      {/* Hero Section */}
      {/* <section className='bg-[url("/common/productsHero.jpg")] bg-cover bg-bottom bg-no-repeat min-h-[40vh] md:min-h-[70dvh]'>
        <div className="min-h-[40vh] md:min-h-[70dvh] w-full bg-black/50 flex flex-col justify-center items-center">
          <RotatingText texts={slogans} />
        </div>
      </section> */}

      {/* Main Content */}
      <section className="py-8 md:py-12 w-full md:w-[95%] m-auto flex flex-col lg:flex-row gap-0 md:gap-4">
        {/* Sidebar Filter (desktop) */}
        <aside className="hidden lg:block w-full lg:w-56 border-r bg-white p-4 sticky top-20 self-start">
          <Filter
            onChange={(partial) => setFilters((prev) => ({ ...prev, ...partial }))}
            products={allProducts}
            categories={[...new Set(products.map(p => p.type?.name).filter(Boolean) as string[])]}
          />
        </aside>

        {/* Mobile filter button */}
        <div className="lg:hidden p-4 flex justify-between items-center w-full border-t-[1px] border-black/20 sticky shadow-custom-green top-[61px] bg-white z-20">
          <p className="text-gray-600 text-sm">{loading ? tProducts("loading") : tProducts("showing", { count: products.length, total })}</p>
          <button
            className="px-3 py-1 border rounded text-sm"
            onClick={() => setIsFilterOpen(true)}
          >
            {tFilters("title")} ☰
          </button>
        </div>

        {/* Filter drawer (mobile) */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="w-64 bg-white p-4 shadow-lg overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}>✕</button>
              </div>
              <Filter
                onChange={(partial) => setFilters((prev) => ({ ...prev, ...partial }))}
                products={allProducts}
                categories={[...new Set(products.map(p => p.type?.name).filter(Boolean) as string[])]}
              />
            </div>
            <div
              className="flex-1 bg-black/40"
              onClick={() => setIsFilterOpen(false)}
            />
          </div>
        )}

        {/* Products */}
        <section className="flex-1 p-2 md:pt-6 md:px-1 w-full">
          {/* Desktop header */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <p className="text-gray-600">{loading ? tProducts("loading") : tProducts("showing", { count: products.length, total })}</p>
          </div>
          <ProductGrid products={products} />
        </section>
      </section>
    </main>
  );
};

const ProductsPage = () => {
  return (
    <Suspense fallback={null}>
      <ProductsPageInner />
    </Suspense>
  );
};

export default ProductsPage;
