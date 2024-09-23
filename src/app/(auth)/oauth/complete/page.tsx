"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveToSessionStorage } from "@/lib/utils";

export default function OAuthComplete() {
  const router = useRouter();

  const accessToken = new URL(window.location.href).searchParams.get(
    "access_token"
  );

  useEffect(() => {
    // 1. URL담긴 accessToken을 로컬스토리지에 저장
    saveToSessionStorage("access_token", JSON.stringify(accessToken));

    // 2. accessToken을 로컬스토리지에 저장한 후 메인페이지로 이동
    router.push("/");
  }, []);

  return <main>OAuthComplete</main>;
}
