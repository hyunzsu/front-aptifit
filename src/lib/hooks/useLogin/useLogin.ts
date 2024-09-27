"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";

/* 
useLogin

fetch 통신 이후 useAuthStore에 유저 데이터와 액세스 토큰을 각각 저장해
로그인 상태를 만들고 추가 회원정보의 유무를 파악해 페이지 이동을 수행한다.
*/

const useLogin = () => {
  const { user, setUser, setAccessToken } = useAuthStore();
  const router = useRouter();

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: password,
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

      if (!user.IsAdditionalUserInfo) {
        router.push("/add-user-info");
      } else {
        alert("로그인이 됐습니다!");
        router.push("/");
      }
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return { handleLogin };
};

export default useLogin;
