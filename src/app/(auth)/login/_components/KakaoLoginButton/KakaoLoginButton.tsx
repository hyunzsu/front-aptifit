"use client";

import Image from "next/image";
import s from "./KakaoLoginButton.module.css";

export default function KakaoLoginButton() {
  const KAKAO_CLIENT_ID = `${process.env.NEXT_PUBLIC_API_KAKAO_CLIENT_ID}`;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_API_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}/kakao&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button className={s.KakaoLoginButton} onClick={handleKakaoLogin}>
      <Image
        src="/icons/kakao_logo.svg"
        alt="카카오 로그인"
        width={26.32}
        height={24}
      />
    </button>
  );
}
