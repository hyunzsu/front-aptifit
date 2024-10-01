"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import s from "./Title.module.css";

const quizData = {
  "1": {
    category: "흥미(1/9)",
    alt: "흥미",
    desc: "흥미에서는 당신이 흥미를 가지는 부분을 파악합니다",
    icon: "/icons/interest.svg",
  },
  "2": {
    category: "흥미(2/9)",
    alt: "흥미",
    desc: "2번째 흥미에서는 당신이 흥미를 가지는 부분을 파악합니다",
    icon: "/icons/interest.svg",
  },
  "3": {
    category: "역량(3/9)",
    alt: "역량",
    desc: "역량에 대한 첫 번째 질문입니다",
    icon: "/icons/capability.svg",
  },
  "4": {
    category: "가치(4/9)",
    alt: "가치",
    desc: "가치관에 대한 질문입니다",
    icon: "/icons/value.svg",
  },
  "5": {
    category: "개인특성(5/9)",
    alt: "개인특성",
    desc: "개인의 특성에 대한 첫 번째 질문입니다",
    icon: "/icons/characteristic.svg",
  },
  "6": {
    category: "지식(6/9)",
    alt: "지식",
    desc: "지식 수준을 평가하는 질문입니다",
    icon: "/icons/knowledge.svg",
  },
  "7": {
    category: "역량(7/9)",
    alt: "역량",
    desc: "역량에 대한 두 번째 질문입니다",
    icon: "/icons/capability.svg",
  },
  "8": {
    category: "개인특성(8/9)",
    alt: "개인특성",
    desc: "개인의 특성에 대한 두 번째 질문입니다",
    icon: "/icons/characteristic.svg",
  },
  "9": {
    category: "가치(9/9)",
    alt: "가치",
    desc: "가치관에 대한 두 번째 질문입니다",
    icon: "/icons/knowledge.svg",
  },
};

export default function Title() {
  const { id } = useParams();

  return (
    <div className={s.Title}>
      <div className={s.titleContainer}>
        <Image
          src={quizData[id].icon}
          className={s.icon}
          alt="5대 역량 아이콘"
          width={28}
          height={28}
        />
        <h1 className={s.span}>{quizData[id].category}</h1>
      </div>
      <p className={s.desc}>{quizData[id].desc}</p>
    </div>
  );
}
