"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Title } from "@/components";
import { useAuthStore } from "@/lib/stores";
import { DropdownFilter, CombinedDropdownFilter } from "./_components";
import {
  gradeField,
  major1,
  major2,
  majorField1,
  majorField2,
} from "@/lib/constants";
import { postDataWithAuth } from "@/lib/services";
import s from "./AddUserInfoPage.module.css";

export default function AddUserInfoPage() {
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [major, setMajor] = useState("");
  const [secondaryMajor, setSecondaryMajor] = useState("");
  const [desiredMajor, setDesiredMajor] = useState("");
  const [desiredCareer, setDesiredCareer] = useState("");

  const { login, logout } = useAuthStore();
  const router = useRouter();

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

    try {
      const result = await postDataWithAuth("addinformation", {
        school: school,
        grade: grade,
        major: major,
        secondary_major: secondaryMajor,
        desired_major: desiredMajor,
        desired_career: desiredCareer,
      });

      // 사용자 정보 업데이트 로직 필요

      if (result.status === 401) {
        logout(); // Zustand logout 훅 호출
        alert("로그인이 만료됐습니다");
        router.push("/login"); // 로그인 페이지로 이동
        return;
      }

      const oldData = JSON.parse(sessionStorage.getItem("user"));
      const newData = { ...oldData, result };

      login(newData);

      alert("데이터가 정상적으로 등록됐습니다!");
      router.push("/");
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
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
