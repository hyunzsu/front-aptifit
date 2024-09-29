// Carousel.tsx

/*
 * Carousel 컴포넌트
 *
 * 이 컴포넌트는 아이템들을 회전식으로 표시하는 캐러셀을 구현합니다.
 * 사용자는 좌우 화살표를 클릭하여 아이템들을 탐색할 수 있습니다.
 *
 * 주요 기능:
 * 1. 아이템 표시 (화면 크기에 따라 1개 또는 3개)
 * 2. 좌우 네비게이션
 * 3. 아이템 변경 및 클릭 이벤트 처리
 *
 * 작업자: 김도현
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import s from "./Carousel.module.css";

// Carousel 컴포넌트의 props 타입 정의
type CarouselProps = {
  items: React.ReactNode[];
  itemsToShow: 1 | 3;
  onItemChange?: (index: number) => void;
  onItemClick?: (index: number) => void;
};

export default function Carousel({
  items,
  itemsToShow: initialItemsToShow,
  onItemChange,
  onItemClick,
}: CarouselProps) {
  // 현재 표시 중인 아이템의 인덱스 상태
  const [currentIndex, setCurrentIndex] = useState(0);
  // 실제로 표시되는 아이템 수 상태
  const [actualItemsToShow, setActualItemsToShow] =
    useState(initialItemsToShow);

  // 캐러셀 컨테이너에 대한 ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // 화면 크기 변경 감지 및 actualItemsToShow 조정
  useEffect(() => {
    const handleResize = () => {
      setActualItemsToShow(window.innerWidth <= 900 ? 1 : initialItemsToShow);
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initialItemsToShow]);

  // 아이템 변경 시 콜백 함수 호출
  useEffect(() => {
    if (onItemChange) {
      onItemChange(currentIndex);
    }
  }, [currentIndex, onItemChange]);

  // 다음 슬라이드로 이동하는 함수
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  // 이전 슬라이드로 이동하는 함수
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  // 아이템 클릭 시 처리하는 함수
  const handleItemClick = (index: number) => {
    if (onItemClick) {
      onItemClick(index);
    }
  };

  // itemsToShow에 따른 버튼 이미지 경로 설정
  const leftButtonSrc =
    initialItemsToShow === 3
      ? "/icons/left_arrow_alt.svg"
      : "/icons/left_arrow.svg";
  const rightButtonSrc =
    initialItemsToShow === 3
      ? "/icons/right_arrow_alt.svg"
      : "/icons/right_arrow.svg";

  // 모바일 버튼 이미지 경로 및 크기 설정
  const mobileLeftButtonSrc =
    initialItemsToShow === 3
      ? "/icons/left_arrow_mobile_alt.svg"
      : "/icons/left_arrow_mobile.svg";
  const mobileRightButtonSrc =
    initialItemsToShow === 3
      ? "/icons/right_arrow_mobile_alt.svg"
      : "/icons/right_arrow_mobile.svg";
  const mobileArrowSize = initialItemsToShow === 3 ? 30 : 40;

  return (
    <div
      className={`${s.carouselContainer} ${
        s[`itemsToShow${actualItemsToShow}`]
      }`}
    >
      {/* 이전 버튼 */}
      <button className={`${s.arrow} ${s.left}`} onClick={prevSlide}>
        <Image
          src={leftButtonSrc}
          alt="이전"
          width={40}
          height={40}
          className={s.desktopArrow}
        />
        <Image
          src={mobileLeftButtonSrc}
          alt="이전"
          width={mobileArrowSize}
          height={mobileArrowSize}
          className={s.mobileArrow}
        />
      </button>

      {/* 캐러셀 아이템 컨테이너 */}
      <div
        className={s.carousel}
        ref={carouselRef}
        style={{
          transform: `translateX(-${
            currentIndex * (100 / actualItemsToShow)
          }%)`,
        }}
      >
        {/* 각 아이템 렌더링 */}
        {items.map((item, index) => (
          <div
            key={index}
            className={s.carouselItem}
            onClick={() => handleItemClick(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* 다음 버튼 */}
      <button className={`${s.arrow} ${s.right}`} onClick={nextSlide}>
        <Image
          src={rightButtonSrc}
          alt="다음"
          width={40}
          height={40}
          className={s.desktopArrow}
        />
        <Image
          src={mobileRightButtonSrc}
          alt="다음"
          width={mobileArrowSize}
          height={mobileArrowSize}
          className={s.mobileArrow}
        />
      </button>
    </div>
  );
}
