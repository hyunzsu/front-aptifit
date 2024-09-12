"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getOAuthCodeFromURL } from "../../_utils";

const useOAuthCallbck = () => {
  const { provider } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // OAuth 인증코드를 서버로 전송하는 기능
    const sendOAuthCodeToServer = async (oAuthCode: string) => {
      const CALLBACK_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${provider}/callback`;

      try {
        const res = await fetch(`${CALLBACK_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(oAuthCode),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setData(data);
        console.log("Success:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // URL에서 인증 코드 추출
    const code = getOAuthCodeFromURL();

    //인증 코드가 있는 경우 서버로 전송
    if (code) {
      console.log(code);
      sendOAuthCodeToServer(code);
    }
  }, []);

  return data;
};

export default useOAuthCallbck;
