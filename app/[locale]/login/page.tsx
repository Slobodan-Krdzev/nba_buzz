"use client";
import LoginForm from "../../Components/Forms/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const isAuthenticated = useSelector((s: RootState) => s.user.isAuthenticated);
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) router.replace('/profile');
  }, [isAuthenticated, router]);
  return (
    <section className="h-[80dvh] lg:h-[calc(100dvh - 74px)] flex justify-center items-center ">
      <LoginForm tNs="auth.login" />
    </section>
  );
};

export default LoginPage;
