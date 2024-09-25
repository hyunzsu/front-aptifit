"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores";
import { useRouter } from "next/navigation";
import s from "./ResultPage.module.css";

export default function ResultPage() {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // 상태 확인 중을 나타내는 로딩 상태

  useEffect(() => {
    // 상태가 변경될 때까지 기다리기
    if (isLoggedIn === undefined) {
      setLoading(true); // 아직 로그인 상태 확인 중
    } else if (!isLoggedIn) {
      router.push("/login"); // 로그인이 안 되어 있으면 리다이렉트
    } else {
      setLoading(false); // 로그인 상태가 확인되면 로딩 완료
    }
  }, [isLoggedIn, router]);

  // 로그인 상태 확인 중에는 아무것도 렌더링하지 않음
  if (loading) {
    return <div>Loading...</div>; // 로딩 스피너 추가 가능
  }
  return <main className={s.ResultPage}>결과 페이지</main>;
}
