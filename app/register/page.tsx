import React from "react";
import RegisterFrom from "../Components/Forms/RegisterFrom";

const RegisterPage = () => {
  return (
    <section className="h-[calc(100dvh-74px)] flex flex-col md:flex-row gap-5 justify-center items-center text-titles">
      <RegisterFrom />

      <div className="w-[90%] md:w-[50%] border-t-[1px] md:border-t-0 md:border-l-[1px] border-gray-300 h-auto py-28 md:pt-0 md:pl-8">
        <h2 className="text-3xl text-center md:text-left font-bold mb-6">Register With Google</h2>
      </div>
    </section>
  );
};

export default RegisterPage;
