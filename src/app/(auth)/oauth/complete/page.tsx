"use client";

import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";

export default function OAuthComplete() {
  const { login } = useAuthStore(); // 상태 값도 가져옴
  // const router = useRouter();

  useEffect(() => {
    const accessTokenURL =
      new URL(window.location.href).searchParams.get("access_token") || "";
    const user_name =
      new URL(window.location.href).searchParams.get("user_name") || "";
    const email = new URL(window.location.href).searchParams.get("email") || "";

    login(accessTokenURL, { user_name: user_name, email: email });

    // router.push("/");
    alert("로그인 성공!");
    window.location.href = "http://localhost:3000";
  }, []);

  return <main>OAuthComplete</main>;
}
