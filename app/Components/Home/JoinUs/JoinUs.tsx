import { Link } from "@/i18n/navigation";
import SectionTitle from "../../Common/SectionTitle";
import Instagram from "@/app/Icons/Instagram";
import { useTranslations } from "next-intl";

const JoinUs = () => {
  const t = useTranslations("joinUs");
  return (
    <section className="px-6 py-[8dvh] xl:py-[16dvh]">
      <SectionTitle title={t("title")} />
      <p className="text-center w-[90%] m-auto md:w-[80%] lg:w-[30%]">
       {t("description")}
      </p>

      <div className="py-[3dvh]">
          <p className="text-center">{t("followUs")} </p>

        <div className="w-[40%] m-auto flex justify-center items-center gap-4 py-[1vh]">
          <Link href={"https://www.instagram.com/trojkamk/"} target="_blank">
            {" "}
            <Instagram />{" "}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
