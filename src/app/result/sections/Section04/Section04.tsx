import SectionTitle from "@/components/sectionTitle/SectionTitle";
import s from "./Section04.module.css";
import Accordion from "../../../../components/Accordion/Accordion";

const mockCareerData = {
  jobTitle: "바이오의약품생산관리자",
  summary: "바이오의약품 생산 과정을 총괄 관리하는 전문가",
  details: [
    {
      id: 1,
      question: "연봉",
      answer: "평균 5000만원 ~ 7000만원 (경력에 따라 상이)",
    },
    {
      id: 2,
      question: "직업만족도",
      answer: "4.2/5.0 (업계 평균)",
    },
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
    {
      id: 6,
      question: "하는일",
      answer:
        "바이오의약품 생산 공정 관리, 품질 관리, 생산 효율성 개선, 규제 준수 감독",
    },
    {
      id: 7,
      question: "필요역량-지식",
      answer: "생물학, 화학, 공학 기초 지식, GMP(우수의약품 제조관리기준) 이해",
    },
    {
      id: 8,
      question: "필요역량-기술",
      answer: "생산 공정 분석 능력, 품질 관리 기술, 데이터 분석 능력",
    },
    {
      id: 9,
      question: "필요역량-태도",
      answer: "정확성, 책임감, 팀워크, 지속적 학습 의지",
    },
    {
      id: 10,
      question: "경력개발방법-관련 전공",
      answer: "생명공학, 화학공학, 제약학, 생물학",
    },
    {
      id: 11,
      question: "경력개발방법-대학 교과목",
      answer: "생화학, 분자생물학, 미생물학, 바이오프로세스공학, 품질관리",
    },
    {
      id: 12,
      question: "경력개발방법-대학 내 비교과프로그램",
      answer: "제약회사 인턴십, 연구실 프로젝트 참여, 관련 학회 활동",
    },
    {
      id: 13,
      question: "경력개발방법-직업훈련 및 능력개발과정",
      answer: "GMP 교육과정, 바이오의약품 생산관리 전문가 과정",
    },
    {
      id: 14,
      question: "경력개발방법-일경험",
      answer: "제약회사 생산부서 인턴, 바이오벤처 기업 인턴",
    },
    {
      id: 15,
      question: "경력개발방법-자격증",
      answer: "바이오의약품 품질관리사, 생물공학기사",
    },
    {
      id: 16,
      question: "경력개발방법-자기주도적 활동",
      answer: "관련 학술 논문 리뷰, 온라인 강좌 수강, 업계 동향 파악",
    },
    {
      id: 17,
      question: "진출자 전공 영역",
      answer: "생명과학, 화학, 공학, 약학",
    },
    {
      id: 18,
      question: "경력 경로",
      answer: "",
    },
    {
      id: 19,
      question: "관심 청년을 위한 핵심 조언",
      answer:
        "기초 과학 지식을 탄탄히 하고, 실제 생산 현장 경험을 쌓는 것이 중요합니다. 또한, 지속적으로 변화하는 규제와 기술 동향을 파악하는 습관을 들이세요.",
    },
  ],
};

export default function Section04() {
  return (
    <section className={s.section}>
      <div className={s.sectionContainer}>
        <SectionTitle
          title="04 커리어로드맵"
          description="심리학을 배운 진우님의 미래를 살펴봐보세요!"
          color="black"
        />
        <div className={s.line}></div>
        <p className={s.jobName}>바이오의약품생산관리자</p>
        <Accordion
          examples={mockCareerData.details.filter((item) => item.answer !== "")}
        />
      </div>
    </section>
  );
}
