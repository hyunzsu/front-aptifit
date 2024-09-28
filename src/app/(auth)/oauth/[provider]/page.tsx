"use client";

// import { useOAuthCallback } from "@/app/(auth)/_hooks";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";

const OAuthPage = () => {
  // OAuth인증코드를 서버로 전송
  // useOAuthCallback();

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

  useEffect(() => {
    sendOAuthCodeToServer();
  }, []);

  return <main>OAuthPage 콜백 페이지</main>;
};

export default OAuthPage;
