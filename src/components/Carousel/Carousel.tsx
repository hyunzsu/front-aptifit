// Carousel.tsx

/*
 * Carousel 컴포넌트
 *
 * 이 컴포넌트는 아이템들을 회전식으로 표시하는 캐러셀을 구현합니다.
 * 사용자는 좌우 화살표를 클릭하여 아이템들을 탐색할 수 있습니다.
 *
 * 주요 기능:
 * 1. 아이템 표시 (1개 또는 3개)
 * 2. 좌우 네비게이션
 * 3. 아이템 변경 및 클릭 이벤트 처리
 *
 * 작업자: 김도현
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./Carousel.module.css";

// Carousel 컴포넌트의 props 타입 정의
type CarouselProps = {
  items: React.ReactNode[];
  itemsToShow: 1 | 3;
  onItemChange?: (index: number) => void;
  onItemClick?: (index: number) => void;
};

export default function Carousel({
  items,
  itemsToShow,
  onItemChange,
  onItemClick,
}: CarouselProps) {
  // 현재 표시 중인 아이템의 인덱스 상태
  const [currentIndex, setCurrentIndex] = useState(0);

  // 캐러셀 컨테이너에 대한 ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // 아이템 변경 시 콜백 함수 호출
  useEffect(() => {
    if (onItemChange) {
      onItemChange(currentIndex);
    }
  }, [currentIndex, onItemChange]);

  // 다음 슬라이드로 이동하는 함수
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsToShow >= items.length ? 0 : prevIndex + 1
    );
  };

  // 이전 슬라이드로 이동하는 함수
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - itemsToShow : prevIndex - 1
    );
  };

  // 아이템 클릭 시 처리하는 함수
  const handleItemClick = (index: number) => {
    if (onItemClick) {
      onItemClick(index);
    }
  };

  return (
    <div className={styles.carouselContainer}>
      {/* 이전 버튼 */}
      <button className={`${styles.arrow} ${styles.left}`} onClick={prevSlide}>
        <Image src="/icons/left_arrow.svg" alt="이전" width={40} height={40} />
      </button>

      {/* 캐러셀 아이템 컨테이너 */}
      <div
        className={styles.carousel}
        ref={carouselRef}
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
        }}
      >
        {/* 각 아이템 렌더링 */}
        {items.map((item, index) => (
          <div
            key={index}
            className={styles.carouselItem}
            style={{ flex: `0 0 ${100 / itemsToShow}%` }}
            onClick={() => handleItemClick(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* 다음 버튼 */}
      <button className={`${styles.arrow} ${styles.right}`} onClick={nextSlide}>
        <Image src="/icons/right_arrow.svg" alt="다음" width={40} height={40} />
      </button>
    </div>
  );
}
