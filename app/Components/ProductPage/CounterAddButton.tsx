'use client';

import { addToCart } from "@/app/Redux/Slices/cartSlice";
import { clearCounter, decrement, increment } from "@/app/Redux/Slices/counterSlice";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { Product } from "@/app/Types/Types";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface CounterAddButtonProps {
  product: Product;
  itemColorSize: {
    color: string;
    size: string;
  }
}

const CounterAddButton = ({ product, itemColorSize }: CounterAddButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [shake, setShake] = useState(false);
  const count = useSelector((state: RootState) => state.counter.value);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    if (!itemColorSize.color || !itemColorSize.size) {
      setShowWarning(true);
      setShake(true);
      setTimeout(() => setShake(false), 500); // Remove shake after animation
      setTimeout(() => setShowWarning(false), 2000); // Hide warning after 2s
      return;
    }

    if (isAdded) {
      router.push('/cart');
      dispatch(clearCounter());
      return;
    }
    dispatch(addToCart({ product, qty: count, color: itemColorSize.color, size: itemColorSize.size }));
    setIsAdded(true);
  };

  return (
    <div className="mb-6 pb-6 border-b-[1px] border-black relative">
      {/* Warning Pop-up */}
      {showWarning && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 -top-12 bg-red-500 text-white px-4 py-2 rounded shadow-lg text-sm font-semibold z-50
            ${shake ? "animate-shake" : ""}`}
        >
          Please select color and size!
        </div>
      )}

      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(-50%) translateY(0); }
            20% { transform: translateX(-50%) translateY(-2px) rotate(-5deg);}
            40% { transform: translateX(-50%) translateY(2px) rotate(5deg);}
            60% { transform: translateX(-50%) translateY(-2px) rotate(-5deg);}
            80% { transform: translateX(-50%) translateY(2px) rotate(5deg);}
            100% { transform: translateX(-50%) translateY(0); }
          }
          .animate-shake {
            animation: shake 0.5s;
          }
        `}
      </style>

      <p className="text-sm">Add to Cart</p>
      <div className="flex gap-4">
        <div
          className={`rounded flex justify-between items-stretch min-w-[100px] basis-[40%] border-[1px]`}
        >
          <button
            className="basis-1/3 disabled:text-gray-300"
            disabled={count === 1}
            onClick={() => {
              if (count > 1) dispatch(decrement());
            }}
          >
            -
          </button>
          <p className="bg-[#e4e4e4] basis-1/3 text-center flex justify-center items-center border-x-[1.5px]">
            {count}
          </p>
          <button
            className="basis-1/3"
            onClick={() => {
              dispatch(increment());
            }}
          >
            +
          </button>
        </div>
        <button
          className={`rounded bg-accent font-black py-4 flex justify-center items-center gap-3 p-2 px-8 text-white hover:scale-105 transition-transform ease-in-out duration-75 active:scale-105 ${isAdded ? "bg-green-400" : ""}`}
          onClick={handleAddToCart}
        >
          {isAdded ? <>View Cart <ShoppingCartIcon size={15} /></> : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default CounterAddButton;