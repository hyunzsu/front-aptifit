// QuizOption.tsx

/*
 * QuizOption 컴포넌트
 *
 * 이 컴포넌트는 퀴즈의 각 질문에 대한 선택지를 렌더링합니다.
 * 7점 척도의 라디오 버튼을 시각적으로 표현하며, 사용자의 선택을 처리합니다.
 *
 * 주요 기능:
 * 1. 7개의 선택지를 동적으로 생성
 * 2. 선택된 옵션을 시각적으로 표시
 * 3. 접근성을 고려한 숨겨진 라벨 텍스트
 *
 * 작업자: 김도현
 */

"use client";

import React from "react";
import { useQuizLogic } from "@/lib/hooks";
import a from "@/app/styles/modules/a11y.module.css";
import s from "./QuizOption.module.css";

// 선택지 옵션 정의
const options = [
  { value: 1, label: "전혀 그렇지 않다" },
  { value: 2, label: "그렇지 않다" },
  { value: 3, label: "약간 그렇지 않다" },
  { value: 4, label: "보통이다" },
  { value: 5, label: "약간 그렇다" },
  { value: 6, label: "그렇다" },
  { value: 7, label: "매우 그렇다" },
];

// 모바일과 데스크톱 환경의 선택지 크기 정의
const mobileSizes = [32, 28, 24, 20, 24, 28, 32];
const desktopSizes = [60, 50, 40, 30, 40, 50, 60];

// 컴포넌트 props 타입 정의
interface QuizOptionProps {
  questionId: number;
  responses: number[];
  setResponses: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function QuizOption({
  questionId,
  responses,
  setResponses,
}: QuizOptionProps) {
  // useQuizLogic 훅을 사용하여 입력 변경 핸들러 가져오기
  const { handleInputChange } = useQuizLogic(
    questionId,
    responses,
    setResponses
  );

  return (
    <div className={s.quizOptionContainer}>
      <div className={s.optionContainer}>
        {/* 각 선택지에 대한 라디오 버튼 렌더링 */}
        {options.map((option, index) => (
          <div key={option.value} className={s.optionWrapper}>
            <label className={s.optionLabel}>
              <input
                type="radio"
                name={`quizOption_${questionId}`}
                value={option.value}
                checked={responses[questionId] === option.value}
                onChange={handleInputChange}
                className={s.hiddenRadio}
              />
              {/* 커스텀 라디오 버튼 스타일 */}
              <span
                className={s.customRadio}
                style={
                  {
                    "--mobile-size": `${mobileSizes[index]}px`,
                    "--desktop-size": `${desktopSizes[index]}px`,
                  } as React.CSSProperties
                }
              >
                {/* 선택된 경우 체크마크 표시 */}
                {responses[questionId] === option.value && (
                  <span className={s.checkmark}>✓</span>
                )}
              </span>
              {/* 접근성을 위한 숨겨진 라벨 텍스트 */}
              <span className={a.a11y}>{option.label}</span>
            </label>
          </div>
        ))}
      </div>
      {/* 첫 번째와 마지막 선택지 라벨 표시 */}
      <div className={s.textContainer}>
        <span className={s.visibleText}>{options[0].label}</span>
        <span className={s.visibleText}>
          {options[options.length - 1].label}
        </span>
      </div>
    </div>
  );
}
