import React from "react";
import LoginForm from "../Components/Forms/LoginForm";

const LoginPage = () => {
  return (
    <section className="h-[80dvh] lg:h-[calc(100dvh - 74px)] flex justify-center items-center ">
      <LoginForm />
    </section>
  );
};

export default LoginPage;
