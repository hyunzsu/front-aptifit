"use client";

import { useState } from "react";
import {
  NaverLoginButton,
  KakaoLoginButton,
  GoogleLoginButton,
} from "./_components";
import s from "./LoginPage.module.css";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogin = async () => {
    try {
      // POST 요청을 보냅니다.
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          id: userId,
          password: userPassword,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // 응답을 처리합니다. 예를 들어 JSON 응답을 받을 경우:
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className={s.LoginPage}>
      로그인 페이지
      <div>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="ID"
        />
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>로그인</button>
      </div>
      <div>
        <NaverLoginButton />
        <KakaoLoginButton />
        <GoogleLoginButton />
      </div>
    </main>
  );
}
