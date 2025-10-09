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
    <section className=" flex min-h-[calc(100dvh-64px)] w-full items-center justify-center px-4 py-10 text-titles">
      <div className="w-full max-w-md">
        <RegisterFrom tNs="auth.register" />
      </div>
    </section>
  );
};

export default RegisterPage;
