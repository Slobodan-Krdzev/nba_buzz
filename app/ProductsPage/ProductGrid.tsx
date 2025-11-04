
import ProductGridItem from "./ProductGridItem";
import { Product } from "@/app/Types/Types";

export function ProductGrid({ products = [] as Product[] }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map((product , idx)=> (
        // <div
        //   key={idx}
        //   className="border rounded-xl p-4 hover:shadow-lg transition"
        // >
        //   <div className="relative">
        //     <Image
        //       src={product.gallery.front}
        //       alt={product.name}
        //       width={700}
        //       height={300}
        //       className="rounded-lg"
        //     />
        //     {product.name && (
        //       <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
        //         {product.name}
        //       </span>
        //     )}
        //     <span className="absolute bottom-2 right-2 bg-white shadow px-2 py-1 text-sm rounded">
        //       ⭐ {5}
        //     </span>
        //   </div>

        //   <h3 className="mt-3 text-sm font-medium">{product.name}</h3>
        //   <p className="text-gray-700">$ {product.price}.00</p>
        //   <button className="mt-2 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        //     Buy now →
        //   </button>
        // </div>
        <ProductGridItem product={product} key={idx}/>
      ))}
    </div>
  );
}
