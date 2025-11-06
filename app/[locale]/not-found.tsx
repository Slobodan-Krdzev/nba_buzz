import SectionTitle from "../Components/Common/SectionTitle";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <section className="h-[60dvh]">
      <div className="flex flex-col justify-center items-center h-full w-full pb-[12vh]">
        <Image src="/Basketball.gif" alt="Funny gif" width={200} height={200} unoptimized />
        <h1 className="text-5xl md:text-8xl font-bold text-center text-accent relative z-10 tracking-tighter">
          Out Of Bounds
        </h1>

        <SectionTitle title="Just A Bad Pass" />
      </div>
    </section>
  );
};

export default NotFoundPage;
