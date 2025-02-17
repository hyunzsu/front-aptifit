"use client";

import s from "./Accordion.module.css";
import AccordionItem from "../AccordionItem/AccordionItem";
import { useState } from "react";
import { AccordionTable } from "@/lib/types";

type ExamplesProps = {
  examples: AccordionTable[];
};

export default function Accordion({ examples }: ExamplesProps) {
  // 현재 열려있는 Accordion의 ID를 저장하는 상태
  const [openAccordionId, setOpenAccordionId] = useState<number | false>(false);

  // Accordion 항목을 토글하는 함수
  const toggleAccordion = (id: number) => {
    setOpenAccordionId((prevId) => (prevId === id ? false : id));
    // 클릭한 항목이 이미 열려있으면 닫고(false), 아니면 해당 항목을 엽니다(id).
  };

  return (
    <div className={s.accordionContainer}>
      {examples.map((example) => (
        <AccordionItem
          key={example.id}
          example={example}
          isOpen={openAccordionId === example.id}
          toggleAccordion={() => toggleAccordion(example.id)}
        />
      ))}
    </div>
  );
}
