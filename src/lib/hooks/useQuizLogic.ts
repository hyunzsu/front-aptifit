// useQuizLogic.ts

/*
 * useQuizLogic 커스텀 훅
 *
 * 이 훅은 개별 Quiz 컴포넌트의 비즈니스 로직을 관리합니다.
 * 사용자의 응답을 처리하고, 세션 스토리지에 데이터를 저장합니다.
 *
 * 주요 기능:
 * 1. 세션 스토리지에서 테스트 데이터 로드
 * 2. 사용자 응답 처리 및 상태 업데이트
 * 3. 업데이트된 응답을 세션 스토리지에 저장
 *
 * 작업자: 김도현
 */

import { useCallback } from "react";
import { useParams } from "next/navigation";
import { loadTestData, saveTestData } from "@/lib/utils/testUtils";

export default function useQuizLogic(
  questionId: number,
  responses: number[],
  setResponses: React.Dispatch<React.SetStateAction<number[]>>
) {
  // 테스트 ID를 URL 파라미터에서 추출
  const params = useParams();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newResponses = [...responses];
      newResponses[questionId] = parseInt(e.target.value);

      setResponses(newResponses);

      const savedData = loadTestData(params.id as string);
      const newSavedData = {
        ...savedData,
        responses: newResponses,
      };

      saveTestData(params.id as string, newSavedData);
    },
    [questionId, responses, setResponses, params.id]
  );

  return { handleInputChange };
}
