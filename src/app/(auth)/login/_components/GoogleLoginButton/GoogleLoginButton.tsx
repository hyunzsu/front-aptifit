"use client";

export default function GoogleLoginButton() {
  const GOOGLE_CLIENT_ID = `${process.env.NEXT_PUBLIC_API_GOOGLE_CLIENT_ID}`;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_API_REDIRECT_URI}`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}/google&response_type=code&scope=email+profile&access_type=offline&prompt=consent`;

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return <button onClick={handleGoogleLogin}>구글 로그인 버튼</button>;
}
