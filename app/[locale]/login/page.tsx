import React from "react";
import LoginForm from "../../Components/Forms/LoginForm";
import { useTranslations } from "next-intl";

const LoginPage = () => {
  const t = useTranslations("auth.login");
  return (
    <section className="h-[80dvh] lg:h-[calc(100dvh - 74px)] flex justify-center items-center ">
      <LoginForm tNs="auth.login" />
    </section>
  );
};

export default LoginPage;
