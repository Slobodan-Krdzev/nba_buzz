"use client";
import { useState } from "react";
import Counter from "@/app/Components/Common/Counter";
import { Product } from "@/app/Types/Types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { clearCounter } from "@/app/Redux/Slices/counterSlice";
import { useRouter } from "next/navigation";
import { addToCart } from "@/app/Redux/Slices/cartSlice";
import { ShoppingCartIcon } from "lucide-react";

interface MobileProductActionsProps {
  product: Product; // Replace 'any' with your Product type if available
}

const MobileProductActions = ({ product }: MobileProductActionsProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();
  const count = useSelector((state: RootState) => state.counter.value);

  const [itemColorSize, setItemColorSize] = useState({
    color: "",
    size: "",
  });

  const handleAddToCart = () => {
    if (isAdded) {
      router.push("/cart");
      dispatch(clearCounter());
      return;
    }
    dispatch(
      addToCart({
        product,
        qty: count,
        color: itemColorSize.color,
        size: itemColorSize.size,
      })
    );

    setIsAdded(true);
  };

  return (
    <>
      {/* Slide-up menu trigger button */}
      <button
        className="fixed lg:hidden right-2 bottom-[75px] z-[9100] px-6 py-2 rounded bg-black text-white font-bold shadow-lg"
        onClick={() => setMenuOpen(true)}
      >
        Sizes & Colors
      </button>

      {/* Slide-up menu */}
      <div
        className={` fixed left-0 right-0 bottom-0 z-[9200]  bg-white transition-transform duration-300 ${
          menuOpen
            ? "translate-y-0 shadow-glow-top border-t-[1px] border-black/10 rounded-t-2xl"
            : "translate-y-full"
        }`}
        style={{ minHeight: "40vh" }}
      >
        <div className="p-6 flex flex-col gap-4">
          <button
            className="self-end text-black font-bold"
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
          {/* Your menu content here */}
          <div className="text-2xl tracking-tighter font-black">
            Select Sizes & Colors
          </div>
          <div>
            <div className="mb-6">
              <h2 className="text-xl tracking-tighter mb-2 font-black capitalize">
                Sizes
              </h2>
              <div className="flex justify-start items-center gap-1">
                {Object.entries(product.sizes)
                  .map(([name, quantity]) => ({ name, quantity }))
                  .map((s) => (
                    <button
                      disabled={s.quantity === 0}
                      key={s.name}
                      className={`cursor-pointer flex justify-center items-center uppercase text-sm font-medium border-[1px]  p-1 w-[30px] h-[30px] ${
                        s.quantity === 0
                          ? "bg-[#e0dede] border-gray-400 text-gray-500"
                          : "border-black"
                      } ${
                        itemColorSize?.size === s.name
                          ? "border-green-500 bg-green-200 text-green-600 shadow-lg shadow-green-100 scale-110 transition-all ease-in-out duration-75"
                          : ""
                      }`}
                      onClick={() =>
                        setItemColorSize((prev) => ({ ...prev, size: s.name }))
                      }
                    >
                      {s.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl tracking-tighter mb-2 font-black capitalize">
              Colors
            </h2>
            <div className="flex justify-start items-center gap-1">
              {product.colors.map((s) => (
                <button
                  key={s.name}
                  className={`rounded-full cursor-pointer flex justify-center items-center uppercase text-sm font-medium border-[1px] p-1 w-[30px] h-[30px] ${
                    itemColorSize?.color === s.name
                      ? " !border-green-500 shadow-lg shadow-green-100 scale-110 transition-all ease-in-out duration-75"
                      : ""
                  }`}
                  style={{ backgroundColor: s.color }}
                  onClick={() =>
                    setItemColorSize((prev) => ({ ...prev, color: s.name }))
                  }
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bar */}
      <div className="fixed lg:hidden z-[9000] left-0 bottom-0 right-0 bg-white flex justify-between items-stretch shadow-glow-top">
        <Counter />
        <div className="basis-[25%] text-lg tracking-tighter py-5 font-black capitalize text-white flex justify-center items-center bg-black">
          €{product.price}.00
        </div>
        <button
          className={`bg-accent flex justify-center items-center gap-3 p-2  text-white hover:scale-105 transition-transform ease-in-out duration-75 active:scale-105 basis-[35%] font-black tracking-tighter ${
            isAdded ? "bg-green-400" : ""
          }`}
          onClick={handleAddToCart}
        >
          {isAdded ? (
            <>
              View Cart <ShoppingCartIcon size={15} />
            </>
          ) : (
            "Add To Cart"
          )}
        </button>
      </div>
    </>
  );
};

export default MobileProductActions;
