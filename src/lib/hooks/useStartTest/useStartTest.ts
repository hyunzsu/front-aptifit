"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";

/* 
useStartTest

fetch 통신 이후 useAuthStore에 유저 데이터와 액세스 토큰을 각각 저장해
로그인 상태를 만들고 추가 회원정보 페이지 이동을 수행한다.
*/

const useStartTest = () => {
  const { user, access_token } = useAuthStore();
  const router = useRouter();

  const handleStartTest = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/submit_responses_university`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            user_id: user.user_id,
          }),
        }
      );

      const fetchResult = await response.json();
      const { questions, responses, page, user_id } = fetchResult;

      if (!response.ok) {
        console.error("에러 발생:", fetchResult.error);
        alert(fetchResult.error);
        return;
      }

      sessionStorage.setItem(
        "aptifit1",
        JSON.stringify({
          questions: questions,
          responses: responses,
          page: page,
          user_id: user_id,
        })
      );

      alert("테스트 페이지로 이동합니다!");
      router.push("/test/1");

      console.log(fetchResult);
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  const handleContinueTest = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/continue_responses_university`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            user_id: user.user_id,
            page: user.page,
          }),
        }
      );

      const fetchResult = await response.json();

      if (!response.ok) {
        console.error("에러 발생:", fetchResult.error);
        alert(fetchResult.error);
        return;
      }

      if (fetchResult.page === 10) {
        sessionStorage.setItem(
          `aptifit${fetchResult.page}`,
          JSON.stringify({
            major1: fetchResult.major1,
            major2: fetchResult.major2,
            major3: fetchResult.major3,
            major4: fetchResult.major4,
            major5: fetchResult.major5,
            name: fetchResult.name,
            page: fetchResult.page,
            user_id: fetchResult.user_id,
          })
        );

        alert("결과지 페이지로 이동합니다!");
        router.push(`/result`);
        return;
      }

      sessionStorage.setItem(
        `aptifit${fetchResult.page}`,
        JSON.stringify({
          questions: fetchResult.questions,
          responses: fetchResult.responses,
          page: fetchResult.page,
          user_id: fetchResult.user_id,
        })
      );

      alert("테스트 페이지로 이동합니다!");
      router.push(`/test/${fetchResult.page}`);

      console.log(fetchResult);
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return { handleStartTest, handleContinueTest };
};

export default useStartTest;
