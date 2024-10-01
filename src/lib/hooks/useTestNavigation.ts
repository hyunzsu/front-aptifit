import { useState, useEffect } from "react";
// import { useTestQuestion } from "@/lib/hooks";

const useTestNavigation = (responses, questions) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. 다음 질문으로 넘어가기
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 2. 이전 질문으로 돌아가기
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 3. 마지막으로 푼 문제로 이동
  useEffect(() => {
    // responses 배열에서 값이 0인 (아직 풀지 않은 문제를 찾는다)
    const unsolvedQuestion = responses.findIndex((r) => r === 0);

    // 0이 없으면 (모든 문제가 풀렸으면) findIndex는 -1을 반환
    if (unsolvedQuestion === -1) {
      // currenIndex를 마지막 문제번호로 하기 위해 responses.length - 1로 업데이트
      // 초깃값이 없어 -1이기 때문에 []에 responses를 넣는다.
      // responses마다 업데이트가 일어나서 수정하기가 힘든데?
      setCurrentIndex(responses.length - 1);
      return;
    }

    setCurrentIndex(unsolvedQuestion);
  }, [responses]);

  return {
    currentIndex,
    setCurrentIndex,
    handleNextQuestion,
    handlePrevQuestion,
  };
};

export default useTestNavigation;
