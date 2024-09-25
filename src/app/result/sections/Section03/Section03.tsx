import SectionTitle from "@/components/sectionTitle/SectionTitle";
import s from "./Section03.module.css";

export default function Section03() {
  return (
    <section className={s.section}>
      <div className={s.sectionContainer}>
        <SectionTitle
          title="03 나의 5대 역량 분석"
          description="나의 학과 적성을 5대 역량 분석한 상세 리포트를 살펴보세요!"
          color="black"
        />
      </div>
    </section>
  );
}
