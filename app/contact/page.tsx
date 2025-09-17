"use client";
import Instagram from "@/app/Icons/Instagram";
import Facebook from "@/app/Icons/Facebook";
import Youtube from "@/app/Icons/Youtube";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "../Components/Contact/NewsletterForm";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-between px-4 py-10">
      {/* Logo, Title, Subtitle */}
      <div className="flex flex-col items-center mb-8 w-full lg:w-1/2">
        <Image
          src="/common/nbaBuzzLogo.png"
          alt="NBABUZZ Logo"
          width={120}
          height={100}
          className="mb-4"
        />
        <h1 className="text-3xl md:text-5xl font-black text-accent mb-2 tracking-tighter text-center">
          NBABUZZ.mk
        </h1>
        <p className="text-lg md:text-xl text-gray-700 font-semibold tracking-tight text-center mb-2">
          Clothing apparel for ballers
        </p>
        <p className="text-base text-gray-600 text-center max-w-xl">
          Custom and in-house basketball apparel designs and clothing. Safe
          purchases, extra quality, and unique style for every baller.
        </p>
      </div>

      {/* Info Cards */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#faf1d3] rounded-lg shadow p-6 flex flex-col items-center">
            <h3 className="font-bold text-lg mb-2 text-black">
              Safe Purchases
            </h3>
            <p className="text-gray-700 text-center">
              All orders are processed securely. We guarantee extra quality on
              every product.
            </p>
          </div>
          <div className="bg-[#faf1d3] rounded-lg shadow p-6 flex flex-col items-center">
            <h3 className="font-bold text-lg mb-2 text-black">24/7 Support</h3>
            <p className="text-gray-700 text-center">
              Need help? Our team is available 24/7 for any questions or
              support.
            </p>
          </div>
          <div className="bg-[#faf1d3] rounded-lg shadow p-6 flex flex-col items-center md:col-span-2">
            <h3 className="font-bold text-lg mb-2 text-black">Contact Us</h3>
            <p className="text-gray-700 text-center">
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:info@nbabuzz.mk"
                className="text-accent underline"
              >
                info@nbabuzz.mk
              </a>
              <br />
              <span className="font-semibold">Phone:</span>{" "}
              <a href="tel:+38977123123" className="text-accent underline">
                +389 77 123 123
              </a>
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 mb-8">
          <Link href={""} target="_blank">
            {" "}
            <Instagram />{" "}
          </Link>
          <Link href={""} target="_blank">
            {" "}
            <Facebook />{" "}
          </Link>
          <Link href={""} target="_blank">
            {" "}
            <Youtube />{" "}
          </Link>
        </div>

        {/* Newsletter */}
        <NewsletterForm />
      </div>
    </main>
  );
};

export default ContactPage;
