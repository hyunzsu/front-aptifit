import React from "react";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import Card from "@/components/Card/Card";
import Accordion from "@/components/Accordion/Accordion";
import s from "./Section02.module.css";

export default function Section02() {
  const cardData = [
    {
      id: 1,
      title: "01 학과설명",
      description:
        "교육학과는 교육 이론과 실제를 연구하는 학문으로, 교육 철학, 교육 심리학, 교육 방법론, 교육 평가, 교육 행정 등을 다룹니다. 최근 트렌드로는 온라인 교육, AI를 활용한 맞춤형 교육, 교육 격차 해소, 평생 교육 등이 부상하고 있으며, 교육의 질 향상과 접근성 확대가 주목받고 있습니다.",
    },
    {
      id: 2,
      title: "02 인재상",
      description:
        "교육학과는 창의적이고 혁신적인 사고를 가진 인재를 추구합니다. 학생들의 잠재력을 이해하고 개발할 수 있는 통찰력, 효과적인 의사소통 능력, 그리고 지속적인 학습에 대한 열정을 가진 사람들이 이상적입니다. 또한, 다양성을 존중하고 포용적인 교육 환경을 조성할 수 있는 능력도 중요하게 여겨집니다.",
    },
    {
      id: 3,
      title: "03 심화분야",
      description:
        "교육학과의 심화 분야로는 교육심리학, 교육공학, 교육과정 및 평가, 교육행정, 평생교육, 특수교육 등이 있습니다. 학생들은 이러한 전문 분야에서 깊이 있는 연구와 실습을 통해 전문성을 키우고, 현대 교육의 과제를 해결할 수 있는 능력을 갖추게 됩니다.",
    },
    {
      id: 4,
      title: "04 커리큘럼",
      description:
        "교육학과의 커리큘럼은 다양한 교육 이론과 실제를 균형 있게 다룹니다. 1-2학년에서는 교육학 개론, 교육심리학, 교육철학 등 기초 과목을 학습하고, 3-4학년에서는 교육과정, 교육평가, 교육상담, 교육정책 등 심화 과목을 배웁니다. 또한, 교육실습을 통해 실제 교육 현장을 경험하고 이론을 적용하는 기회를 가집니다.",
    },
  ];

  const accordionData = cardData.map((item) => ({
    id: item.id,
    question: item.title,
    answer: item.description,
  }));

  return (
    <section className={s.section}>
      <div className={s.sectionContainer}>
        <SectionTitle
          title="02 학과소개"
          description="심리학과의 A to Z, 진우님을 위해 쉽게 정리했어요!"
          color="white"
        />
        {/* Desktop view */}
        <div className={s.desktopView}>
          <div className={s.cardContainer}>
            {cardData.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                description={card.description}
                className={s.card}
              />
            ))}
          </div>
        </div>
        {/* Mobile view */}
        <div className={s.mobileView}>
          <Accordion examples={accordionData} />
        </div>
      </div>
    </section>
  );
}
