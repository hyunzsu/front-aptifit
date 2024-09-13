import s from "./test.module.css";
import TestTitle from "./_components/TestTitle/TestTitle";
import QuizItem from "./_components/QuizItem/QuizItem";
import ProgressBar from "./_components/ProgressBar/ProgressBar";
import Button from "@/components/Button/Button";

export default function Test() {
  return (
    <div className={s.test}>
      <section className={s.testSection}>
        <TestTitle />
        <ProgressBar />
        <QuizItem />
        <QuizItem />
        <QuizItem />
        <QuizItem />
        <QuizItem />
        <QuizItem />
      </section>
      {/* 테스트 페이지 버튼 */}
      <Button label="다음" type="button" pageType="test" />
    </div>
  );
}
