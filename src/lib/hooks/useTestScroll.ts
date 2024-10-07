import { useState } from "react";

const useTestScroll = (handleNextQuestion, handlePrevQuestion) => {
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const [startY, setStartY] = useState(0);

  // 1. 스크롤 이동 및 이동 방지
  const handleScroll = (e) => {
    // 연속 스크롤 방지
    if (scrollTimeout) return;

    // 휠을 위로 스크롤 -> 이전 질문
    // if (e.deltaY < 0) {
    //   // 함수 참조의 문제로 인자로 직접 전달 받음!
    //   handlePrevQuestion();
    // }

    if (e.deltaY > 0) {
      // 휠을 아래로 스크롤 -> 다음 질문
      handleNextQuestion();
    } else if (e.deltaY < 0) {
      // 휠을 위로 스크롤 -> 이전 질문
      handlePrevQuestion();
    }

    /*  
      휠로 위, 아래 스크롤 허용  
    
      if (e.deltaY > 0) {
        // 휠을 아래로 스크롤 -> 다음 질문
        handleNextQuestion();
      } else if (e.deltaY < 0) {
        // 휠을 위로 스크롤 -> 이전 질문
        handlePrevQuestion();
      } 
    */

    // 짧은 시간 동안 연속 스크롤을 막기 위한 타이머 설정
    const timeout = setTimeout(() => {
      setScrollTimeout(null);
    }, 800); // 0.8초 동안 연속 스크롤 방지
    setScrollTimeout(timeout);
  };

  // 터치 시작 시 Y축 위치 저장
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  // 터치 이동 중 스크롤 감지
  const handleTouchMove = (e) => {
    if (scrollTimeout) return;

    const currentY = e.touches[0].clientY;
    const deltaY = startY - currentY;

    if (deltaY > 0) {
      // 터치를 아래로 스크롤 -> 다음 질문
      handleNextQuestion();
    } else if (deltaY < 0) {
      // 터치를 위로 스크롤 -> 이전 질문
      handlePrevQuestion();
    }

    // 짧은 시간 동안 연속 스크롤을 막기 위한 타이머 설정
    const timeout = setTimeout(() => {
      setScrollTimeout(null);
    }, 800);
    setScrollTimeout(timeout);
  };

  return {
    scrollTimeout,
    setScrollTimeout,
    handleScroll,
    handleTouchStart,
    handleTouchMove,
  };
};

export default useTestScroll;
