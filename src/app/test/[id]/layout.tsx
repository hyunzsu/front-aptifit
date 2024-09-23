/*
 * test/[id] 레이아웃 컴포넌트
 *
 * 이 컴포넌트는 test/[id] 경로의 페이지들에 대한 레이아웃을 정의합니다.
 *
 * 주요 기능:
 * 1. 일반 화면에서는 좌우 406픽셀 여백 제공
 * 2. 모바일 화면(최대 너비 425px)에서는 컨텐츠를 320px 내에 배치
 *
 * 작업자: 김도현
 */

import React from "react";
import styles from "./layout.module.css";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.container}>{children}</div>;
}
