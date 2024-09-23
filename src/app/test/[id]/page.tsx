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
 * 6. 자동 스크롤 기능으로 현재 응답해야 할 문제로 이동
 * 7. 아직 응답할 수 없는 문제 비활성화
 *
 * 작업자: 김도현
 */

"use client";

import { useEffect, useRef } from "react";
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

  // 각 QuizItem에 대한 ref 생성
  const quizRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 페이지 로드 시 첫 번째 문제로 스크롤
  useEffect(() => {
    if (quizRefs.current[1]) {
      quizRefs.current[1].scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // 응답이 변경될 때마다 다음 미응답 문제로 스크롤
  useEffect(() => {
    const nextUnansweredIndex = responses.findIndex(
      (response) => response === 0
    );
    if (nextUnansweredIndex !== -1 && quizRefs.current[nextUnansweredIndex]) {
      quizRefs.current[nextUnansweredIndex].scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [responses]);

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
          <div
            key={index}
            ref={(el) => {
              quizRefs.current[index] = el;
            }}
            className={`${s.quizItemWrapper} ${
              index > responses.filter((r) => r !== 0).length ? s.disabled : ""
            }`}
          >
            <QuizItem
              questionId={index}
              question={question}
              responses={responses}
              setResponses={setResponses}
              disabled={index > responses.filter((r) => r !== 0).length}
            />
          </div>
        ))}
      </div>
      <Button
        label="다음"
        type="button"
        pageType="test"
        onClick={goToNextPage}
        className={s.nextButton}
      />
    </div>
  );
}
