"use client";

import FormInput from "@/components/FormInput/FormInput";
import s from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/schemas/signup";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { saveToSessionStorage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { GoogleLoginButton, NaverLoginButton, KakaoLoginButton } from "../";
import { useAuthStore } from "@/lib/stores";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        const { user_name, email, access_token } = result;

        // 응답 데이터
        login(access_token, { name: user_name, email: email });
        alert("로그인이 됐습니다!");
        router.push("/");
      } else {
        // 에러가 있을 때 에러 메시지에 접근
        console.error("에러 발생:", result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <FormInput
        label="이메일"
        name="email"
        type="email"
        register={register}
        error={errors.email}
        placeholder="test@test.com"
      />
      <div className={s.passwordWrapper}>
        <FormInput
          label="비밀번호"
          name="password"
          type={showPassword ? "text" : "password"}
          register={register}
          error={errors.password}
          placeholder="********"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={s.togglePassword}
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"}
        >
          <Image
            src={showPassword ? "/icons/eye-on.svg" : "/icons/eye-off.svg"}
            alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"}
            width={24}
            height={24}
            className={s.icon}
          />
        </button>
      </div>

      <button disabled={isSubmitting} type="submit" className={s.button}>
        {isSubmitting ? "Loading..." : "로그인"}
      </button>

      <Link href="/register" className={s.signupLink}>
        회원가입
      </Link>

      <div className={s.socialLogin}>
        <GoogleLoginButton />
        <NaverLoginButton />
        <KakaoLoginButton />
      </div>
    </form>
  );
}
