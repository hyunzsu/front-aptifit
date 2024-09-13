"use client";

import { useParams } from "next/navigation";
// import Image from "next/image";
import s from "./TestTitle.module.css";

/* 이미지 경로 */
// import Interest from "/public/svg/interest.svg";
// import Capability from "/public/svg/Capability.svg";
// import Value from "/public/svg/Value.svg";
// import Characteristic from "/public/svg/Characteristic.svg";
// import Knowledge from "/public/svg/Knowledge.svg";

type QuizData = {
  category: string;
  // icon: string;
  alt: string;
  question: string;
};

const quizData: Record<string, QuizData> = {
  "1": {
    category: "개인 특성",
    // icon: Value,
    alt: "개인 특성",
    question: "본인이 다음과 같은 특성을 가지고 있다고 생각합니까?",
  },
  "2": {
    category: "역량",
    // icon: Capability,
    alt: "역량",
    question: "본인이 다음과 같은 능력을 얼마나 갖추고 있다고 생각합니까?",
  },
  "3": {
    category: "가치",
    // icon: Characteristic,
    alt: "가치",
    question: "다음과 같은 가치를 추구하는 것이 중요하다고 생각합니까?",
  },
  "4": {
    category: "흥미",
    // icon: Interest,
    alt: "흥미",
    question: "다음과 같은 내용에 관심과 흥미가 있습니까?",
  },
  "5": {
    category: "흥미",
    // icon: Interest,
    alt: "흥미",
    question: "다음과 같은 내용에 관심과 흥미가 있습니까?",
  },
  "6": {
    category: "지식",
    // icon: Knowledge,
    alt: "지식",
    question: "다음과 같은 지식의 내용을 알고 있습니까?",
  },
};

export default function TestTitle() {
  const { id } = useParams<{ id: string }>();
  const data = quizData[id || ""];

  if (!data) {
    return null; // 데이터가 없을 경우 null 반환 추후 오류처리에 대한 고민해야됨
  }

  return (
    <header className={s.TestTitle}>
      <div className={s.titleContainer}>
        {/* <Image
          className={s.icon}
          src={data.icon}
          alt={data.alt}
          width={28}
          height={28}
        /> */}
        <h3 className={s.category}>{data.category}</h3>
      </div>
      <h2 className={s.title}>{data.question}</h2>
    </header>
  );
}
