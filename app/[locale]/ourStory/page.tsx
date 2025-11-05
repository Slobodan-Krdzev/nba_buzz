import SectionTitle from "@/app/Components/Common/SectionTitle";
import NewsletterForm from "@/app/Components/Contact/NewsletterForm";
import Facebook from "@/app/Icons/Facebook";
import Instagram from "@/app/Icons/Instagram";
import Youtube from "@/app/Icons/Youtube";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import InViewSection from "@/app/Components/Common/InViewSection";

export default function OurStoryPage() {
  const t = useTranslations("ourStory");

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionTitle title={t("title")} />

      <InViewSection className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-8">
        <div>
          <h3 className="text-2xl font-black text-titles mb-3 text-center">
            {t("startedTitle")}
          </h3>
          <p className="text-titles/90 leading-relaxed text-center">
            {t("startedText")}
          </p>
        </div>
        <div className="relative w-full h-[260px] sm:h-[340px] rounded-xl overflow-hidden shadow-xl text-center">
          <Image
            src="/poses/1.jpg"
            alt="Studio work"
            fill
            className="object-cover"
          />
        </div>
      </InViewSection>

      <InViewSection className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-8">
        <div className="relative w-full h-[260px] sm:h-[340px] rounded-xl overflow-hidden shadow-xl">
          <Image
            src="/poses/holyWide.jpg"
            alt="Funky concepts"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl font-black text-titles mb-3 text-center">
            {t("funTitle")}
          </h3>
          <p className="text-titles/90 leading-relaxed text-center">
            {t("funText")}
          </p>
        </div>
      </InViewSection>

      <InViewSection className="py-10">
        <SectionTitle title={t("craftTitle")} />
        <p className="text-center max-w-3xl mx-auto text-titles/90 mb-8">
          {t("craftText")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="relative h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/poses/2.jpg"
              alt="Garment 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/poses/holyClose.jpg"
              alt="Garment 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/poses/holyBasket.jpg"
              alt="Garment 3"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/poses/holyBlus.jpg"
              alt="Garment 4"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/poses/1.jpg"
              alt="Garment 5"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/poses/holyBack.jpg"
              alt="Garment 6"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </InViewSection>

      <InViewSection className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <SectionTitle title={t("serviceTitle")} />
          <ul className="space-y-2 text-titles/90">
            <li className="text-center">• {t("quality1")}</li>
            <li className="text-center">• {t("quality2")}</li>
            <li className="text-center">• {t("quality3")}</li>
          </ul>
          <div className="mt-6 text-titles">
            <p className="text-center">
              <span className="font-semibold">{t("contact.email")}</span>{" "}
              <a className="underline text-accent" href="mailto:info@trojka.mk">
                info@trojka.mk
              </a>
            </p>
            <p className="text-center">
              <span className="font-semibold">{t("contact.phone")}</span>{" "}
              <a className="underline text-accent" href="tel:+38977123123">
                +389 77 123 123
              </a>
            </p>
            <p className="mt-2 text-sm text-titles/70 text-center mb-3    ">
              {t("contact.support")}
            </p>
            <div className="w-[40%] m-auto flex justify-center items-center gap-4 py-[1vh]">
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
          </div>
        </div>
        <div >
          <SectionTitle title={t("newsletterTitle")} />
          <div className="flex justify-center items-center">
            <NewsletterForm />
          </div>
        
        </div>
      </InViewSection>
    </main>
  );
}
