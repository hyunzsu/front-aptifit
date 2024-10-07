"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import s from "./Title.module.css";

const quizData = {
  "1": {
    category: "흥미(1/9)",
    alt: "흥미",
    desc: "다음과 같은 내용에 관심과 흥미가 있습니까?",
    icon: "/icons/interest.svg",
  },
  "2": {
    category: "흥미(2/9)",
    alt: "흥미",
    desc: "다음과 같은 내용에 관심과 흥미가 있습니까?",
    icon: "/icons/interest.svg",
  },
  "3": {
    category: "역량(3/9)",
    alt: "역량",
    desc: "본인이 다음과 같은 역량을 잘 발휘하고 있거나 잘 발휘할 수 있다고 생각합니까?",
    icon: "/icons/capability.svg",
  },
  "4": {
    category: "개인특성(4/9)",
    alt: "개인특성",
    desc: "본인이 다음과 같은 특성을 가지고 있다고 생각합니까?",
    icon: "/icons/value.svg",
  },
  "5": {
    category: "가치(5/9)",
    alt: "가치",
    desc: "다음과 같은 가치를 추구하는 것이 중요하다고 생각합니까?",
    icon: "/icons/characteristic.svg",
  },
  "6": {
    category: "지식(6/9)",
    alt: "지식",
    desc: "다음과 같은 지식의 내용을 알고 있습니까?",
    icon: "/icons/knowledge.svg",
  },
  "7": {
    category: "역량(7/9)",
    alt: "역량",
    desc: "본인이 다음과 같은 역량을 잘 발휘하고 있거나 잘 발휘할 수 있다고 생각합니까?",
    icon: "/icons/capability.svg",
  },
  "8": {
    category: "개인특성(8/9)",
    alt: "개인특성",
    desc: "본인이 다음과 같은 특성을 가지고 있다고 생각합니까?",
    icon: "/icons/characteristic.svg",
  },
  "9": {
    category: "가치(9/9)",
    alt: "가치",
    desc: "다음과 같은 가치를 추구하는 것이 중요하다고 생각합니까?",
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
