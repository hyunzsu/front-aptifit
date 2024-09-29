"use client";

import { useEffect } from "react";
import { useOAuth } from "@/lib/hooks";

const OAuthPage = () => {
  const { sendOAuthCodeToServer } = useOAuth();

  useEffect(() => {
    sendOAuthCodeToServer();
  }, []);

  return <main>OAuthPage 콜백 페이지</main>;
};

export default OAuthPage;
