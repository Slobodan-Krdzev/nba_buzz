import Image from "next/image";
import CheckoutForm from "../Components/Checkout/CheckoutForm";

const CheckoutPage = () => {

  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* RIGHT: Info/Branding */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-4 md:px-12 py-8 border-t md:border-t-0 md:border-l order-2 md:order-2">
        <Image
          src="/common/nbaBuzzLogo.png"
          alt="NBABUZZ Logo"
          width={120}
          height={100}
          className="mb-4"
        />
        <h2 className="text-3xl font-black text-accent mb-2 tracking-tighter">NBABUZZ.mk</h2>
        <p className="text-lg text-gray-700 mb-6 font-semibold tracking-tight text-center">
          Clothing apparel for ballers
        </p>
        <div className="w-full max-w-md space-y-4">
          <div className="bg-[#faf1d3] rounded p-4 shadow">
            <h3 className="font-bold mb-1 text-black">Shipping Info</h3>
            <p className="text-sm text-gray-700">
              Shipping is done in 2-3 days via local posts.
            </p>
          </div>
          <div className="bg-[#faf1d3] rounded p-4 shadow">
            <h3 className="font-bold mb-1 text-black">Payment Info</h3>
            <p className="text-sm text-gray-700">
              Payment is done on pickup. No online payment required.
            </p>
          </div>
          <div className="bg-[#faf1d3] rounded p-4 shadow">
            <h3 className="font-bold mb-1 text-black">Shipping Cost</h3>
            <p className="text-sm text-green-700 font-semibold">
              Shipping is <span className="font-bold">FREE</span> for all orders!
            </p>
          </div>
          <div className="bg-[#faf1d3] rounded p-4 shadow">
            <h3 className="font-bold mb-1 text-black">Return Policy</h3>
            <p className="text-sm text-gray-700">
              If you are not satisfied with your order, you can return it within 14 days of delivery for a full refund. Items must be unworn and in original condition.
            </p>
          </div>
        </div>
      </section>

      {/* LEFT: Checkout Form (centered as a card) */}
      <CheckoutForm />
    </main>
  );
};

export default CheckoutPage;