import SectionTitle from "../Components/Common/SectionTitle";

const NotFoundPage = () => {
  return (
    <section className="h-[60dvh]">
      <div className="flex flex-col justify-center items-center h-full w-full pb-[12vh]">
        <img src="/Basketball.gif" alt="Funny gif" className="" />
        <h1 className="text-5xl md:text-8xl font-bold text-center text-accent relative z-10 tracking-tighter">
          Out Of Bounds
        </h1>

        <SectionTitle title="Just A Bad Pass" />
      </div>
    </section>
  );
};

export default NotFoundPage;
