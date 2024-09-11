"use client";

export default function KakaoLoginButton() {
  const KAKAO_CLIENT_ID = `${process.env.NEXT_PUBLIC_API_KAKAO_CLIENT_ID}`;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_API_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return <button onClick={handleKakaoLogin}>카카오 로그인</button>;
}
