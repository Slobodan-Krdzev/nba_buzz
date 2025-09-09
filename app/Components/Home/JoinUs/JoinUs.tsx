import Link from "next/link";
import SectionTitle from "../../Common/SectionTitle";
import Instagram from "@/app/Icons/Instagram";
import Facebook from "@/app/Icons/Facebook";
import Youtube from "@/app/Icons/Youtube";

const JoinUs = () => {
  return (
    <section className="px-6 py-[8dvh] xl:py-[16dvh]">
      <SectionTitle title="We’ve got your back 24/7" />
      <p className="text-center w-[90%] m-auto md:w-[80%] lg:w-[30%]">
        Feel free to reach out if you have any questions or need assistence, our
        team is at your service anytime. info@nbabuzz.com
      </p>

      <div className="py-[3dvh]">
        <p className="text-center">Follow Us: </p>

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
    </section>
  );
};

export default JoinUs;
