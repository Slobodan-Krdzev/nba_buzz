"use client";
import { useState } from "react";
import { RotatingText } from "../Components/Common/SlogansLister";
import { Filter } from "../ProductsPage/Filters";
import { ProductGrid } from "../ProductsPage/ProductGrid";
import { allProducts } from "../Components/Home/ListItemsByTypeSection";
const slogans: string[] = [
  "Jerseys",
  "T-Shirts",
  "Hoodies",
  "Unisex",
  "Basketball!",
];

const ProductsPage = () => {
  const [, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <main>
      {/* Hero Section */}
      <section className='bg-[url("/common/productsHero.jpg")] bg-cover bg-bottom bg-no-repeat min-h-[40vh] md:min-h-[70dvh]'>
        <div className="min-h-[40vh] md:min-h-[70dvh] w-full bg-black/50 flex flex-col justify-center items-center">
          <RotatingText texts={slogans} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12 w-full md:w-[95%] m-auto flex flex-col lg:flex-row gap-0 md:gap-4">
        {/* Sidebar Filter (desktop) */}
        <aside className="hidden lg:block w-full lg:w-56 border-r bg-white p-4 sticky top-20 self-start">
          <Filter onChange={setFilters} />
        </aside>

        {/* Mobile filter button */}
        <div className="lg:hidden p-4 flex justify-between items-center w-full border-t-[1px] border-black/20 sticky shadow-custom-green top-[61px] bg-white z-20">
          <p className="text-gray-600 text-sm">
            Showing{" "}
            <span className="font-semibold">{allProducts.length} results</span>{" "}
            from {allProducts.length}
          </p>
          <button
            className="px-3 py-1 border rounded text-sm"
            onClick={() => setIsFilterOpen(true)}
          >
            Filters ☰
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
              <Filter onChange={setFilters} />
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
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold">
                {allProducts.length} results
              </span>{" "}
              from {allProducts.length}
            </p>
          </div>
          <ProductGrid />
        </section>
      </section>
    </main>
  );
};

export default ProductsPage;
