import Image from "next/image";
import CheckoutForm from "../../Components/Checkout/CheckoutForm";
import { useTranslations } from "next-intl";

const CheckoutPage = () => {
  const t = useTranslations("checkout");

  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* RIGHT: Info/Branding */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-4 md:px-12 py-8 border-t md:border-t-0 md:border-l order-2 md:order-2">
        <Image src="/logo.png" alt="TROJKA.mk Logo" width={120} height={100} className="mb-4" />
        <h2 className="text-3xl font-black text-accent mb-2 tracking-tighter">TROJKA.mk</h2>
        <p className="text-lg text-gray-700 mb-6 font-semibold tracking-tight text-center">
          {t("subtitle")}
        </p>
        <div className="w-full max-w-md space-y-4">
          <div className="bg-[#faf1d3] rounded p-4 shadow">
            <h3 className="font-bold mb-1 text-black">{t("shippingInfoTitle")}</h3>
            <p className="text-sm text-gray-700">{t("shippingInfoText")}</p>
          </div>
          <div className="bg-[#faf1d3] rounded p-4 shadow">
            <h3 className="font-bold mb-1 text-black">{t("paymentInfoTitle")}</h3>
            <p className="text-sm text-gray-700">{t("paymentInfoText")}</p>
          </div>
          <div className="bg-[#faf1d3] rounded p-4 shadow">
            <h3 className="font-bold mb-1 text-black">{t("shippingCostTitle")}</h3>
            <p className="text-sm text-green-700 font-semibold">{t("shippingCostText")}</p>
          </div>
          <div className="bg-[#faf1d3] rounded p-4 shadow">
            <h3 className="font-bold mb-1 text-black">{t("returnPolicyTitle")}</h3>
            <p className="text-sm text-gray-700">{t("returnPolicyText")}</p>
          </div>
        </div>
      </section>

      {/* LEFT: Checkout Form (centered as a card) */}
      <CheckoutForm />
    </main>
  );
};

export default CheckoutPage;