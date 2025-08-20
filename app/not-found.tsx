import React from "react";

const NotFoundPage = () => {
  return (
    <section className="h-[100dvh]">
      <div className="flex flex-col justify-center items-center h-full w-full pb-[12vh]">
         <img src="/Basketball.gif" alt="Funny gif" className="" />
        <h1 className="text-5xl md:text-8xl font-bold text-center text-accent relative z-10 tracking-tighter">
          Out Of Bounds
        </h1>

        <h2 className="text-xl md:text-2xl mt-2 text-center">
          Just A Bad pass
        </h2>
      </div>
    </section>
  );
};

export default NotFoundPage;
