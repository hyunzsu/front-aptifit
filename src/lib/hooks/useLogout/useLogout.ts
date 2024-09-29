"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";

/* 
useLogout

fetch 통신 이후 useAuthStore에 유저 데이터와 액세스 토큰을 각각 제거해
로그아웃 상태를 만들고 추가 회원정보의 유무를 파악해 페이지 이동을 수행한다.
*/

const useLogout = () => {
  const { removeAccessToken, removeUser } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const fetchResult = await response.json();

      if (!response.ok) {
        console.error("에러 발생:", fetchResult.error);
        alert(fetchResult.error);
        return;
      }

      removeUser();
      removeAccessToken();
      alert("로그아웃이 됐습니다!");
      router.push("/");
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return { handleLogout };
};

export default useLogout;
