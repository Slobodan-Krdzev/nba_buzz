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
import { useTranslations } from "next-intl";

interface MobileProductActionsProps {
  product: Product;
}

const MobileProductActions = ({ product }: MobileProductActionsProps) => {
  const t = useTranslations('product');
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();
  const count = useSelector((state: RootState) => state.counter.value);

  const [itemColorSize, setItemColorSize] = useState({
    color: "",
    size: "",
  });

  // NEW: warning and shake state
  const [showWarning, setShowWarning] = useState(false);
  const [shake, setShake] = useState(false);

  const handleAddToCart = () => {
    if (!itemColorSize.color || !itemColorSize.size) {
      setShowWarning(true);
      setShake(true);
      setTimeout(() => setShake(false), 500); // Remove shake after animation
      setTimeout(() => setShowWarning(false), 2000); // Hide warning after 2s
      return;
    }
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
        {t('sizes')} & {t('colors')}
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
            {t('close')}
          </button>
          <div className="text-2xl tracking-tighter font-black">
            {t('selectSizesColors')}
          </div>
          <div>
            <div className="mb-6">
              <h2 className="text-xl tracking-tighter mb-2 font-black capitalize">
                {t('sizes')}
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
              {t('colors')}
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
        <div className="basis-[25%] text-lg tracking-tighter py-5 font-black capitalize text-white flex flex-col justify-center items-center bg-black">
          {product.isPromotion && product.salePrice ? (
            <>
              <span className="text-[#FF6B35]">€{product.salePrice}.00</span>
              <span className="text-xs line-through opacity-70">€{product.price}.00</span>
            </>
          ) : (
            <span>€{product.price}.00</span>
          )}
        </div>
        
        <button
          className={`bg-accent flex justify-center items-center gap-3 p-2  text-white transition-transform ease-in-out duration-75 active:scale-105 basis-[35%] font-black tracking-tighter ${
            isAdded ? "bg-green-400" : ""
          }`}
          onClick={handleAddToCart}
        >
          {isAdded ? (
            <>
              {t('viewCart')} <ShoppingCartIcon size={15} />
            </>
          ) : (
            t('addToCart')
          )}
        </button>
      </div>

{/* Warning Pop-up */}
          {showWarning && (
            <div
              className={`absolute left-1/2 -translate-x-1/2 bottom-28 bg-red-500 text-white px-4 py-2 rounded shadow-lg text-sm font-semibold z-50
                ${shake ? "animate-shake" : ""}`}
            >
              {t('selectColorSizeWarning')}
            </div>
          )}

      {/* Shake animation style */}
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
    </>
  );
};

export default MobileProductActions;