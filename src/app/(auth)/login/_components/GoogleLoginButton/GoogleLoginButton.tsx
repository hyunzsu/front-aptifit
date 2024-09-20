"use client";

import Image from "next/image";
import s from "./GoogleLoginButton.module.css";

export default function GoogleLoginButton() {
  const GOOGLE_CLIENT_ID = `${process.env.NEXT_PUBLIC_API_GOOGLE_CLIENT_ID}`;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_API_REDIRECT_URI}`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}/google&response_type=code&scope=email+profile&access_type=offline&prompt=consent`;

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <button className={s.GoogleLoginButton} onClick={handleGoogleLogin}>
      <Image
        src="/icons/google_logo.svg"
        alt="구글 로그인"
        width={24}
        height={24.49}
      />
    </button>
  );
}
