"use client";
import Facebook from "@/app/Icons/Facebook";
import Instagram from "@/app/Icons/Instagram";
import Youtube from "@/app/Icons/Youtube";
import { Link } from "@/i18n/navigation";
import ContactForm from "../../Components/Contact/ContactForm";
import NewsletterForm from "../../Components/Contact/NewsletterForm";
import { useTranslations } from "next-intl";
import InViewSection from "@/app/Components/Common/InViewSection";

const ContactPage = () => {
  const t = useTranslations("contact");
  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-between px-4 pt-2 py-10">
      {/* Logo, Title, Subtitle */}
      <InViewSection className="flex flex-col items-center mb-8 w-full lg:w-[60%]">
        {/* <Image src="/logo.png" alt="TROJKA.mk Logo" width={120} height={100} className="mb-4" /> */}
        <h1 className="text-3xl md:text-5xl font-black text-accent mb-2 tracking-tighter text-center">{t("brand")}</h1>
        <p className="text-lg md:text-xl text-gray-700 font-semibold tracking-tight text-center mb-2">{t("subtitle")}</p>
        <p className="text-base text-gray-600 text-center max-w-xl">{t("description")}</p>

          <ContactForm />
        </InViewSection>

      {/* Info Cards */}
      <InViewSection className="w-full lg:w-1/2 flex flex-col items-center" delay={0.1}>
        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#faf1d3] rounded-lg shadow p-6 flex flex-col items-center">
            <h3 className="font-bold text-lg mb-2 text-black">{t("cards.safeTitle")}</h3>
            <p className="text-gray-700 text-center">{t("cards.safeText")}</p>
          </div>
          <div className="bg-[#faf1d3] rounded-lg shadow p-6 flex flex-col items-center">
            <h3 className="font-bold text-lg mb-2 text-black">{t("cards.supportTitle")}</h3>
            <p className="text-gray-700 text-center">{t("cards.supportText")}</p>
          </div>
          <div className="bg-[#faf1d3] rounded-lg shadow p-6 flex flex-col items-center md:col-span-2">
            <h3 className="font-bold text-lg mb-2 text-black">{t("cards.contactTitle")}</h3>
            <p className="text-gray-700 text-center">
              <span className="font-semibold">{t("cards.email")}</span>{" "}
              <a href="mailto:info@trojka.mk" className="text-accent underline">
                info@trojka.mk
              </a>
              <br />
              <span className="font-semibold">{t("cards.phone")}</span>{" "}
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
      </InViewSection>
    </main>
  );
};

export default ContactPage;
