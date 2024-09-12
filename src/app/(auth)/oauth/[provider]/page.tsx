"use client";

import { useOAuthCallback } from "./_hooks";

const OAuthPage = () => {
  const data = useOAuthCallback();

  console.log(data);

  return <main>OAuthPage 콜백 페이지</main>;
};

export default OAuthPage;
