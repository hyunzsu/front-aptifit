"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOAuthCodeFromURL } from "../../_utils";

const useOAuthCallbck = () => {
  const { provider } = useParams();
  const router = useRouter();

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
          router.push(result.redirect_url); // redirect_url이 있을 경우 해당 url로 이동시킨다
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
