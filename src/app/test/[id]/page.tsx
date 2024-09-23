"use client";

import { checkUserAuth } from "@/lib/utils";
import s from "./TestDetailPage.module.css";

export default function TestDetailPage() {
  checkUserAuth();

  return <main className={s.TestDetailPage}>테스트 상세 페이지</main>;
}
