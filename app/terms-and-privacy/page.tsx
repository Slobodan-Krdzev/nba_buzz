import Image from "next/image";
import React from "react";

const TearmsAndPrivacy = () => {
  return (
    <section className="py-[8dvh] m-auto w-[90%] md:w-[60%] ">
      <div className="relative flex flex-col items-center gap-2 w-full">
        <Image
          src={"/common/nbaBuzzLogo.png"}
          alt="Logo"
          width={120}
          height={120}
        />
        <h1 className="text-4xl md:text-6xl font-bold text-center text-accent relative z-10 ">
          NBABUZZ.MK
        </h1>
        <h2 className="text-lg md:text-xl mb-[5vh] text-center tracking-tighter">
          For those who want to stand out.
        </h2>
      </div>
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh]">
        Политика за приватност
      </h2>
      {/* <br /> */}
      – NBABUZZ.mk NBABUZZ.mk ја почитува вашата приватност и се обврзува да ги
      заштити личните податоци кои ги споделувате со нас.
      <br />{" "}
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh] mt-[2vh]">
        Кои податоци ги собираме:
      </h2>{" "}
      &bull; Име и презиме
      <br />
      &bull; Е-маил адреса и телефон
      <br />
      &bull; Адреса за достава
      <br />
      &bull; Информации за плаќање (се обработуваат преку сигурни платежни
      процесори – ние не ги чуваме вашите картички)
      <br />
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh] mt-[2vh]">
        Како ги користиме податоците:
      </h2>
      &bull; За процесирање и испорака на нарачките
      <br /> &bull; За известувања за статус на нарачка
      <br /> &bull;За промотивни е-маил пораки (само со ваша согласност)
      <br /> &bull;За подобрување на нашата услуга <br />
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh] mt-[2vh]">
        Заштита на податоци:
      </h2>
      Вашите информации се чуваат сигурно и не се споделуваат со трети лица,
      освен кога е неопходно за: Испорака (курирски служби) Плаќање
      (банкарски/платежни процесори)
      <br />
      <h2 className="text-3xl font-bold tracking-tighter mb-[1vh] mt-[2vh]">
        Ваши права:
      </h2>
      &bull; Пристап и исправка на податоците <br /> &bull; Бришење на
      податоците („право да се биде заборавен“)
      <br /> &bull; Откажување од маркетинг пораки
      <h2 className="text-2xl  tracking-tighter mb-[1vh] mt-[2vh]">
        {" "}
        За прашања, контактирајте: <b>support@nbabuzz.mk</b>
      </h2>
    </section>
  );
};

export default TearmsAndPrivacy;
