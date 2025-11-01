"use client";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import SectionTitle from "../../Components/Common/SectionTitle";
import { useSelector, useDispatch } from "react-redux";
import { applyCoupon, clearCoupon } from "../../Redux/Slices/cartSlice";
import { useState } from "react";
import {
  selectAll,
  removeChecked,
  toggleCheck,
  updateQty,
  removeFromCart,
} from "../../Redux/Slices/cartSlice";
import { RootState } from "../../Redux/store";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const t = useTranslations("cart");

  const checkedCount = cart.filter((item) => item.checked).length;
  const [couponInput, setCouponInput] = useState("");
  const [showCouponError, setShowCouponError] = useState(false);
  const [shakeCoupon, setShakeCoupon] = useState(false);
  const cartTotal = cart
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const discount = (useSelector((state: RootState) => state.cart.discountAmount) || 0);
  const appliedCode = useSelector((state: RootState) => state.cart.couponCode);
  const total = Math.max(0, cartTotal - discount);

  const validateCoupon = async () => {
    if (!couponInput) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput, subtotal: cartTotal }),
      });
      if (!res.ok) throw new Error('Invalid coupon');
      const data = await res.json();
      dispatch(applyCoupon({ code: data.coupon.code, discountAmount: data.discount }));
    } catch {
      setShowCouponError(true);
      setShakeCoupon(true);
      setTimeout(() => setShakeCoupon(false), 500);
      setTimeout(() => setShowCouponError(false), 2000);
    }
  };

  console.log("Cart Items:", cart);

  return (
    <>
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
    <div
      className={`min-h-screen bg-white font-sans  py-6 lg:py-12 ${cart.length === 0
        ? "min-h-[40vh] flex flex-col items-center justify-center"
        : ""
        }`}
    >
      {cart.length === 0 && (
        <div>
          <img src="/Basketball.gif" alt="Funny gif" />
        </div>
      )}
      <SectionTitle
        title={cart.length === 0 ? t("empty") : t("title")}
      />

      {cart.length > 0 && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8  w-[95%] xl:w-[80%] m-auto">
            {/* Cart Items */}

            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-2 ">
                <div>
                  <input
                    type="checkbox"
                    name="selectAll"
                    checked={checkedCount === cart.length && cart.length > 0}
                    onChange={(e) => dispatch(selectAll(e.target.checked))}
                    className="mr-2"
                  />
                  <label>{t("selectAll")}</label>
                </div>
                <button
                  className="ml-4 text-red-400"
                  onClick={() => dispatch(removeChecked())}
                  disabled={checkedCount === 0}
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 md:p-4">
                {cart.map((item) => (
                  <div
                    key={(item as unknown as { lineId: string }).lineId || `${item.product._id}:${item.size}:${item.color}`}
                    className="relative flex  flex-row items-stretch tracking-tighter border-b py-4 last:border-b-0"
                  >
                    <div className="flex items-center w-auto ">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => dispatch(toggleCheck((item as unknown as { lineId: string }).lineId || `${item.product._id}:${item.size}:${item.color}`))}
                        className="mr-2 md:mr-4"
                      />
                      <Image
                        src={item.product.galleryImages?.[0] ?? item.product.featuredImage ?? "/placeholder.jpg"}
                        alt={item.product.title}
                        width={150}
                        height={100}
                        loading="lazy"
                        className="w-[100px] h-[100px] sm:w-[150px] sm:h-[200px] object-cover rounded mr-4 shadow-md"
                      />
                    </div>
                    <div className="flex-1  flex flex-col basis-1/2 ">
                      <p className="text-xs text-gray-400">
                        {item.product.type?.name}
                      </p>
                      <p className="text-lg xl:text-3xl tracking-tighter font-bold">
                        {item.product.title}
                      </p>
                      <p className="font-bold tracking-tighter text-sm mt-1 md:hidden ">
                        {t("price")} €{item.product.price}.00
                      </p>
                      <div className="flex justify-start items-center gap-2 mt-2 mb-4">
                        <p className="block md:hidden text-xs xl:text-sm tracking-tighter font-semibold">
                          Size: {item.size.toUpperCase()}
                        </p>
                        <div className="flex items-center md:hidden text-xs xl:text-sm tracking-tighter font-semibold gap-2">
                          <p>{t("color")} </p>{" "}
                          <div
                            className="h-[15px] w-[15px] rounded-full border-2 bg-cover"
                            style={{
                              backgroundColor: item.product.colors?.find(
                                (c) => c.name === item.color
                              )?.color,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center mt-auto">
                        <button
                          className="px-3 py-1 border rounded bg-black text-white"
                          onClick={() =>
                            dispatch(
                              updateQty({
                                lineId: (item as unknown as { lineId: string }).lineId || `${item.product._id}:${item.size}:${item.color}`,
                                qty: item.qty - 1,
                              })
                            )
                          }
                        >
                          -
                        </button>
                        <span className="mx-2 px-2 ">
                          {item.qty.toString()}
                        </span>
                        <button
                          className="px-3 py-1 border rounded bg-black text-white"
                          onClick={() =>
                            dispatch(
                              updateQty({
                                lineId: (item as unknown as { lineId: string }).lineId || `${item.product._id}:${item.size}:${item.color}`,
                                qty: item.qty + 1,
                              })
                            )
                          }
                        >
                          +
                        </button>
                        <p className="hidden md:block ml-4 text-xs xl:text-sm tracking-tighter font-semibold">
                          {t("size")} {item.size.toUpperCase()}
                        </p>

                        <div className="ml-6 hidden md:flex items-center text-xs xl:text-sm tracking-tighter font-semibold gap-2">
                          <p>{t("color")} </p>{" "}
                          <div
                            className="h-[25px] w-[25px] rounded-full border-2 bg-cover"
                            style={{
                              backgroundColor: item.product.colors?.find(
                                (c) => c.name === item.color
                              )?.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block font-bold tracking-tighter text-xl mr-6 mt-2 md:mt-0 absolute top-5 right-0">
                      ${item.product.price}.00
                    </div>
                    <button
                      className="text-red-500 mt-2 md:mt-0 absolute bottom-6 right-2 md:right-5"
                      onClick={() => dispatch(removeFromCart((item as unknown as { lineId: string }).lineId || `${item.product._id}:${item.size}:${item.color}`))}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Order Summary */}
            <div
              className="hidden tracking-tighter lg:block w-full md:w-96 bg-[#faf1d3] rounded-lg p-6 mt-6 md:mt-8
    md:sticky md:top-[70px] h-fit self-start relative"
            >
              {/* Coupon Error Popup */}
              {showCouponError && (
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-16 bg-red-500 text-white px-4 py-2 rounded shadow-lg text-sm font-semibold z-50
                    ${shakeCoupon ? "animate-shake" : ""}`}
                >
                  {t("invalidCoupon")}
                </div>
              )}
              
              <h3 className="text-lg font-semibold mb-4">{t("orderSummary")}</h3>
              <div className="flex mb-3">
                <input
                  type="text"
                  placeholder={t("couponPlaceholder")}
                  className="border rounded px-3 py-2 flex-1"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  disabled={Boolean(appliedCode)}
                />
                {!appliedCode ? (
                  <button onClick={validateCoupon} className="ml-2 px-4 py-2 bg-black text-white rounded">
                    {t("apply")}
                  </button>
                ) : (
                  <button onClick={() => dispatch(clearCoupon())} className="ml-2 px-4 py-2 border border-gray-300 rounded">
                    {t("remove")}
                  </button>
                )}
              </div>
              {appliedCode && (
                <div className="flex justify-between mb-2 text-green-700">
                  <span>Coupon ({appliedCode})</span>
                  <span>- ${discount}</span>
                </div>
              )}
              <div className="flex justify-between mb-2">
                <span>{t("cartItems")}</span>
                <span>{cart.length} {t("items")}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>{t("cartTotal")}</span>
                <span>${cartTotal}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>{t("shippingCharges")}</span>
                <span>Calculated at checkout</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>{t("total")}</span>
                <span>${total}.00</span>
              </div>
              <Link href="/checkout" className="text-center  block mt-2 sm:mt-0  w-full  py-2 px-6 bg-black text-white rounded font-bold tracking-tighter gap-2">
                {t("checkout")}
              </Link >
            </div>
          </div>
          {/* MOBILE SUMMARY */}
          <div className="fixed shadow-glow-top bottom-0 left-0 w-full bg-[#faf1d3] border-t z-30 p-4 flex flex-col sm:flex-row items-center justify-between lg:hidden">
            <div className="flex justify-between  gap-2 w-full">
              <p className="font-bold text-lg">{t("total")} ${total}</p>
              <div className="flex justify-between items-center mb-2 text-xs text-gray-600">{t("shippingCharges")} · calculated at checkout</div>
            </div>
            <Link href="/checkout" className="block mt-2 sm:mt-0 sm:ml-4 w-full sm:w-auto py-2 px-6 bg-black text-white rounded font-bold tracking-tighter gap-2">
              {t("checkout")}
            </Link >
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default CartPage;
