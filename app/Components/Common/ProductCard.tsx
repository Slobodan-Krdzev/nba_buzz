import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function ProductCard() {
  return (
    <div className="w-[300px] rounded-2xl shadow-xl bg-white p-3">
      <div className="relative rounded-xl overflow-hidden">
        <Image
          src="/path-to-image.jpg" // Replace with actual image path
          alt="White T-Shirt"
          width={300}
          height={400}
          className="object-cover rounded-xl"
        />
        <button className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm">
          <Heart className="w-5 h-5 text-black" />
        </button>
      </div>

      <div className="pt-3">
        <p className="text-gray-400 text-sm">T--Shirt</p>
        <p className="font-semibold text-black">White T-Shirt</p>
        <p className="text-black mt-1 font-semibold">$130</p>
      </div>
    </div>
  );
}
