"use client";
import React from "react";
import styles from "./Button.module.css";

/**
 * Button 컴포넌트
 *
 * 속성:
 * - label: 버튼에 표시될 텍스트 (필수)
 * - type: 버튼의 타입 ("button", "submit", "reset" 중 하나) (필수)
 * - className: 추가적인 CSS 클래스 (선택적)
 * - onClick: 버튼 클릭 시 실행될 함수 (선택적)
 * - disabled: 버튼 비활성화 여부 (선택적, 기본값: false)
 * - pageType: 페이지 타입 ("main", "test", "member" 중 하나) (선택적)
 *
 * 스타일 커스터마이징:
 * - Button.module.css 파일을 수정하여 기본 스타일을 변경할 수 있습니다.
 * - className 속성을 통해 추가적인 스타일을 적용할 수 있습니다.
 * - pageType 속성을 설정하여 페이지별 스타일을 적용할 수 있습니다.
 */

type TButton = {
  label: string;
  type: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  pageType?: "main" | "test" | "member";
};

export default function Button({
  label,
  type,
  className,
  onClick,
  disabled,
  pageType,
}: TButton) {
  const pageClass = pageType ? styles[pageType] : "";

  return (
    <button
      type={type}
      className={`${styles.button} ${pageClass} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
