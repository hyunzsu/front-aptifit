import SectionTitle from "@/components/sectionTitle/SectionTitle";
import Card from "@/components/Card/Card";
import s from "./Section02.module.css";
// import Carousel from "../../../components/Carousel/Carousel";

export default function Section02() {
  return (
    <section className={s.section}>
      <div className={s.sectionContainer}>
        <SectionTitle
          title="02 학과소개"
          description="심리학과의 A to Z, 진우님을 위해 쉽게 정리했어요!"
          color="white"
        />
        {/* 카드 컨테이너 */}
        <div className={s.cardContainer}>
          <Card
            title="01 학과설명"
            description="교육학과는 교육 이론과 실제를 연구하는 학문으로, 교육 철학, 교육 심리학, 교육 방법론, 교육 평가, 교육 행정 등을 다룹니다. 최근 트렌드로는 온라인 교육, AI를 활용한 맞춤형 교육, 교육 격차 해소, 평생 교육 등이 부상하고 있으며, 교육의 질 향상과 접근성 확대가 주목받고 있습니다."
            width={500}
            height={230}
          />
          <Card
            title="02 인재상"
            description="교육학과는 교육 이론과 실제를 연구하는 학문으로, 교육 철학, 교육 심리학, 교육 방법론, 교육 평가, 교육 행정 등을 다룹니다. 최근 트렌드로는 온라인 교육, AI를 활용한 맞춤형 교육, 교육 격차 해소, 평생 교육 등이 부상하고 있으며, 교육의 질 향상과 접근성 확대가 주목받고 있습니다."
            width={500}
            height={230}
          />
          <Card
            title="03 심화분야"
            description="교육학과는 교육 이론과 실제를 연구하는 학문으로, 교육 철학, 교육 심리학, 교육 방법론, 교육 평가, 교육 행정 등을 다룹니다. 최근 트렌드로는 온라인 교육, AI를 활용한 맞춤형 교육, 교육 격차 해소, 평생 교육 등이 부상하고 있으며, 교육의 질 향상과 접근성 확대가 주목받고 있습니다."
            width={500}
            height={230}
          />
          <Card
            title="04 커리큘럼"
            description="교육학과는 교육 이론과 실제를 연구하는 학문으로, 교육 철학, 교육 심리학, 교육 방법론, 교육 평가, 교육 행정 등을 다룹니다. 최근 트렌드로는 온라인 교육, AI를 활용한 맞춤형 교육, 교육 격차 해소, 평생 교육 등이 부상하고 있으며, 교육의 질 향상과 접근성 확대가 주목받고 있습니다."
            width={500}
            height={230}
          />
        </div>
      </div>
    </section>
  );
}
