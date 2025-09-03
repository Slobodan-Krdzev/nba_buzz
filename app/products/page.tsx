'use client'
import { useState } from "react";
import { RotatingText } from "../Components/Common/SlogansLister";
import { Filter } from "../ProductsPage/Filters";
import { ProductGrid } from "../ProductsPage/ProductGrid";
const slogans: string[] = ["Jerseys", "T-Shirts", "Hoodies", "Unisex","Basketball!"];

const ProductsPage = () => {

const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <main>
    <section className='bg-[url("/common/productsHero.jpg")] bg-cover bg-bottom bg-no-repeat min-h-[70dvh]'>
      <div className="min-h-[70dvh] w-full bg-black/50 flex flex-col justify-center items-center">
        {/* <Image
          src={"/common/nbaBuzzLogo.png"}
          alt="Logo"
          width={150}
          height={120}
        /> */}
        {/* <motion.h1
          key={"title"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-bold text-center text-accent tracking-tighter"
        >
          Clothing for Ballers
        </motion.h1> */}

        <RotatingText texts={slogans} />
      </div>
    </section>


     <section className="py-12 w-[90%] m-auto">
       <aside className="hidden md:block w-64 border-r bg-white p-4">
        <Filter onChange={setFilters} />
      </aside>

      {/* Mobile filter button */}
      <div className="lg:hidden p-4 flex justify-between items-center border-b">
        <p className="text-gray-600">
          Showing <span className="font-semibold">120 results</span> from 120
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
      <section className="flex-1 p-6">
        {/* Desktop header */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">120 results</span> from 120
          </p>
          <div className="flex gap-2">
            <button className="p-2 border rounded">🔲</button>
            <button className="p-2 border rounded">📋</button>
          </div>
        </div>

        <ProductGrid />
      </section>
      </section>     
    </main>
  );
};

export default ProductsPage;
