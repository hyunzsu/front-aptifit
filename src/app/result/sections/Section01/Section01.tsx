"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import MajorCard from "@/components/MajorCard/MajorCard";
import Carousel from "@/components/Carousel/Carousel";
import s from "./Section01.module.css";

// 학과 데이터 타입 정의
type MajorData = {
  name: string;
  tagline: string;
  description: string;
};

// 샘플 학과 데이터
const majorsData: MajorData[] = [
  {
    name: "심리학",
    tagline: "마음의 비밀을 푸는 신비로운 과학",
    description:
      "심리학은 인간의 행동과 정신 과정을 연구하는 학문 분야입니다. 심리학은 사람들의 감정, 사고, 행동이 어떻게 형성되고 변화하는지를 이해하는 데 중점을 둡니다. 이 학문은 여러 하위 분야로 나뉘며, 각기 다른 관점에서 인간의 심리를 탐구합니다.",
  },
  {
    name: "간호학",
    tagline: "건강과 치유의 전문가로 성장하는 길",
    description:
      "간호학은 환자의 건강 증진, 질병 예방, 건강 회복을 위한 전문적인 돌봄을 제공하는 학문입니다. 의학적 지식과 인간에 대한 이해를 바탕으로, 환자의 신체적, 정신적 건강을 총체적으로 관리하는 방법을 배웁니다.",
  },
  // 필요에 따라 더 많은 학과 데이터 추가
];

export default function Section01() {
  const [currentMajor, setCurrentMajor] = useState<MajorData>(majorsData[0]);

  const majorItems = majorsData.map((major, index) => (
    <MajorCard key={index} majorName={major.name} />
  ));

  const handleItemChange = (index: number) => {
    setCurrentMajor(majorsData[index]);
  };

  return (
    <section className={s.section}>
      <div className={s.sectionContainer}>
        <SectionTitle
          title="01 학과순위"
          description="진우님과 가장 어울리는 학과는 다음과 같습니다!"
          color="white"
        />
        <div className={s.carouselContainer}>
          <Carousel
            items={majorItems}
            itemsToShow={1}
            onItemChange={handleItemChange}
          />
        </div>
        <div className={s.taglineContainer}>
          <p className={s.tagline}>{currentMajor.tagline}</p>
        </div>
        <p className={s.description}>{currentMajor.description}</p>
      </div>
    </section>
  );
}
