"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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

  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null); // 연속 휠 방지

  // 다음 질문으로 이동
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 이전 질문으로 이동
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 스크롤로 질문 이동 및 스크롤 방지
  const handleScroll = (e) => {
    // 연속 스크롤 방지
    if (scrollTimeout) return;

    if (e.deltaY < 0) {
      // 휠을 위로 스크롤 -> 이전 질문
      handlePrevQuestion();
    }

    // if (e.deltaY > 0) {
    //   // 휠을 아래로 스크롤 -> 다음 질문
    //   handleNextQuestion();
    // } else if (e.deltaY < 0) {
    //   // 휠을 위로 스크롤 -> 이전 질문
    //   handlePrevQuestion();
    // }

    // 짧은 시간 동안 연속 스크롤을 막기 위한 타이머 설정
    const timeout = setTimeout(() => {
      setScrollTimeout(null);
    }, 800); // 0.8초 동안 연속 스크롤 방지
    setScrollTimeout(timeout);
  };

  const submitResponses = () => {
    console.log(responses);
  };

  // responses, questions 업데이트
  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem(`aptifit${id}`));

    if (savedData) {
      const { questions, responses } = savedData;

      setResponses(responses);
      setQuestions(questions);
    }
  }, []);

  // 안 푼 문제로 이동
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
