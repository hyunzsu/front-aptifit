import Image from "next/image";
import s from "./AccordionItem.module.css";
import { AccordionTable } from "@/lib/types";

type ExampleItemProps = {
  example: AccordionTable;
  isOpen: boolean;
  toggleAccordion: () => void;
};

export default function AccordionItem({
  example,
  isOpen,
  toggleAccordion,
}: ExampleItemProps) {
  return (
    <div className={s.accordionItem}>
      {/* 질문 */}
      <div onClick={toggleAccordion} className={s.questionWrapper}>
        <span className={s.question}>{example.question}</span>
        <Image
          src={isOpen ? "/assets/arrow-up.svg" : "/assets/arrow-down.svg"}
          alt={isOpen ? "닫기" : "열기"}
          width={24}
          height={24}
          className={s.icon}
        />
      </div>
      {/* 답변 */}
      <div className={`${s.answerWrapper} ${isOpen ? s.open : ""}`}>
        <p className={s.answer}>{example.answer}</p>
      </div>
    </div>
  );
}
