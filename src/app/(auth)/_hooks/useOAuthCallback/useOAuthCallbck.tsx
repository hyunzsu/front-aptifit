"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOAuthCodeFromURL } from "../../_utils";
import { useAuthStore } from "@/lib/stores";

const useOAuthCallbck = () => {
  const { provider } = useParams();
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    // OAuth 인증코드를 서버로 전송하는 기능
    const sendOAuthCodeToServer = async (oAuthCode: string) => {
      const CALLBACK_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${provider}/callback`;

      try {
        const res = await fetch(`${CALLBACK_URL}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            code: oAuthCode,
          }).toString(),
        });

        const result = await res.json();

        if (res.ok) {
          // 응답 데이터
          login(result);

          if (result.IsAdditionalUserInfo) {
            alert("로그인 성공!");
            router.push("/");
          } else {
            alert("아직 입력하지 않은 정보가 있습니다!");
            router.push("/add-user-info");
          }
        } else {
          // 에러가 있을 때 에러 메시지에 접근
          console.error("에러 발생:", result.error);
          alert(result.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // 1. URL에서 OAuth인증 코드 추출
    const oAuthCode = getOAuthCodeFromURL();

    // 2. 인증 코드가 있는 경우 서버로 전송
    if (oAuthCode) {
      sendOAuthCodeToServer(oAuthCode);
    }
  }, []);
};

export default useOAuthCallbck;
