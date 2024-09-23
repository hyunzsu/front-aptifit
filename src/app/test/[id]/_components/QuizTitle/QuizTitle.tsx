// QuizTitle.tsx

/*
 * QuizTitle 컴포넌트
 *
 * 이 컴포넌트는 퀴즈의 각 질문에 대한 제목을 렌더링합니다.
 * 질문 번호와 질문 내용을 표시합니다.
 *
 * 주요 기능:
 * 1. 질문 번호 표시 (1부터 시작)
 * 2. 질문 내용 표시
 *
 * 작업자: 김도현
 */

import s from "./QuizTitle.module.css";

// 컴포넌트 props 타입 정의
interface QuizTitleProps {
  questionId: number;
  question: string;
}

export default function QuizTitle({ questionId, question }: QuizTitleProps) {
  return (
    <div className={s.QuizTitle}>
      {/* 질문 번호 표시 (0부터 시작하는 인덱스를 1부터 시작하는 번호로 변환) */}
      <p className={s.QuizNumber}>Q{questionId + 1}.</p>
      {/* 질문 내용 표시 */}
      <p className={s.QuizContent}>{question}</p>
    </div>
  );
}
