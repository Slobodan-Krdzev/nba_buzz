"use client";

interface FilterProps {
  onChange: (filters: string) => void;
}

export function Filter({ }: FilterProps) {
  return (
    <div className="space-y-6">
      {/* Collections */}
      <div>
        <h3 className="font-semibold mb-2">Collections</h3>
        <ul className="space-y-1">
          <li><label><input type="radio" name="collection" /> All</label></li>
          <li><label><input type="radio" name="collection" /> Trending</label></li>
          <li><label><input type="radio" name="collection" /> Best sellers</label></li>
          <li><label><input type="radio" name="collection" /> New arrivals</label></li>
          <li><label><input type="radio" name="collection" /> The Joker Collection</label></li>
          <li><label><input type="radio" name="collection" /> Hollywood Collection</label></li>
          <li><label><input type="radio" name="collection" /> Watch Your Ankles Collection</label></li>
        </ul>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        <ul className="space-y-1">
          <li><label><input type="checkbox" /> Hoodies</label></li>
          <li><label><input type="checkbox" /> Jerseys</label></li>
          <li><label><input type="checkbox" /> T-Shirts</label></li>
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold mb-2">Price</h3>
        <input type="range" min="0" max="120" className="w-full" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>$0.00</span>
          <span>$120.00</span>
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="font-semibold mb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          {["XS", "S", "M", "L", "XL"].map(size => (
            <button
              key={size}
              className="border px-2 py-1 text-sm rounded hover:bg-gray-100"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
