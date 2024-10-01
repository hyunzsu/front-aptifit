"use client";

import { useTestNavigation, useTestQuestion, useTestScroll } from "@/lib/hooks";
import { LayoutContainer } from "@/components";
import {
  Title,
  Percentage,
  Progressbar,
  TestItem,
  TestOption,
} from "./_components";
import s from "./NewTestPage.module.css";

function NewTestPage() {
  // sessionStorage.setItem(
  //   "aptifit1",
  //   JSON.stringify({
  //     page: 1,
  //     responses: [0, 0, 0],
  //     questions: ["1번 질문", "2번 질문", "3번 질문"],
  //   })
  // );

  const { responses, setResponses, questions } = useTestQuestion();
  const { currentIndex, handleNextQuestion, handlePrevQuestion } =
    useTestNavigation(responses, questions);
  const { handleScroll } = useTestScroll(
    handleNextQuestion,
    handlePrevQuestion
  );

  const submitResponses = () => {
    console.log(responses);
  };

  return (
    <main className={s.NewTestPage}>
      <LayoutContainer>
        {/* 01. 제목 */}
        <header className={s.TestHeaderSection}>
          <div className={s.TitleContainer}>
            <Title />
            <Percentage />
          </div>
          <Progressbar />
        </header>
        {/* 02. 문제 */}
        <div
          className={`${s.TestBodySection}`}
          style={{
            transform: `translateY(-${currentIndex * 100}dvh)`,
          }} /* 100dvh씩 증가 */
          onWheel={handleScroll}
        >
          {questions.map((question, index) => {
            return (
              <div
                key={index}
                className={`${s.TestQuestion} ${
                  currentIndex === index ? s.fadein : s.fadeout // 현재 문제만 애니메이션
                }`}
              >
                <TestItem question={question} />
                <TestOption
                  questionId={index}
                  responses={responses}
                  setResponses={setResponses}
                  onNext={handleNextQuestion}
                />
              </div>
            );
          })}
        </div>
        {/* 03. 제출버튼 */}
        {currentIndex === responses.length - 1 && (
          <button className={s.submitButton} onClick={submitResponses}>
            다음
          </button>
        )}
      </LayoutContainer>
    </main>
  );
}

export default NewTestPage;
