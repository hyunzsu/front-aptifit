"use client";

import { useAuthStore } from "@/lib/stores";
import { useRouter } from "next/navigation";
import s from "./ResultPage.module.css";

export default function ResultPage() {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  if (!isLoggedIn) {
    router.push("/");
    return null;
  }

  return <main className={s.ResultPage}>결과 페이지</main>;
}
