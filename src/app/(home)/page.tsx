"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { MajorCardSlider } from "./_components";
import s from "./HomePage.module.css";
import { useAuthStore } from "@/lib/stores";
import { useStartTest } from "@/lib/hooks";
import { Navigation } from "@/components";

export default function HomePage() {
  const { handleStartTest, handleContinueTest } = useStartTest();
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

    handleStartTest();
  };

  // 테스트 이어할때
  const continueTest = () => {
    handleContinueTest();
  };

  return (
    <>
      <Navigation />
      <main className={s.HomePage}>
        <div className={s.titleContainer}>
          <p className={s.subtitle}>AI 기반 진단도구로 쉽고 빠르게</p>
          <p className={s.title}>너만의 전공적성을 찾아봐</p>
          <div className={s.buttonContainer}>
            <Button
              label="시작하기"
              type="button"
              pageType="main"
              onClick={startTest}
            />
            {user?.page && (
              <Button
                label="이어하기"
                type="button"
                pageType="main"
                onClick={continueTest}
              />
            )}
          </div>
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
    </>
  );
}
