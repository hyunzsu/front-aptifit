"use client";

import { useEffect } from "react";
import { useOAuth } from "@/lib/hooks";

const OAuthPage = () => {
  const { loading, handleOAuthLogin } = useOAuth();

  useEffect(() => {
    handleOAuthLogin();
  }, []);

  if (loading) {
    return null;
  }

  return <main>OAuthPage 콜백 페이지</main>;
};

export default OAuthPage;
