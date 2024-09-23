"use client";

import FormInput from "@/components/FormInput/FormInput";
import s from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/schemas/signup";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
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
        <button type="button" className={s.socialButton}>
          <Image
            src="/icons/kakao.svg"
            alt="카카오 아이콘"
            width={60}
            height={60}
          />
        </button>
        <button type="button" className={s.socialButton}>
          <Image
            src="/icons/naver.svg"
            alt="네이버 아이콘"
            width={60}
            height={60}
          />
        </button>
        <button type="button" className={s.socialButton}>
          <Image
            src="/icons/google.svg"
            alt="구글 아이콘"
            width={60}
            height={60}
          />
        </button>
      </div>
    </form>
  );
}