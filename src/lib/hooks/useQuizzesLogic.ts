// useQuizzesLogic.ts

/*
 * useQuizzesLogic 커스텀 훅
 *
 * 이 훅은 Quizzes 컴포넌트의 비즈니스 로직을 관리합니다.
 * 현재 활성화된 퀴즈를 추적하고, 사용자 응답에 따라 활성 퀴즈를 업데이트합니다.
 *
 * 주요 기능:
 * 1. 활성 퀴즈 상태 관리
 * 2. 응답 변경에 따른 활성 퀴즈 자동 업데이트
 *
 * 작업자: 김도현
 */

import { useState, useEffect } from "react";

export default function useQuizzesLogic(responses: number[]) {
  // 현재 활성화된 퀴즈의 인덱스를 관리하는 상태
  const [isActive, setIsActive] = useState(0);

  // 응답 변경에 따른 활성 퀴즈 업데이트
  useEffect(() => {
    if (responses.length !== 0) {
      // 응답하지 않은 첫 번째 퀴즈를 찾아 활성화
      const firstUnansweredIndex = responses.indexOf(0);
      setIsActive(
        firstUnansweredIndex !== -1
          ? firstUnansweredIndex
          : responses.length - 1
      );
    }
  }, [responses]);

  return { isActive, setIsActive };
}
