"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import s from "./Carousel.module.css";

// Carousel 컴포넌트의 props 타입 정의
type CarouselProps = {
  items: React.ReactNode[]; // 캐러셀에 표시될 아이템 배열
  itemsToShow: 1 | 3; // 한 번에 보여줄 아이템 수 (1 또는 3)
  onItemChange?: (index: number) => void; // 아이템 변경 시 호출될 콜백 함수
  onItemClick?: (index: number) => void; // 아이템 클릭 시 호출될 콜백 함수
};

export default function Carousel({
  items,
  itemsToShow: initialItemsToShow,
  onItemChange,
  onItemClick,
}: CarouselProps) {
  // 현재 표시 중인 첫 번째 아이템의 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  // 실제로 화면에 표시되는 아이템 수 (반응형을 위해 사용)
  const [actualItemsToShow, setActualItemsToShow] =
    useState(initialItemsToShow);
  // 캐러셀 컨테이너에 대한 참조
  const carouselRef = useRef<HTMLDivElement>(null);

  // 화면 크기 변경을 감지하고 actualItemsToShow를 조정하는 효과
  useEffect(() => {
    const handleResize = () => {
      // 화면 너비가 900px 이하면 1개, 그 외에는 초기 설정값 사용
      setActualItemsToShow(window.innerWidth <= 900 ? 1 : initialItemsToShow);
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initialItemsToShow]);

  // 현재 인덱스가 변경될 때마다 onItemChange 콜백 호출
  useEffect(() => {
    if (onItemChange) {
      onItemChange(currentIndex);
    }
  }, [currentIndex, onItemChange]);

  // 다음 슬라이드로 이동하는 함수
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + actualItemsToShow;
      // 마지막 세트를 넘어가면 처음으로 돌아감
      return nextIndex >= items.length ? 0 : nextIndex;
    });
  };

  // 이전 슬라이드로 이동하는 함수
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - actualItemsToShow;
      // 첫 번째 세트 이전으로 가면 마지막 세트로 이동
      return nextIndex < 0
        ? Math.max(items.length - actualItemsToShow, 0)
        : nextIndex;
    });
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

  // 모바일용 버튼 이미지 경로 및 크기 설정
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
            (currentIndex * 100) / actualItemsToShow
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
