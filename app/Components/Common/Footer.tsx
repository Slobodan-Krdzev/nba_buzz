import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FooterList {
  title: string;
  links: {
    title: string;
    link: string;
  }[];
}

export const footerLists: FooterList[] = [
  {
    title: "Shop",
    links: [
      { title: "Jerseys", link: "/products" },
      { title: "T-Shirts", link: "/products" },
      { title: "Hoodies", link: "/products" },
    ],
  },
  {
    title: "Contact",
    links: [
      { title: "E-Mail: office@nbabuzzmk.com", link: "/mail" },
      { title: "Phone: +38977551012", link: "/tel" },
    ],
  },
  {
    title: "Info",
    links: [
      { title: "Our Story", link: "/about-us" },

      { title: "FAQ", link: "/faq" },
      { title: "Terms and Privacy", link: "/terms-privacy" },
    ],
  },
  {
    title: "Account",
    links: [
      { title: "Login", link: "/login" },
      { title: "My Account", link: "/account" },
      { title: "Orders", link: "/account" },
      { title: "Whishlist", link: "/account" },
    ],
  },
];

const Footer = () => {
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
                NBA based apperral brand. <br />
                Top notch quality & prints - unique ideas -in-house design.
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
          Powered By:
          <Image src={"/zicLogo.webp"} alt={""} width={80} height={50} />{" "}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
