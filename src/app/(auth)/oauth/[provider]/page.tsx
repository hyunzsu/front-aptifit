"use client";

import { useEffect } from "react";
import { Loading } from "@/components";
import { useOAuth } from "@/lib/hooks";

const OAuthPage = () => {
  const { loading, handleOAuthLogin } = useOAuth();

  useEffect(() => {
    handleOAuthLogin();
  }, []);

  if (loading) {
    return <Loading text="로그인 중..." />;
  }

  return <main>OAuthPage 콜백 페이지</main>;
};

export default OAuthPage;
