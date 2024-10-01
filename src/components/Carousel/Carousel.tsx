"use client";

import { useState, useRef, useEffect } from "react";
import { useResultStore } from "@/lib/stores";
import Image from "next/image";
import s from "./Carousel.module.css";

// Carousel 컴포넌트의 props 타입 정의
type CarouselProps = {
  items: React.ReactNode[];
  itemsToShow: 1 | 3;
  onItemChange?: (index: number) => void;
  onItemClick?: (index: number) => void;
  useGlobalState?: boolean;
};

export default function Carousel({
  items,
  itemsToShow: initialItemsToShow,
  onItemChange,
  onItemClick,
  useGlobalState = false,
}: CarouselProps) {
  const { currentCarouselIndex, setCurrentCarouselIndex } = useResultStore();
  const [localCurrentIndex, setLocalCurrentIndex] = useState(0);
  const [actualItemsToShow, setActualItemsToShow] =
    useState(initialItemsToShow);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentIndex = useGlobalState
    ? currentCarouselIndex
    : localCurrentIndex;

  useEffect(() => {
    const handleResize = () => {
      setActualItemsToShow(window.innerWidth <= 900 ? 1 : initialItemsToShow);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initialItemsToShow]);

  useEffect(() => {
    if (onItemChange) {
      onItemChange(currentIndex);
    }
  }, [currentIndex, onItemChange]);

  const updateIndex = (newIndex: number) => {
    if (useGlobalState) {
      setCurrentCarouselIndex(newIndex);
    } else {
      setLocalCurrentIndex(newIndex);
    }
  };

  const calculateNextIndex = (currentIndex: number) => {
    const nextIndex = currentIndex + actualItemsToShow;
    return nextIndex >= items.length ? 0 : nextIndex;
  };

  const calculatePrevIndex = (currentIndex: number) => {
    const prevIndex = currentIndex - actualItemsToShow;
    return prevIndex < 0
      ? Math.floor((items.length - 1) / actualItemsToShow) * actualItemsToShow
      : prevIndex;
  };

  const nextSlide = () => {
    const nextIndex = calculateNextIndex(currentIndex);
    updateIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = calculatePrevIndex(currentIndex);
    updateIndex(prevIndex);
  };

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

      <div
        className={s.carousel}
        ref={carouselRef}
        style={{
          transform: `translateX(-${
            (currentIndex * 100) / actualItemsToShow
          }%)`,
        }}
      >
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
