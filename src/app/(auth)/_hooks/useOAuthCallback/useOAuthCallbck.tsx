"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOAuthCodeFromURL } from "../../_utils";

const useOAuthCallbck = () => {
  const { provider } = useParams();
  // const router = useRouter();

  useEffect(() => {
    // OAuth 인증코드를 서버로 전송하는 기능
    const sendOAuthCodeToServer = async (oAuthCode: string) => {
      const CALLBACK_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${provider}/callback`;

      try {
        const res = await fetch(`${CALLBACK_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            code: oAuthCode,
          }).toString(),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Success:", data);

        if (data) {
          console.log("Success:", data);
          // router.push("/oauth/complete");
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
