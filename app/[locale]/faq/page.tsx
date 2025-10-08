"use client";
import SectionTitle from "../../Components/Common/SectionTitle";
import { useTranslations } from "next-intl";

const FAQPage = () => {
  const t = useTranslations("faq");
  const items = [0, 1, 2, 3, 4, 5].map((i) => ({
    question: t(`items.${i}.q`),
    answer: t(`items.${i}.a`)
  }));

  return (
    <main className="min-h-screen bg-white px-4 py-10 flex flex-col items-center">
      <SectionTitle title={t("title")} />
      <div className="w-full max-w-2xl mt-8 space-y-6">
        {items.map((faq, idx) => (
          <div key={idx} className="bg-[#faf1d3] rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-2 text-black">{faq.question}</h3>
            <p className="text-gray-700 text-base">{faq.answer}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default FAQPage;
