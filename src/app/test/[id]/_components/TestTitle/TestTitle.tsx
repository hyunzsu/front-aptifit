// TestTitle.tsx

/*
 * TestTitle 컴포넌트
 *
 * 이 컴포넌트는 각 퀴즈 문항의 제목과 카테고리를 표시합니다.
 * URL 파라미터로 전달된 ID에 따라 해당하는 퀴즈 데이터를 표시합니다.
 *
 * 주요 기능:
 * 1. URL 파라미터에서 퀴즈 ID 추출
 * 2. ID에 해당하는 퀴즈 데이터 로드
 * 3. 퀴즈 카테고리와 질문 표시
 *
 * 작업자: 김도현
 */

"use client";

import { useParams } from "next/navigation";
import s from "./TestTitle.module.css";

// 퀴즈 데이터 타입 정의
type QuizData = {
  category: string;
  alt: string;
  question: string;
};

// 퀴즈 데이터 객체
// 각 키는 퀴즈 ID를 나타내며, 값은 해당 퀴즈의 정보를 담고 있습니다.
const quizData: Record<string, QuizData> = {
  "1": {
    category: "흥미",
    alt: "흥미",
    question: "흥미에서는 당신이 흥미를 가지는 부분을 파악합니다.",
  },
  "2": {
    category: "흥미",
    alt: "흥미",
    question: "2번째 흥미에서는 당신이 흥미를 가지는 부분을 파악합니다.",
  },
  "3": {
    category: "역량",
    alt: "역량",
    question: "역량에 대한 첫 번째 질문입니다.",
  },
  "4": {
    category: "가치",
    alt: "가치",
    question: "가치관에 대한 질문입니다.",
  },
  "5": {
    category: "개인특성",
    alt: "개인특성",
    question: "개인의 특성에 대한 첫 번째 질문입니다.",
  },
  "6": {
    category: "지식",
    alt: "지식",
    question: "지식 수준을 평가하는 질문입니다.",
  },
  "7": {
    category: "역량",
    alt: "역량",
    question: "역량에 대한 두 번째 질문입니다.",
  },
  "8": {
    category: "개인특성",
    alt: "개인특성",
    question: "개인의 특성에 대한 두 번째 질문입니다.",
  },
  "9": {
    category: "가치",
    alt: "가치",
    question: "가치관에 대한 두 번째 질문입니다.",
  },
};

export default function TestTitle() {
  // URL 파라미터에서 id 추출
  const { id } = useParams<{ id: string }>();

  // id에 해당하는 퀴즈 데이터 로드
  const data = quizData[id || ""];

  // 해당하는 데이터가 없으면 null 반환
  if (!data) {
    return null;
  }

  return (
    <header className={s.TestTitle}>
      <div className={s.titleContainer}>
        {/* 퀴즈 카테고리 표시 */}
        <h3 className={s.category}>{data.category}</h3>
      </div>
      {/* 퀴즈 질문 표시 */}
      <h2 className={s.title}>{data.question}</h2>
    </header>
  );
}
