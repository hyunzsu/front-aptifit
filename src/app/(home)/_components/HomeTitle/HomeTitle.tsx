"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";
import { useTest, useResult } from "@/lib/hooks";
import { Button, Loading } from "@/components";
import s from "./HomeTitle.module.css";

export default function HomeTitle() {
  const { loading: testLoading, handleInitializeTest } = useTest();
  const { loading: resultLoading, handleInitializeResult } = useResult();
  const { user } = useAuthStore();
  const router = useRouter();

  // 처음 테스트 시작할떄
  const startTest = () => {
    // 1. 로그인 유무 파악 -> /login
    if (!user) {
      alert("로그인 페이지로 이동합니다!");
      router.push("/login");
      return;
    }

    // 2. 추가 정보 파악
    if (!user.IsAdditionalUserInfo) {
      alert("아직 입력하지 않은 정보가 있습니다!");
      router.push("/add-user-info");
      return;
    }

    // 3. 결제 유무 파악 -> /payment
    if (!user.IsPayment) {
      alert("결제정보가 없습니다!");
      router.push("/payment");
      return;
    }

    // 4. 결과지 유저일 경우
    if (user.page === 10) {
      handleInitializeResult();
      return;
    }

    // 5. 테스트 페이지 호출
    handleInitializeTest();
  };

  if (testLoading) {
    return <Loading text="테스트 로딩 중..." />;
  }

  if (resultLoading) {
    return <Loading text="결과지 로딩 중..." />;
  }

  return (
    <div className={s.HomeTitle}>
      <p className={s.subtitle}>AI 기반 진단도구로 쉽고 빠르게</p>
      <p className={s.title}>너만의 전공적성을 찾아봐</p>
      <Button
        disabled={testLoading || resultLoading}
        label="시작하기"
        type="button"
        pageType="main"
        onClick={startTest}
      />
    </div>
  );
}
