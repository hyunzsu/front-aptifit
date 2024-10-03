"use client";
import { useEffect } from "react";
import { Section01, Section02, Section03, Section04 } from "./sections";
import s from "./ResultPage.module.css";
import { useResultStore } from "@/lib/stores";
import { Navigation } from "@/components";

/**
 * 세션 스토리지에서 데이터를 가져오는 함수
 * @param key 세션 스토리지 키
 * @returns 파싱된 데이터 또는 null
 */
const getDataFromSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export default function ResultPage() {
  const { setName, setMajors, setCurrentMajor, majors, currentMajor, name } =
    useResultStore();

  /**
   * 컴포넌트 마운트 시 세션 스토리지에서 데이터를 불러와 스토어를 초기화합니다.
   * 데이터가 없거나 불완전한 경우 적절히 처리합니다.
   */
  useEffect(() => {
    const storedData = getDataFromSessionStorage("resultStoreData");
    if (storedData) {
      const {
        name: storedName,
        majors: storedMajors,
        currentMajor: storedCurrentMajor,
      } = storedData;
      // 스토어 업데이트 (변경된 경우에만)
      if (storedName) setName(storedName);
      if (storedMajors && Object.keys(storedMajors).length > 0)
        setMajors(storedMajors);
      if (storedCurrentMajor) setCurrentMajor(storedCurrentMajor);
    } else if (Object.keys(majors).length > 0 && !currentMajor) {
      // 세션 데이터가 없지만 majors가 있는 경우, 첫 번째 학과를 현재 학과로 설정
      setCurrentMajor(Object.keys(majors)[0]);
    }
  }, [setName, setMajors, setCurrentMajor, majors, currentMajor]);

  return (
    <>
      <Navigation />
      <main className={s.ResultPage}>
        <Section01 name={name} />
        <Section02 name={name} />
        <Section03 name={name} />
        <Section04 name={name} />
      </main>
    </>
  );
}
