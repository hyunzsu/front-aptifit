"use client";

import FormInput from "@/components/FormInput/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormData, signupSchema } from "@/schemas/signup";
import s from "./SignUpForm.module.css";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <FormInput
        label="이름"
        name="username"
        register={register}
        error={errors.username}
        placeholder="사용자 이름을 입력하세요"
      />
      <FormInput
        label="이메일"
        name="email"
        type="email"
        register={register}
        error={errors.email}
        placeholder="이메일 주소를 입력하세요"
      />
      <FormInput
        label="비밀번호"
        name="password"
        type="password"
        register={register}
        error={errors.password}
        placeholder="비밀번호를 입력하세요"
      />
      <FormInput
        label="비밀번호 확인"
        name="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword}
        placeholder="비밀번호를 다시 입력하세요"
      />
      <button type="submit" className={s.button}>
        가입하기
      </button>
    </form>
  );
}
