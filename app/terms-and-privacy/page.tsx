// import Image from "next/image";
import React from "react";

const TearmsAndPrivacy = () => {
  return (
    <section className="py-[8dvh] m-auto w-[90%] md:w-[60%] ">
      <div className="relative flex flex-col items-center gap-2 w-full">
        {/* <Image
          src={"/common/nbaBuzzLogo.png"}
          alt="Logo"
          width={120}
          height={120}
        /> */}
        <h1 className="text-4xl md:text-6xl font-bold text-center text-accent relative z-10 ">
          NBABUZZ.MK
        </h1>
        <h2 className="text-lg md:text-xl mb-[5vh] text-center tracking-tighter">
          For those who want to stand out.
        </h2>
      </div>
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh]">
        Privacy Policy
      </h2>
      {/* <br /> */}
      – NBABUZZ.mk respects your privacy and is committed to protecting the personal data you share with us.
      <br />
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh] mt-[2vh]">
        What data do we collect:
      </h2>
      &bull; Name and surname
      <br />
      &bull; Email address and phone number
      <br />
      &bull; Delivery address
      <br />
      &bull; Payment information (processed through secure payment processors – we do not store your card details)
      <br />
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh] mt-[2vh]">
        How we use your data:
      </h2>
      &bull; For processing and delivering orders
      <br /> &bull; For order status notifications
      <br /> &bull; For promotional email messages (only with your consent)
      <br /> &bull; For improving our service <br />
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh] mt-[2vh]">
        Data protection:
      </h2>
      Your information is stored securely and is not shared with third parties, except when necessary for: Delivery (courier services) Payment (bank/payment processors)
      <br />
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh] mt-[2vh]">
        Your rights:
      </h2>
  &bull; Access and correction of data <br /> &bull; Deletion of data (&quot;right to be forgotten&quot;)
      <br /> &bull; Unsubscribe from marketing messages
      <h2 className="text-2xl  tracking-tighter mb-[1vh] mt-[2vh]">
        For questions, contact: <b>support@nbabuzz.mk</b>
      </h2>
    </section>
  );
};

export default TearmsAndPrivacy;
