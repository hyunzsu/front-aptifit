import { useState } from "react";

const useTestScroll = (handleNextQuestion, handlePrevQuestion) => {
  const [scrollTimeout, setScrollTimeout] = useState(null);

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

  return { scrollTimeout, setScrollTimeout, handleScroll };
};

export default useTestScroll;
