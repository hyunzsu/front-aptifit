"use client";

import { useOAuthCallback } from "@/app/(auth)/_hooks";

const OAuthPage = () => {
  // OAuth인증코드를 서버로 전송
  useOAuthCallback();

  return <main>OAuthPage 콜백 페이지</main>;
};

export default OAuthPage;
