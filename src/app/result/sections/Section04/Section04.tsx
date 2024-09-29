"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import Card from "@/components/Card/Card";
import Carousel from "@/components/Carousel/Carousel";
import Accordion from "@/components/Accordion/Accordion";
import s from "./Section04.module.css";

type JobData = {
  id: number;
  jobTitle: string;
  summary: string;
  details: {
    id: number;
    question: string;
    answer: string;
  }[];
};

const jobsData: JobData[] = [
  {
    id: 1,
    jobTitle: "바이오의약품생산관리자",
    summary: "바이오의약품 생산 과정을 총괄 관리하는 전문가",
    details: [
      {
        id: 1,
        question: "연봉",
        answer: "평균 5000만원 ~ 7000만원 (경력에 따라 상이)",
      },
      { id: 2, question: "직업만족도", answer: "4.2/5.0 (업계 평균)" },
      {
        id: 3,
        question: "관련직업",
        answer: "제약회사 연구원, 바이오 공정 엔지니어, 품질관리 전문가",
      },
      {
        id: 4,
        question: "주요 진출 및 취업처",
        answer: "대형 제약회사, 바이오테크 기업, 연구소, 정부 규제 기관",
      },
      {
        id: 5,
        question: "적합한 사람",
        answer:
          "꼼꼼하고 정확한 성격, 과학적 사고력, 문제 해결 능력이 뛰어난 사람",
      },
    ],
  },
  {
    id: 2,
    jobTitle: "임상심리학자",
    summary: "심리적 문제를 진단하고 치료하는 전문가",
    details: [
      {
        id: 1,
        question: "연봉",
        answer: "평균 4500만원 ~ 6500만원 (경력 및 근무 기관에 따라 상이)",
      },
      { id: 2, question: "직업만족도", answer: "4.0/5.0 (업계 평균)" },
      {
        id: 3,
        question: "관련직업",
        answer: "상담심리사, 정신과 의사, 학교 상담사",
      },
      {
        id: 4,
        question: "주요 진출 및 취업처",
        answer: "병원, 상담 센터, 학교, 기업 상담실",
      },
      {
        id: 5,
        question: "적합한 사람",
        answer: "공감 능력이 뛰어나고, 분석적 사고력을 갖춘 사람",
      },
    ],
  },
  {
    id: 3,
    jobTitle: "조직심리컨설턴트",
    summary: "기업의 조직 문화와 효율성을 개선하는 전문가",
    details: [
      {
        id: 1,
        question: "연봉",
        answer: "평균 5500만원 ~ 8000만원 (경력 및 프로젝트에 따라 상이)",
      },
      { id: 2, question: "직업만족도", answer: "4.3/5.0 (업계 평균)" },
      {
        id: 3,
        question: "관련직업",
        answer: "인사 컨설턴트, 기업 교육 전문가, 조직개발 전문가",
      },
      {
        id: 4,
        question: "주요 진출 및 취업처",
        answer: "컨설팅 회사, 대기업 인사팀, 정부 기관",
      },
      {
        id: 5,
        question: "적합한 사람",
        answer: "커뮤니케이션 능력이 뛰어나고, 전략적 사고를 할 수 있는 사람",
      },
    ],
  },
  {
    id: 4,
    jobTitle: "인지행동치료사",
    summary: "인지와 행동의 변화를 통해 심리적 문제를 해결하는 전문가",
    details: [
      {
        id: 1,
        question: "연봉",
        answer: "평균 4000만원 ~ 6000만원 (경력 및 근무 형태에 따라 상이)",
      },
      { id: 2, question: "직업만족도", answer: "4.1/5.0 (업계 평균)" },
      {
        id: 3,
        question: "관련직업",
        answer: "심리치료사, 정신건강 상담사, 행동분석가",
      },
      {
        id: 4,
        question: "주요 진출 및 취업처",
        answer: "정신건강 클리닉, 병원, 개인 상담소",
      },
      {
        id: 5,
        question: "적합한 사람",
        answer: "논리적 사고력과 환자에 대한 이해력이 높은 사람",
      },
    ],
  },
  {
    id: 5,
    jobTitle: "학교상담사",
    summary: "학생들의 심리적, 학업적 문제를 상담하는 전문가",
    details: [
      {
        id: 1,
        question: "연봉",
        answer: "평균 3500만원 ~ 5000만원 (경력 및 학교 유형에 따라 상이)",
      },
      { id: 2, question: "직업만족도", answer: "3.9/5.0 (업계 평균)" },
      {
        id: 3,
        question: "관련직업",
        answer: "교사, 청소년 상담사, 진로 상담사",
      },
      {
        id: 4,
        question: "주요 진출 및 취업처",
        answer: "초·중·고등학교, 대학 상담센터, 청소년 상담 기관",
      },
      {
        id: 5,
        question: "적합한 사람",
        answer: "아동·청소년에 대한 이해도가 높고, 의사소통 능력이 뛰어난 사람",
      },
    ],
  },
];

export default function Section04() {
  const [selectedJobIndex, setSelectedJobIndex] = useState<number>(0);

  const handleCardClick = (index: number) => {
    setSelectedJobIndex(index);
  };

  const carouselItems = jobsData.map((job, index) => (
    <Card
      key={job.id}
      title={"0" + job.id}
      description={
        <div>
          <p className={s.cardJobTitle}>{job.jobTitle}</p>
          <p className={s.cardJobContent}>{job.summary}</p>
        </div>
      }
      titleClassName={s.cardJobNumber}
      descriptionClassName={s.cardJobDescription}
      onClick={() => handleCardClick(index)}
      isSelected={index === selectedJobIndex}
      className={s.jobCard}
    />
  ));

  return (
    <section className={s.section}>
      <div className={s.sectionContainer}>
        <SectionTitle
          title="04 커리어로드맵"
          description="심리학을 배운 진우님의 미래를 살펴봐보세요!"
          color="black"
        />
        <div className={s.carouselContainer}>
          <Carousel items={carouselItems} itemsToShow={3} />
        </div>

        <div className={s.line}></div>
        <p className={s.jobName}>{jobsData[selectedJobIndex].jobTitle}</p>
        <Accordion
          examples={jobsData[selectedJobIndex].details.filter(
            (item) => item.answer !== ""
          )}
        />
      </div>
    </section>
  );
}