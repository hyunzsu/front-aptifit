// QuizItem.tsx

/*
 * QuizItem 컴포넌트
 *
 * 이 컴포넌트는 개별 퀴즈 항목을 렌더링합니다.
 * QuizTitle과 QuizOption 컴포넌트를 조합하여 완전한 퀴즈 항목을 구성합니다.
 *
 * 주요 기능:
 * 1. 퀴즈 제목(QuizTitle) 표시
 * 2. 퀴즈 선택지(QuizOption) 표시
 * 3. 사용자 응답 관리
 * 4. 문제 비활성화 상태 관리
 *
 * 작업자: 김도현
 */

import React from "react";
import QuizTitle from "../QuizTitle/QuizTitle";
import QuizOption from "../QuizOption/QuizOption";
import s from "./QuizItem.module.css";

// QuizItem 컴포넌트의 props 타입 정의
interface QuizItemProps {
  questionId: number;
  question: string;
  responses: number[];
  setResponses: React.Dispatch<React.SetStateAction<number[]>>;
  disabled: boolean;
}

export default function QuizItem({
  questionId,
  question,
  responses,
  setResponses,
  disabled,
}: QuizItemProps) {
  return (
    <div className={`${s.QuizItem} ${disabled ? s.disabled : ""}`}>
      {/* 퀴즈 제목 컴포넌트 */}
      <QuizTitle questionId={questionId} question={question} />

      {/* 퀴즈 선택지 컴포넌트 */}
      <QuizOption
        questionId={questionId}
        responses={responses}
        setResponses={setResponses}
      />
    </div>
  );
}
