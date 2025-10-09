import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";
import { useTranslations } from "next-intl";

interface FooterList {
  title: string;
  links: {
    title: string;
    link: string;
  }[];
}

// Footer lists are built from translations for localized UI

const Footer = () => {
  const t = useTranslations();

  const footerLists: FooterList[] = [
    {
      title: t("navbar.shop"),
      links: [
        { title: t("home.hero.joker.title"), link: "/theJoker" },
        { title: t("home.hero.luka.title"), link: "/luka" },
        { title: t("home.hero.antic.title"), link: "/antic" },
      ],
    },
    {
      title: t("navbar.contact"),
      links: [
        { title: `${t("contact.cards.email")} office@nbabuzzmk.com`, link: "/contact" },
        { title: `${t("contact.cards.phone")} +38977551012`, link: "/contact" },
      ],
    },
    {
      title: t("footer.info"),
      links: [
        { title: t("ourStory.title"), link: "/ourStory" },
        { title: t("footer.faq"), link: "/faq" },
        { title: t("footer.termsAndPrivacy"), link: "/terms-and-privacy" },
      ],
    },
    {
      title: t("navbar.account"),
      links: [
        { title: t("auth.login.title"), link: "/login" },
        { title: t("footer.myAccount"), link: "/profile" },
        { title: t("profile.ordersTitle"), link: "/profile" },
        { title: t("footer.wishlist"), link: "/account" },
      ],
    },
  ];
  return (
    <footer className='bg-[url("/common/footerBg.png")] bg-cover relative text-white'>
      <div
      className="w-full h-full"
        style={{
          backgroundColor: "#00000099",
        }}
      >
        <div className="w-[90%] lg:w-[80%] m-auto py-[6vh]">
          <div className="mb-[8vh] flex items-center gap-4 ">
            <Image
              src={"/common/nbaBuzzLogo.png"}
              alt="Logo"
              width={120}
              height={120}
            />
            <div>
              <h4 className="text-3xl md:text-4xl font-black tracking-tighter">
                NBABUZZMK
              </h4>
              <p className="text-sm md:text-xl">
                {t("footer.subtitle")} <br />
                {t("footer.subtitle2")}
              </p>
            </div>
          </div>

          <div className="flex gap-10 flex-col md:flex-row mb-[8vh]">
            {footerLists.map((list) => (
              <div key={list.title} className="basis-1/4">
                <h5 className="font-semibold text-2xl tracking-tighter uppercase mb-5">
                  {list.title}
                </h5>
                <ul>
                  {list.links.map((link) => (
                    <li key={link.title} className="mb-2">
                      <Link href={link.link}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between absolute py-4 bottom-0 left-0 right-0 w-[90%] lg:w-[80%] m-auto border-t-[0.5px] border-gray-400">
        <p className="text-xs md:text-sm">
          © {new Date().getFullYear()} Copyright NBABUZZ.MK
        </p>
        <Link
          href={"https://zicgroupbpo.com/"}
          className="text-xs md:text-sm flex justify-end items-center gap-1"
          target="_blank"
        >
          {t("footer.poweredBy")}
          <Image src={"/zicLogo.webp"} alt={""} width={80} height={50} />{" "}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
