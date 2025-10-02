"use client";
import SectionTitle from "../Components/Common/SectionTitle";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Simply browse our collections, add your favorite items to the cart, and proceed to checkout. Follow the instructions to complete your purchase securely."
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Currently we only support only pay on delivery."
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times vary by location, but most orders are delivered within 3-7 business days. You’ll receive a tracking number once your order ships."
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "Yes! If you’re not satisfied, you can return or exchange your item within 14 days of delivery. Please see our Returns Policy for details."
  },
  {
    question: "Are your products authentic and in-house designed?",
    answer:
      "Absolutely. All designs are created by our team and produced with premium materials for true basketball fans."
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach us via email at info@nbabuzz.mk or use the contact form on our Contact page. Our team is available 24/7."
  }
];

const FAQPage = () => {
  return (
    <main className="min-h-screen bg-white px-4 py-10 flex flex-col items-center">
      <SectionTitle title="Frequently Asked Questions" />
      <div className="w-full max-w-2xl mt-8 space-y-6">
        {faqs.map((faq, idx) => (
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
