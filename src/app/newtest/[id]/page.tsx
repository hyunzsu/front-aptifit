"use client";

import {
  useTest,
  useTestNavigation,
  useTestQuestion,
  useTestScroll,
} from "@/lib/hooks";
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
  const { handleContinueTest } = useTest();
  const { responses, setResponses, questions } = useTestQuestion();
  const { currentIndex, handleNextQuestion, handlePrevQuestion } =
    useTestNavigation(responses, questions);
  const { handleScroll } = useTestScroll(
    handleNextQuestion,
    handlePrevQuestion
  );

  const submitResponses = () => {
    if (responses.includes(0)) {
      alert("아직 풀지 않은 문제가 있습니다!");
      return;
    }
    handleContinueTest();
  };

  return (
    <main className={s.NewTestPage}>
      <LayoutContainer>
        {/* 01. 제목 */}
        <header className={s.TestHeaderSection}>
          <div className={s.TitleContainer}>
            <Title />
            <Percentage responses={responses} />
          </div>
          <Progressbar responses={responses} />
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
                <TestItem questionId={index} question={question} />
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
