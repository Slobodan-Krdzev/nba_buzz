
import ProductGridItem from "./ProductGridItem";
import { Product } from "@/app/Types/Types";

export function ProductGrid({ products = [] as Product[] }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map((product , idx)=> (
        <ProductGridItem product={product} key={idx}/>
      ))}
    </div>
  );
}
