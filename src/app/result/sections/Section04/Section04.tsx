"use client";

import { useMemo } from "react";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import Card from "@/components/Card/Card";
import Carousel from "@/components/Carousel/Carousel";
import Accordion from "@/components/Accordion/Accordion";
import s from "./Section04.module.css";
import { useResultStore } from "@/lib/stores";
import { titleMap, descriptionMap } from "./_constants";

type JobDetail = {
  id: number;
  question: string;
  answer: string;
  description?: string;
};

type JobData = {
  id: number;
  jobTitle: string;
  summary: string;
  details: JobDetail[];
};

export default function Section04({ name }: { name: string }) {
  const { currentMajor, majors, currentCareerIndex, setCurrentCareerIndex } =
    useResultStore();

  // 현재 선택된 학과의 career 데이터를 가져와 가공
  const jobsData: JobData[] = useMemo(() => {
    const currentMajorData = majors[currentMajor];
    if (!currentMajorData) return [];

    return currentMajorData.career.map((career, index) => ({
      id: index + 1,
      jobTitle: career.jobTitle,
      summary: career.summary,
      details: career.details
        .map((detail, detailIndex) => {
          const [key, value] = Object.entries(detail)[0];
          return {
            id: detailIndex + 1,
            question: titleMap[key] || `Unknown Field: ${key}`,
            answer: value as string,
            description: descriptionMap[key],
          };
        })
        .filter((item) => item.answer !== "" && item.answer != null),
    }));
  }, [currentMajor, majors]);

  const handleCardClick = (index: number) => {
    setCurrentCareerIndex(index);
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
      isSelected={index === currentCareerIndex}
      className={s.jobCard}
    />
  ));

  return (
    <section className={s.section}>
      <div className={s.sectionContainer}>
        <SectionTitle
          title="04 커리어로드맵"
          description={`${currentMajor}을 배운 ${name}님의 미래를 살펴봐보세요!`}
          color="black"
        />
        <div className={s.carouselContainer}>
          <Carousel
            items={carouselItems}
            itemsToShow={3}
            useGlobalState={true}
          />
        </div>

        {jobsData.length > 0 && (
          <>
            <div className={s.line}></div>
            <p className={s.jobName}>{jobsData[currentCareerIndex].jobTitle}</p>
            <Accordion examples={jobsData[currentCareerIndex].details} />
          </>
        )}
      </div>
    </section>
  );
}
