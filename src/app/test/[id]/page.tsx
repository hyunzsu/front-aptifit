"use client";

import { useParams } from "next/navigation";
import {
  useTest,
  useTestNavigation,
  useTestQuestion,
  useTestScroll,
} from "@/lib/hooks";
import { LayoutContainer, Loading } from "@/components";
import {
  Title,
  Percentage,
  Progressbar,
  TestItem,
  TestOption,
} from "./_components";
import s from "./TestPage.module.css";

function TestPage() {
  const { id } = useParams();
  const { loading, handleContinueTest, handleCompleteTest } = useTest();
  const { responses, setResponses, questions } = useTestQuestion();
  const { currentIndex, handleNextQuestion, handlePrevQuestion } =
    useTestNavigation(responses, questions);
  const { handleScroll } = useTestScroll(
    handleNextQuestion,
    handlePrevQuestion
  );

  const submitResponses = () => {
    // 문제를 덜 풀었다면 넘어가기 X
    if (responses.includes(0)) {
      alert("아직 풀지 않은 문제가 있습니다!");
      return;
    }

    // 테스트 마지막 페이지라면 결과지 호출
    if (id === "9") {
      handleCompleteTest();
      return;
    }

    // 테스트 다음 페이지로 이동
    handleContinueTest();
  };

  if (loading) {
    if (id === "9") {
      return <Loading text="결과 로딩 중..." />;
    }

    return <Loading text="테스트 로딩 중..." />;
  }

  return (
    <main className={s.TestPage}>
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

export default TestPage;
