"use client";
import React, { useEffect } from "react";
import RegisterFrom from "../../Components/Forms/RegisterFrom";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const t = useTranslations("auth.register");
  const isAuthenticated = useSelector((s: RootState) => s.user.isAuthenticated);
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) router.replace('/profile');
  }, [isAuthenticated, router]);
  return (
    <section className="h-[calc(100dvh-74px)] flex flex-col md:flex-row gap-5 justify-center items-center text-titles">
      <RegisterFrom tNs="auth.register" />

      <div className="w-[90%] md:w-[50%] border-t-[1px] md:border-t-0 md:border-l-[1px] border-gray-300 h-auto py-28 md:pt-0 md:pl-8">
        <h2 className="text-3xl text-center md:text-left font-bold mb-6">{t("withGoogle")}</h2>
      </div>
    </section>
  );
};

export default RegisterPage;
