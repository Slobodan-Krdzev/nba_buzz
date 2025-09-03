import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Gracie looks women's stylish top",
    price: "$10.00",
    image: "/products/p1.jpg",
    rating: 4.3,
    tag: "NEW"
  },
  {
    id: 2,
    name: "Wide linen-blend trousers",
    price: "$10.00",
    image: "/products/p2.jpg",
    rating: 4.3,
    tag: "NEW"
  },
  {
    id: 3,
    name: "Women's oversized cotton crew neck T-Shirt",
    price: "$10.00",
    image: "/products/p3.jpg",
    rating: 5.0,
  },
];

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <div
          key={product.id}
          className="border rounded-xl p-4 hover:shadow-lg transition"
        >
          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-lg"
            />
            {product.tag && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                {product.tag}
              </span>
            )}
            <span className="absolute bottom-2 right-2 bg-white shadow px-2 py-1 text-sm rounded">
              ⭐ {product.rating}
            </span>
          </div>

          <h3 className="mt-3 text-sm font-medium">{product.name}</h3>
          <p className="text-gray-700">{product.price}</p>
          <button className="mt-2 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Buy now →
          </button>
        </div>
      ))}
    </div>
  );
}
