"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";

/* 
useOAuth

fetch 통신 이후 useAuthStore에 유저 데이터와 액세스 토큰을 각각 저장해
로그인 상태를 만들고 추가 회원정보의 유무를 파악해 페이지 이동을 수행한다.
*/

const useOAuth = () => {
  const { provider } = useParams();
  const router = useRouter();
  const { setUser, setAccessToken } = useAuthStore();

  const oAuthCode =
    new URL(window.location.href).searchParams.get("code") || "";

  const sendOAuthCodeToServer = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${provider}/callback`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            code: oAuthCode,
          }).toString(),
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

      if (!rest.IsAdditionalUserInfo) {
        router.push("/add-user-info");
        alert("추가정보 입력이 필요합니다!");
      } else {
        alert("로그인이 됐습니다!");
        router.push("/");
      }
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return { sendOAuthCodeToServer };
};

export default useOAuth;
