import Image from "next/image";
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
      { title: "office@nbabuzzmk.com", link: "/mail" },
      { title: "+38977551012", link: "/tel" },
    ],
  },
  {
    title: "Info",
    links: [
      { title: "Jerseys", link: "/products" },
      { title: "T-Shirts", link: "/products" },
      { title: "Hoodies", link: "/products" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className='bg-[url("/common/footerBg.png")] bg-cover lg:min-h-[650px] relative text-white'>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#00000099",
        }}
      >
        <div className="w-[90%] lg:w-[80%] m-auto py-[10vh]">
          {/* ROW 1 */}
          <div className="mb-[5vh] flex gap-4 items-end">
            <Image
              src={"/common/nbaBuzzLogo.png"}
              alt="Logo"
              width={120}
              height={120}
            />
            <div>
              <h4 className="text-2xl font-black tracking-tighter">
                NBABUZZMK
              </h4>
              <p>
                NBA based apperral brand. <br />
                Top notch quality & prints - unique ideas -in-house design.
              </p>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="flex gap-10">
            {footerLists.map((list) => (
              <div key={list.title} className="basis-1/4">
                <h5>{list.title}</h5>
                <ul>
                  {list.links.map((link) => (
                    <li key={link.title}>{link.title}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div  className="basis-1/4">
              <h5>SAFE PURCHASE</h5>
              <p>Cash on delivery payment, the option to exchange products or request a refund within 30 days, and 24/7 customer support.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
