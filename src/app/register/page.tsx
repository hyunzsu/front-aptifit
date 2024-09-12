import { Title } from "@/components";
import Accordion from "@/components/Accordion/Accordion";
import s from "./register.module.css";

const examples = [
  {
    id: 1,
    question: "주요 진출 및 위업처",
    answer:
      "공식 사이트가 아닙니다. 녹색친구들 마곡 입주 예정자가 만든 임시 사이트이며 **비영리적** 목적으로 입주민간의 정보 공유를 위해 운영되고 있습니다. 이 곳에 올라오는 모든 정보는 오픈채팅방과 녹색친구들 공지사항을 기반으로 구성되어있습니다. 다소 부정확한 정보가 있을 수 있으니 중요한 정보는 녹색친구들에 문의바랍니다.",
  },
  {
    id: 2,
    question: "적합한 사람",
    answer:
      "A. **입주자 대상자 발표:** 2024.08.09 B. 계약서 작성일: 2024.08.14 ~ 2024.08.20 (6일) C. 입주일 가능일: 잔금 납부일부터 ~ 2024.09.06",
  },
  {
    id: 3,
    question: "하는 일",
    answer:
      "음식물쓰레기는 현재 카드키 발급예정입니다. 당분간 지하 1층 커뮤니티 공간에 가져다주시면 처리해드립니다.",
  },
  {
    id: 4,
    question: "경력 개발 방법 - 대학교과목",
    answer:
      "공식 사이트가 아닙니다. 녹색친구들 마곡 입주 예정자가 만든 임시 사이트이며 **비영리적** 목적으로 입주민간의 정보 공유를 위해 운영되고 있습니다. 이 곳에 올라오는 모든 정보는 오픈채팅방과 녹색친구들 공지사항을 기반으로 구성되어있습니다. 다소 부정확한 정보가 있을 수 있으니 중요한 정보는 녹색친구들에 문의바랍니다.",
  },
];

export default function RegisterPage() {
  return (
    <section className={s.registerContainer}>
      <Title label="회원가입" />
      <Accordion examples={examples} />
    </section>
  );
}
