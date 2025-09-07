"use client";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import SectionTitle from "../Components/Common/SectionTitle";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAll,
  removeChecked,
  toggleCheck,
  updateQty,
  removeFromCart,
} from "../Redux/Slices/cartSlice";
import { RootState } from "../Redux/store";

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const checkedCount = cart.filter((item) => item.checked).length;
  const cartTotal = cart
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const shipping = 0;
  const total = cartTotal + shipping;

  return (
    <div
      className={`min-h-screen bg-white font-sans  py-6 lg:py-12 ${
        cart.length === 0
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
        title={cart.length === 0 ? "Your cart is empty" : "Shopping Cart"}
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
                  <label>Select All</label>
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
                    key={item.product._id}
                    className="relative flex  flex-row items-stretch tracking-tighter border-b py-4 last:border-b-0"
                  >
                    <div className="flex items-center w-auto ">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => dispatch(toggleCheck(item.product._id))}
                        className="mr-2 md:mr-4"
                      />
                      <Image
                        src={item.product.gallery.front}
                        alt={item.product.name}
                        width={150}
                        height={100}
                        loading="lazy"
                        className="w-[100px] h-[100px] sm:w-[150px] sm:h-[200px] object-cover rounded mr-4 shadow-md"
                      />
                    </div>
                    <div className="flex-1  flex flex-col basis-1/2 ">
                      <p className="text-xs text-gray-400">
                        {item.product.type}
                      </p>
                      <p className="text-lg xl:text-3xl tracking-tighter font-bold">
                        {item.product.name}
                      </p>
                      <p className="hidden md:block text-xs xl:text-md text-gray-500 ">
                        {item.product.description.player}
                      </p>
                      <p className="font-bold tracking-tighter text-sm mt-1 md:hidden ">
                        ${item.product.price}.00
                      </p>
                      <p className="block md:hidden text-xs xl:text-sm tracking-tighter font-semibold">
                        Size: S
                      </p>
                      <div className="flex items-center mt-auto">
                        <button
                          className="px-3 py-1 border rounded bg-black text-white"
                          onClick={() =>
                            dispatch(
                              updateQty({
                                id: item.product._id,
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
                                id: item.product._id,
                                qty: item.qty + 1,
                              })
                            )
                          }
                        >
                          +
                        </button>
                        <p className="hidden md:block ml-4 text-xs xl:text-sm tracking-tighter font-semibold">
                          Size: S
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block font-bold tracking-tighter text-xl mr-6 mt-2 md:mt-0 absolute top-5 right-0">
                      ${item.product.price}.00
                    </div>
                    <button
                      className="text-red-500 mt-2 md:mt-0 absolute bottom-6 right-2 md:right-5"
                      onClick={() => dispatch(removeFromCart(item.product._id))}
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
    md:sticky md:top-[70px] h-fit self-start"
            >
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="flex mb-3">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="border rounded px-3 py-2 flex-1"
                />
                <button className="ml-2 px-4 py-2 bg-black text-white rounded">
                  Apply
                </button>
              </div>
              <div className="flex justify-between mb-2">
                <span>Cart Items:</span>
                <span>{cart.length} Items</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Cart Total</span>
                <span>${cartTotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping Charges</span>
                <span className="text-green-600 font-medium">
                  Free <span className="line-through text-gray-400">$2</span>
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total</span>
                <span>${total}.00</span>
              </div>
              <button className=" w-full py-3 tracking-tighter bg-black text-white rounded font-bold flex items-center justify-center gap-2">
                Checkout
              </button>
            </div>
          </div>
          {/* MOBILE SUMMARY */}
          <div className="fixed shadow-glow-top bottom-0 left-0 w-full bg-[#faf1d3] border-t z-30 p-4 flex flex-col sm:flex-row items-center justify-between lg:hidden">
            <div className="flex justify-between  gap-2 w-full">
              <p className="font-bold text-lg">Total: ${total}</p>
              <div className="flex justify-between items-center mb-2 text-xs">
                <span>Shipping: </span>
                <span className="text-green-600 font-medium ml-1">
                  Free <span className="line-through text-gray-400">$2</span>
                </span>
              </div>
            </div>
            <button className="mt-2 sm:mt-0 sm:ml-4 w-full sm:w-auto py-2 px-6 bg-black text-white rounded font-bold tracking-tighter flex items-center justify-center gap-2">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
