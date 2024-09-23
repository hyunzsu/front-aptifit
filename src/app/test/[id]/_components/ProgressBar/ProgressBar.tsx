/*
 * ProgressBar 컴포넌트
 *
 * 이 컴포넌트는 사용자의 응답 진행 상태를 시각적으로 표시합니다.
 *
 * 주요 기능:
 * 1. responses 배열을 받아 진행 상태를 계산
 * 2. 진행 상태에 따라 프로그레스 바의 색상을 변경
 *
 * 작업자: 김도현
 */

import React from "react";
import s from "./ProgressBar.module.css";

interface ProgressBarProps {
  responses: number[];
}

export default function ProgressBar({ responses }: ProgressBarProps) {
  // 0이 아닌 응답의 개수를 계산
  const completedCount = responses.filter((response) => response !== 0).length;

  // 전체 응답 중 완료된 비율 계산
  const progressPercentage = (completedCount / responses.length) * 100;

  return (
    <div className={s.progressBarContainer}>
      <div
        className={s.progressBar}
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}
