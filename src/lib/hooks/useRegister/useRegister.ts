"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";

/* 
useRegister

fetch 통신 이후 useAuthStore에 유저 데이터와 액세스 토큰을 각각 저장해
로그인 상태를 만들고 추가 회원정보 페이지 이동을 수행한다.
*/

const useRegister = () => {
  const { setUser, setAccessToken } = useAuthStore();
  const router = useRouter();

  const handleRegister = async ({ name, phone, password, email }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            phone,
            email,
            password,
          }),
        }
      );

      const fetchResult = await response.json();
      const { access_token, ...rest } = fetchResult;

      if (!response.ok) {
        console.error("에러 발생:", fetchResult.error);
        alert(fetchResult.error);
        return;
      }

      setUser(rest);
      setAccessToken(access_token);
      router.push("/add-user-info");
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return { handleRegister };
};

export default useRegister;
