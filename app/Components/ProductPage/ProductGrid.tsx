import { allProducts } from "../Home/ListItemsByTypeSection";

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {allProducts.map(product => (
        <div
          key={product.id}
          className="border rounded-xl p-4 hover:shadow-lg transition"
        >
          {/* Product content stays the same */}
        </div>
      ))}
    </div>
  );
}
