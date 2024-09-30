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

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem(`aptifit${id}`));

    if (savedData) {
      const { questions, responses } = savedData;

      setResponses(responses);
      setQuestions(questions);
    }
  }, [id]);

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
        <div className={s.TestBodySection}>
          {questions.map((question, index) => {
            return (
              <div className={s.TestQuestion} key={index}>
                <TestItem question={question} />
                <TestOption
                  questionId={index}
                  responses={responses}
                  setResponses={setResponses}
                />
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </main>
  );
}

export default NewTestPage;
