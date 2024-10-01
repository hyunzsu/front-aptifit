import Image from "next/image";
import s from "./AccordionItem.module.css";
import { AccordionTable } from "@/lib/types";

type ExampleItemProps = {
  example: AccordionTable & { description?: string };
  isOpen: boolean;
  toggleAccordion: () => void;
};

export default function AccordionItem({
  example,
  isOpen,
  toggleAccordion,
}: ExampleItemProps) {
  // 배열 데이터를 처리하는 함수
  const formatAnswer = (answer: string | string[]) => {
    if (Array.isArray(answer)) {
      return answer.join("\n");
    }
    return answer;
  };

  return (
    <div className={s.accordionItem}>
      {/* 질문 */}
      <div onClick={toggleAccordion} className={s.questionWrapper}>
        <span className={s.question}>{example.question}</span>
        <Image
          src={isOpen ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"}
          alt={isOpen ? "닫기" : "열기"}
          width={24}
          height={24}
          className={s.icon}
        />
      </div>
      {/* 답변 */}
      <div className={`${s.answerWrapper} ${isOpen ? s.open : ""}`}>
        {example.description && (
          <p className={s.description}>{example.description}</p>
        )}
        <p className={s.answer}>{formatAnswer(example.answer)}</p>
      </div>
    </div>
  );
}
