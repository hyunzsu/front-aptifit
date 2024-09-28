"use client";

import { useState } from "react";
import { Title } from "@/components";
import { DropdownFilter, CombinedDropdownFilter } from "./_components";
import {
  gradeField,
  major1,
  major2,
  majorField1,
  majorField2,
} from "@/lib/constants";
import { useAddUserInfo } from "@/lib/hooks";
import s from "./AddUserInfoPage.module.css";

export default function AddUserInfoPage() {
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [major, setMajor] = useState("");
  const [secondaryMajor, setSecondaryMajor] = useState("");
  const [desiredMajor, setDesiredMajor] = useState("");
  const [desiredCareer, setDesiredCareer] = useState("");

  const { handleAddUserInfo } = useAddUserInfo();

  const handleInput = (e, setState) => {
    setState(e.target.value);
  };

  const handleClick = async () => {
    if (
      !school ||
      !grade ||
      !major ||
      !secondaryMajor ||
      !desiredMajor ||
      !desiredCareer
    ) {
      alert("채워지지 않은 값이 있습니다!");
      return;
    }

    handleAddUserInfo(
      school,
      grade,
      major,
      secondaryMajor,
      desiredMajor,
      desiredCareer
    );
  };

  return (
    <main className={s.AddUserInfoPage}>
      <Title label="회원정보 등록" />
      <div className={s.container}>
        {/* 학교 입력 */}
        <div className={s.inputContainer}>
          <label className={s.label} htmlFor="">
            학교
          </label>
          <input
            className={s.input}
            type="text"
            placeholder="앱티대학교"
            value={school}
            onChange={(e) => handleInput(e, setSchool)}
          />
        </div>
        {/* 학년 선택 */}
        <div className={s.filterContainer}>
          <p className={s.filterTitle}>학년</p>
          <DropdownFilter
            defaultValue="학년"
            data={gradeField}
            setState={setGrade}
          />
        </div>
        {/* 전공 */}
        <div className={s.filterContainer}>
          <p className={s.filterTitle}>전공</p>
          <CombinedDropdownFilter
            defaultValue1="계열"
            defaultValue2="전공"
            data1={majorField1}
            data2={major1}
            setState={setMajor}
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
            setState={setSecondaryMajor}
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
            setState={setDesiredMajor}
          />
        </div>
        {/* 희망직업 입력 */}
        <div className={s.inputContainer}>
          <label className={s.label} htmlFor="">
            희망직업
          </label>
          <input
            className={s.input}
            type="text"
            placeholder="희망직업"
            value={desiredCareer}
            onChange={(e) => handleInput(e, setDesiredCareer)}
          />
        </div>
        {/* 등록버튼 */}
        <button className={s.button} onClick={handleClick}>
          등록하기
        </button>
      </div>
    </main>
  );
}
