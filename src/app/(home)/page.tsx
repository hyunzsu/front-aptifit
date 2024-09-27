"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { MajorCardSlider } from "./_components";
import s from "./HomePage.module.css";
import { postDataWithAuth } from "@/lib/services";

export default function HomePage() {
  const router = useRouter();
  const user = JSON.parse(sessionStorage.getItem("user")) || {};

  const startTest = async () => {
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
      router.push("/coupon");
      return;
    }

    // try {
    //   const result = await postDataWithAuth("submit_responses_university", {
    //     page: 1,
    //   });
    //   console.log(result);
    // } catch (error) {
    //   console.error(error.message);
    // }

    // //4. 테스트 페이지 이동
    // if (user.page > 10 && user.responses && user.questions) {
    //   alert("테스트 페이지로 이동합니다!");
    //   router.push(`/test/${user.page}`);
    //   return;
    // }

    // //5. 다 풀고, 결과지 데이터가 있으면 result로 이동
    // if (user.page === 10 && user.result) {
    //   alert("결과지 페이지로 이동합니다!");
    //   router.push(`/result`);
    //   return;
    // }
  };

  const continueTest = async () => {
    try {
    } catch (error) {}
  };

  return (
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
          {user.page && (
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
  );
}
