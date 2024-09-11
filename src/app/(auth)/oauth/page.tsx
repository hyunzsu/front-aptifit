"use client";

import { useEffect } from "react";

const OAuthPage = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
  }, []);

  return <main>OAuthPage 콜백 페이지</main>;
};

export default OAuthPage;
