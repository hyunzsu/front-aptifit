"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  saveAccessTokenToLocalStorage,
  getAccessTokenFromLocalStorage,
} from "../../_utils";

export default function OAuthComplete() {
  const router = useRouter();

  useEffect(() => {
    // 1. URL담긴 accessToken을 로컬스토리지에 저장
    saveAccessTokenToLocalStorage();

    // 2. accessToken을 로컬스토리지에 저장한 후 메인페이지로 이동
    if (!!getAccessTokenFromLocalStorage()) {
      console.log(!!getAccessTokenFromLocalStorage());
      router.push("/");
    }
  }, []);

  return <main>OAuthComplete</main>;
}
