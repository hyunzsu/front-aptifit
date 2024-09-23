// test/[id]/page.tsx

/*
 * Test 컴포넌트
 *
 * 이 컴포넌트는 전체 테스트 페이지를 렌더링합니다.
 * 테스트 제목, 퀴즈 항목들, 그리고 다음 페이지로 이동하는 버튼을 포함합니다.
 *
 * 주요 기능:
 * 1. URL 파라미터에서 테스트 ID 추출
 * 2. 테스트 로직 훅(useTestLogic)을 사용하여 상태 및 함수 관리
 * 3. 테스트 제목(TestTitle) 표시
 * 4. 여러 개의 퀴즈 항목(QuizItem) 렌더링
 * 5. 다음 페이지로 이동하는 버튼 제공
 *
 * 작업자: 김도현
 */

"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import s from "./test.module.css";
import TestTitle from "./_components/TestTitle/TestTitle";
import ProgressBar from "./_components/ProgressBar/ProgressBar";
import QuizItem from "./_components/QuizItem/QuizItem";
import Button from "@/components/Button/Button";
import { useTestLogic } from "@/lib/hooks";

export default function Test() {
  // URL 파라미터에서 id 추출
  const { id } = useParams<{ id: string }>();

  // 테스트 로직 훅 사용
  const { questions, responses, loading, setResponses, goToNextPage } =
    useTestLogic();

  useEffect(() => {
    // 페이지 로드 시 데이터 초기화
    // 필요한 초기화 로직을 여기에 추가할 수 있습니다.
  }, [id]);

  // 로딩 중일 때 표시할 내용
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.test}>
      <div className={s.fixedHeader}>
        <TestTitle />
        <ProgressBar responses={responses} />
      </div>
      <div className={s.testSection}>
        {questions.map((question, index) => (
          <QuizItem
            key={index}
            questionId={index}
            question={question}
            responses={responses}
            setResponses={setResponses}
          />
        ))}
      </div>
      <Button
        label="다음"
        type="button"
        pageType="test"
        onClick={goToNextPage}
      />
    </div>
  );
}
