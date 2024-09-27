"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { MajorCardSlider } from "./_components";
import { useAuthStore } from "@/lib/stores";
import s from "./HomePage.module.css";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  const startTest = () => {
    const {
      IsPayment,
      IsAdditionalUserInfo,
      page,
      responses,
      questions,
      result,
    } = isLoggedIn;

    // 1. 로그인 유무 파악 -> /login
    if (!isLoggedIn) {
      alert("로그인 페이지로 이동합니다!");
      router.push("/login");
      return;
    }

    // 2. 추가 정보 파악
    if (!IsAdditionalUserInfo) {
      alert("아직 입력하지 않은 정보가 있습니다!");
      router.push("/add-user-info");
      return;
    }

    //3. 결제 유무 파악 -> /payment
    if (!IsPayment) {
      alert("결제정보가 없습니다!");
      router.push("/payment");
      return;
    }

    //4. 테스트 페이지 이동
    if (page > 10 && responses && questions) {
      alert("테스트 페이지로 이동합니다!");
      router.push(`/test/${page}`);
      return;
    }

    //5. 다 풀고, 결과지 데이터가 있으면 result로 이동
    if (page === 10 && result) {
      alert("결과지 페이지로 이동합니다!");
      router.push(`/result`);
      return;
    }
  };

  return (
    <main className={s.HomePage}>
      <div className={s.titleContainer}>
        <p className={s.subtitle}>AI 기반 진단도구로 쉽고 빠르게</p>
        <p className={s.title}>너만의 전공적성을 찾아봐</p>
        <Button
          label="검사 시작하기"
          type="button"
          pageType="main"
          onClick={startTest}
        />
      </div>
      <Image
        className={s.iphone}
        src="/imgs/iphone.png"
        alt="아이폰"
        width={320}
        height={727}
      />
      <div className={s.cardAnimationContainer}>
        <MajorCardSlider />
      </div>
    </main>
  );
}
