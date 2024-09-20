"use client";

import FormInput from "@/components/FormInput/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormData, signupSchema } from "@/schemas/signup";
import s from "./SignUpForm.module.css";

export default function SignUpForm() {
  const {
    register, // 입력 필드 등록 함수
    handleSubmit, // 폼 제출
    formState: { errors, isSubmitting }, // 폼 상태 (에러, 제출중 여부)
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema), // zod 스키마 사용한 유효성 검사 설정
    mode: "onChange", // 실시간 유효성 검사
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
        label="휴대폰 번호"
        name="phoneNumber"
        type="tel"
        register={register}
        error={errors.phoneNumber}
        placeholder="휴대폰 번호를 입력하세요"
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
      <div className={s.agreementSection}>
        <h3 className={s.h3}>약관 동의</h3>
        <FormInput
          label="앱티핏 이용약관에 동의 (필수)"
          name="agreeToTerms"
          register={register}
          error={errors.agreeToTerms}
          isCheckbox={true}
        />
        <FormInput
          label="개인정보 수집 및 이용에 동의 (필수)"
          name="agreeToPrivacyPolicy"
          register={register}
          error={errors.agreeToPrivacyPolicy}
          isCheckbox={true}
        />
      </div>

      <button disabled={isSubmitting} type="submit" className={s.button}>
        {isSubmitting ? "Loading..." : "가입하기"}
      </button>
    </form>
  );
}
