import { Title } from "@/components";
import { DropdownFilter, CombinedDropdownFilter } from "./_components";
import {
  grade,
  major1,
  major2,
  majorField1,
  majorField2,
} from "@/lib/constants";
import s from "./AddUserInfoPage.module.css";

export default function AddUserInfoPage() {
  return (
    <main className={s.AddUserInfoPage}>
      <Title label="회원정보 등록" />
      <div className={s.container}>
        {/* 학교 입력 */}
        <div className={s.inputContainer}>
          <label className={s.label} htmlFor="">
            학교
          </label>
          <input className={s.input} type="text" placeholder="앱티대학교" />
        </div>
        {/* 학년 선택 */}
        <div className={s.filterContainer}>
          <p className={s.filterTitle}>학년</p>
          <DropdownFilter defaultValue="학년" data={grade} />
        </div>
        {/* 전공 */}
        <div className={s.filterContainer}>
          <p className={s.filterTitle}>전공</p>
          <CombinedDropdownFilter
            defaultValue1="계열"
            defaultValue2="전공"
            data1={majorField1}
            data2={major1}
          />
        </div>
        {/* 부전공 및 복수전공 */}
        <div className={s.filterContainer}>
          <p className={s.filterTitle}>부전공 및 복수전공</p>
          <CombinedDropdownFilter
            defaultValue1="계열"
            defaultValue2="전공"
            data1={majorField2}
            data2={major2}
          />
        </div>
        {/* 비교희망학과 */}
        <div className={s.filterContainer}>
          <p className={s.filterTitle}>비교희망학과</p>
          <CombinedDropdownFilter
            defaultValue1="계열"
            defaultValue2="전공"
            data1={majorField2}
            data2={major2}
          />
        </div>
        {/* 희망직업 입력 */}
        <div className={s.inputContainer}>
          <label className={s.label} htmlFor="">
            희망직업
          </label>
          <input className={s.input} type="text" placeholder="희망직업" />
        </div>
        {/* 등록버튼 */}
        <button className={s.button}>등록하기</button>
      </div>
    </main>
  );
}
