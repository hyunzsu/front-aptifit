"use client";

import SectionTitle from "@/components/sectionTitle/SectionTitle";
import s from "./Section03.module.css";
import SlideCategory from "../../_components/SlideCategory/SlideCategory";
import { useState } from "react";
import RenderContent from "../../_components/RenderContent/RenderContent";
import { ResultData } from "@/lib/types";
import {
  CATEGORIES,
  Category,
  CATEGORY_TO_KEY,
} from "@/lib/constants/categories";

const backendData = {
  major1: {
    major_title: "법학", // 학과명
    result: {
      // 결과지
      strength: {
        details: [
          {
            field: "상황판단 및 대처능력",
            score: 4,
            content:
              '사건의 상황을 법적 관점에서 파악하는 "상황판단 및 대처능력"',
          },
          {
            field: "구조 시스템적 사고",
            score: 4,
            content:
              '복잡한 법체계의 전체 구조를 파악하는 "구조 시스템적 사고"',
          },
          {
            field: "논리적 사고력",
            score: 1,
            content: '효과적인 법적 해결 방법을 제시하는 "논리적 사고력"',
          },
          {
            field: "글쓰기 능력",
            score: 5,
            content: '논리적이고 설득력 있는 글을 작성하는 "글쓰기 능력"',
          },
          {
            field: "정보수집 및 분석능력",
            score: 5,
            content:
              '방대한 법률 문헌을 조사하고 분석하는 "정보수집 및 분석능력"',
          },
        ],
        descriptions: [
          "법학과에서는 복잡한 법적 상황을 신속하고 정확하게 판단하고 대처하는 능력이 필수적입니다. 또한, 법률 체계와 규정을 이해하고 이를 구조적으로 분석하는 능력이 중요합니다. 논리적 사고력은 법적 논증과 판례 분석에서 핵심적인 역할을 합니다. 글쓰기 능력은 법률 문서 작성과 논문 작성에서 필수적입니다. 정보수집 및 분석능력은 법적 문제 해결을 위해 필요한 자료를 효과적으로 찾고 해석하는 데 중요합니다. 이러한 역량들은 법학과에서의 학업뿐만 아니라, 졸업 후 법조인으로서의 성공적인 경력에도 필수적입니다. 법학과는 이러한 다양한 역량을 종합적으로 활용하고 발전시킬 수 있는 최적의 학문 분야입니다.",
        ],
      },
      value: {
        details: [
          {
            field: "학문의 응용과 실천",
            score: 4,
            content:
              '법을 사회적 안정과 평화에 활용해 "학문의 응용과 실천"을 중시함.',
          },
          {
            field: "삶의 질 증진",
            score: 5,
            content:
              '인간 존엄성을 바탕으로 기본권 보장을 통해 "삶의 질 증진"을 실천함.',
          },
          {
            field: "사회정의",
            score: 5,
            content: '공정한 법적 절차로 평등을 구현하며 "사회정의"를 추구함.',
          },
          {
            field: "사회적 책임",
            score: 5,
            content: '법률적 도움을 제공하며 "사회적 책임"을 실천함.',
          },
          {
            field: "사고력 증진",
            score: 4,
            content:
              '입법, 행정, 사법의 효과적 운영을 위해 "사고력 증진"을 도모함.',
          },
        ],
        descriptions: [
          "법학과는 학문의 응용과 실천을 통해 실제 사회 문제를 해결하는 데 중점을 둡니다. 이를 통해 삶의 질을 증진시키고, 개인과 공동체의 권리를 보호하며, 사회 정의를 실현하는 데 기여합니다. 법학은 사회적 책임을 강조하며, 법률 전문가로서 공공의 이익을 위해 일하는 자세를 요구합니다. 또한, 법학은 복잡한 문제를 분석하고 해결하는 사고력을 증진시키는 데 중요한 역할을 합니다. 이러한 가치는 법학과의 교육과정과 목표와 밀접하게 연관되어 있으며, 법학을 공부하는 학생들이 사회에 긍정적인 영향을 미칠 수 있도록 돕습니다.",
        ],
      },
      characteristic: {
        details: [
          {
            field: "이성적인",
            score: 6,
            content:
              '판례와 근거를 바탕으로 논리적으로 의견을 내는 "이성적인" 학생',
          },
          {
            field: "꼼꼼한",
            score: 6,
            content:
              '법을 치밀하게 고려하여 빈틈없는 판단을 하는 "꼼꼼한" 학생',
          },
          {
            field: "탐구적인",
            score: 6,
            content: '법률적으로 사안을 깊이 있게 파고드는 "탐구적인" 학생',
          },
          {
            field: "끈기있는",
            score: 1,
            content: '법적 문제 해결을 위해 끊임없이 노력하는 "끈기있는" 학생',
          },
          {
            field: "주관이 뚜렷한",
            score: 4,
            content:
              '정의로운 사회를 위해 스스로 노력하는 "주관이 뚜렷한" 학생',
          },
        ],
        descriptions: [
          "법학과에서는 법률과 규정을 정확히 이해하고 해석하는 능력이 중요합니다. 이성적이고 꼼꼼한 성격은 복잡한 법률 문서를 분석하고 논리적으로 사고하는 데 큰 도움이 됩니다. 탐구적인 성향은 법률 문제를 깊이 파고들어 다양한 관점에서 접근할 수 있게 합니다. 주관이 뚜렷한 사람은 법적 논쟁에서 자신의 입장을 명확히 하고 설득력 있게 표현할 수 있습니다. 끈기 있는 성격은 긴 시간 동안 법률 공부와 실무 경험을 쌓는 데 필수적입니다. 이러한 특성들은 법학과에서 성공적으로 학업을 수행하고, 나아가 법조인으로서의 역할을 충실히 수행하는 데 중요한 자질입니다.",
        ],
      },
      knowledge: {
        details: [
          {
            field: "인문학과 윤리",
            score: 5,
            content:
              "도덕적 주체가 맺는 가치관계의 확장이 실제적이고 실천적인 측면에서는 결국 삶을 주도하는 자기 자신에게로 회귀한다.",
          },
          {
            field: "경제",
            score: 5,
            content:
              "수요와 공급에 따라 시장 균형 가격 및 거래량이 결정되며, 이는 노동시장 및 금융시장에 적용된다.",
          },
          {
            field: "정치",
            score: 5,
            content:
              "민주정치는 시민혁명을 통해 변화해왔으며, 사회계약설, 자유주의 , 공동체주의 등의 사상과 함께 발전해왔다. ",
          },
          {
            field: "한국사1",
            score: 5,
            content:
              "근대 이전의 한국 사회는 골품제, 양천제 등의 신분제에 기반하여 운영되었다. ",
          },
          {
            field: "한국지리 탐구",
            score: 4,
            content:
              "4차 산업혁명의 모빌리티 기술은 개인의 이동성은 물론, 지역의 교통 및 환경문제에 변화를 일으켰다.",
          },
        ],
        descriptions: [
          "법학과를 추천하는 이유는 다음과 같습니다:",
          "1. 법학은 다양한 사회 현상과 제도를 이해하고 분석하는 데 필요한 지식을 제공합니다.\n2. 도덕적 주체와 가치관계, 시장 경제, 민주정치 등 다양한 분야의 지식을 통합적으로 활용할 수 있습니다.\n3. 법학은 사회 정의와 공공의 이익을 추구하는 데 중요한 역할을 하며, 이를 통해 사회적 책임감을 키울 수 있습니다.\n4. 4차 산업혁명과 같은 현대적 변화에 대응하는 법적 지식과 규제 방안을 학습할 수 있습니다.\n5. 법학은 논리적 사고와 문제 해결 능력을 향상시키며, 이는 다양한 직업 분야에서 유용하게 활용될 수 있습니다.",
        ],
      },
      interests: {
        details: [
          {
            field: "대중 선호 디자인",
            score: 7,
            content: "대중이 선호하는 디자인 요소 탐색",
          },
          {
            field: "구매 행동 요소",
            score: 7,
            content: "소비자의 구매 행동에 미치는 요인 탐구",
          },
          {
            field: "법률 적용",
            score: 7,
            content: "법률적 지식의 실제 적용",
          },
          {
            field: "새로운 역사해석",
            score: 7,
            content: "역사를 해석하는 새로운 시선을 제시하는 책",
          },
          {
            field: "최신 앱 기술 학습",
            score: 7,
            content:
              "다양한 분야(운동, 교육, 배달 등)에 적용되는 최신 앱 기술 학습",
          },
        ],
        descriptions: [
          "법학과는 다양한 사회적, 경제적, 정치적 이슈를 다루며, 국가 간 갈등, 무역 분쟁, 난민 문제 등 복잡한 문제를 해결하는 데 필요한 지식을 제공합니다. 법률적 지식의 실제 적용을 통해 정의로운 상호작용과 공정한 권리 행사를 보장하는 방법을 배울 수 있습니다. 또한, 법학은 인간의 심리적 원인과 행동, 그리고 사회적 변화에 대한 깊은 이해를 요구하므로, 심리학적 탐구와도 밀접한 관련이 있습니다. 법학과에서는 역사적 기록물과 철학적 가르침을 통해 권력의 형성과 행사, 국가 간 권력관계를 탐구할 수 있습니다. 마지막으로, 법학은 다양한 분야와 연계되어 있어, 정보기술, 예술, 도시 재생 등 여러 관심사를 융합하여 문제를 해결하는 데 유용한 학문입니다.",
        ],
      },
    },
    career: {
      annualSalary: "", //연봉
      jobSatisfaction: "", //직업만족도
      jobTitle: "", //직업명
      summary: "", //한줄요약
      relatedJobs: "", // 관련직업
      employmentOpportunities: "", //주요 진출 및 취업처
      suitablePerson: "", //적합한 사람
      jobResponsibilities: "", //하는일
      requiredKnowledge: "", //필요역량-지식
      requiredSkills: "", //필요역량-기술
      requiredAttitude: "", //필요역량-태도
      careerDevelopmentMethods: {
        relatedMajor: "", //경력개발방법-관련 전공
        universityCourses: "", //경력개발방법-대학 교과목
        nonCurricularPrograms: "", //경력개발방법-대학 내 비교과프로그램
        vocationalTraining: "", //경력개발방법-직업훈련 및 능력개발과정
        workExperience: "", //경력개발방법-일경험
        certifications: "", //경력개발방법-자격증
        selfDirectedActivities: "", //경력개발방법-자기주도적 활동
      },
      careerPath: "", //진출자 전공 영역
      relatedInformationSources: [{ name: "", link: "" }], //경력 경로
      adviceForYouth: "", //관심 청년을 위한 핵심 조언
    },
  },
};

export default function Section03() {
  const data: ResultData = backendData.major1.result;
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  console.log(activeCategory);

  return (
    <section className={s.section}>
      <div className={s.sectionContainer}>
        <SectionTitle
          title="03 나의 5대 적성요소 분석"
          description="나의 학과 적성을 분석한 상세 리포트를 살펴보세요!"
          color="black"
        />
        {/* Category */}
        <SlideCategory
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        {/* Content */}
        <RenderContent
          categoryData={data[CATEGORY_TO_KEY[activeCategory]]}
          activeCategory={activeCategory}
        />
      </div>
    </section>
  );
}
