import SectionTitle from "@/components/sectionTitle/SectionTitle";
// import Carousel from "@/components/Carousel/Carousel";
import s from "./Section01.module.css";

export default function Section01() {
  return (
    <section className={s.section}>
      <div className={s.sectionContainer}>
        <SectionTitle
          title="01 학과순위"
          description="진우님과 가장 어울리는 학과는 다음과 같습니다!"
          color="white"
        />
        {/* 캐러셀 자리 */}
        {/* <Carousel items={} itemsToShow={1} /> */}
        {/* 학과 슬로건? */}
        <div className={s.taglineContainer}>
          <p className={s.tagline}>마음의 비밀을 푸는 신비로운 과학</p>
        </div>
        {/* 학과 설명 */}
        <p className={s.description}>
          심리학은 인간의 행동과 정신 과정을 연심리학과는 인간의 행동과 정신
          과정을 연구하는 학문 분야입니다. 심리학은 사람들의 감정, 사고, 행동이
          어떻게 형성되고 변화하는지를 이해하는 데 중점을 둡니다. 이 학문은 여러
          하위 분야로 나뉘며, 각기 다른 관점에서 인간의 심리를 탐구합니다.
        </p>
      </div>
    </section>
  );
}
