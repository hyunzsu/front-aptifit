import { create } from "zustand";

// 직업 세부 정보 타입
type JobDetail = {
  [key: string]: string;
};

// 직업 정보 타입
type Career = {
  jobTitle: string;
  summary: string;
  details: JobDetail[];
};

// 결과 세부 정보 타입
type ResultDetail = {
  field: string;
  score: number;
  content: string;
};

// 결과 카테고리 타입
type ResultCategory = {
  details: ResultDetail[];
  descriptions: string[];
};

// 전체 결과 타입
type Result = {
  strength: ResultCategory;
  value: ResultCategory;
  characteristic: ResultCategory;
  knowledge: ResultCategory;
  interests: ResultCategory;
};

// 학과 정보 타입
type Major = {
  major_title: string;
  career: Career[];
  result: Result;
};

// 결과 저장소 상태 타입
type ResultState = {
  name: string;
  majors: Record<string, Major>;
  currentMajor: string;
  currentCareerIndex: number;
  currentCarouselIndex: number; // 새로 추가: 현재 캐러셀 인덱스
  setName: (name: string) => void;
  setMajors: (majors: Record<string, Major>) => void;
  getMajorByTitle: (title: string) => Major | undefined;
  setCurrentMajor: (majorTitle: string) => void;
  getCurrentMajor: () => Major | undefined;
  checkStore: () => string;
  setCurrentCareerIndex: (index: number) => void;
  resetCurrentCareerIndex: () => void;
  setCurrentCarouselIndex: (index: number) => void; // 새로 추가: 캐러셀 인덱스 설정 함수
  resetCurrentCarouselIndex: () => void; // 새로 추가: 캐러셀 인덱스 초기화 함수
};

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

/**
 * 세션 스토리지에 데이터를 저장하는 함수
 * @param key 세션 스토리지 키
 * @param value 저장할 데이터
 */
const setDataToSessionStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * Zustand를 사용하여 결과 저장소를 생성합니다.
 */
const useResultStore = create<ResultState>((set, get) => {
  // 세션 스토리지에서 데이터 불러오기
  const storedData = getDataFromSessionStorage("resultStoreData");

  return {
    // 초기 상태 설정
    name: storedData?.name || "",
    majors: storedData?.majors || {},
    currentMajor: storedData?.currentMajor || "",
    currentCareerIndex: storedData?.currentCareerIndex || 0,
    currentCarouselIndex: storedData?.currentCarouselIndex || 0, // 새로 추가: 현재 캐러셀 인덱스

    /**
     * 사용자 이름을 설정하는 함수
     * @param name 설정할 이름
     */
    setName: (name: string) => {
      set((state) => {
        if (state.name !== name) {
          setDataToSessionStorage("resultStoreData", { ...state, name });
          return { name };
        }
        return state;
      });
    },

    /**
     * 학과 정보를 설정하는 함수
     * @param majors 설정할 학과 정보
     */
    setMajors: (majors: Record<string, Major>) => {
      set((state) => {
        if (JSON.stringify(state.majors) !== JSON.stringify(majors)) {
          setDataToSessionStorage("resultStoreData", { ...state, majors });
          return { majors };
        }
        return state;
      });
    },

    /**
     * 학과 이름으로 학과 정보를 가져오는 함수
     * @param title 학과 이름
     * @returns 해당 학과 정보 또는 undefined
     */
    getMajorByTitle: (title: string) => get().majors[title],

    /**
     * 현재 선택된 학과를 설정하는 함수
     * @param majorTitle 설정할 학과 이름
     */
    setCurrentMajor: (majorTitle: string) => {
      set((state) => {
        if (state.currentMajor !== majorTitle) {
          setDataToSessionStorage("resultStoreData", {
            ...state,
            currentMajor: majorTitle,
            currentCareerIndex: 0,
            currentCarouselIndex: 0, // 새로운 학과 선택 시 캐러셀 인덱스도 0으로 초기화
          });
          return {
            currentMajor: majorTitle,
            currentCareerIndex: 0,
            currentCarouselIndex: 0, // 상태 업데이트에도 캐러셀 인덱스 초기화 추가
          };
        }
        return state;
      });
    },

    /**
     * 현재 선택된 학과 정보를 가져오는 함수
     * @returns 현재 선택된 학과 정보
     */
    getCurrentMajor: () => get().majors[get().currentMajor],

    /**
     * 현재 선택된 직업 인덱스를 설정하는 함수
     * @param index 설정할 인덱스
     */
    setCurrentCareerIndex: (index: number) => {
      set((state) => {
        if (state.currentCareerIndex !== index) {
          setDataToSessionStorage("resultStoreData", {
            ...state,
            currentCareerIndex: index,
          });
          return { currentCareerIndex: index };
        }
        return state;
      });
    },

    /**
     * 현재 선택된 직업 인덱스를 0으로 초기화하는 함수
     */
    resetCurrentCareerIndex: () => {
      set((state) => {
        if (state.currentCareerIndex !== 0) {
          setDataToSessionStorage("resultStoreData", {
            ...state,
            currentCareerIndex: 0,
          });
          return { currentCareerIndex: 0 };
        }
        return state;
      });
    },

    /**
     * 현재 캐러셀 인덱스를 설정하는 함수
     * @param index 설정할 인덱스
     */
    setCurrentCarouselIndex: (index: number) => {
      set((state) => {
        if (state.currentCarouselIndex !== index) {
          setDataToSessionStorage("resultStoreData", {
            ...state,
            currentCarouselIndex: index,
          });
          return { currentCarouselIndex: index };
        }
        return state;
      });
    },

    /**
     * 현재 캐러셀 인덱스를 0으로 초기화하는 함수
     */
    resetCurrentCarouselIndex: () => {
      set((state) => {
        if (state.currentCarouselIndex !== 0) {
          setDataToSessionStorage("resultStoreData", {
            ...state,
            currentCarouselIndex: 0,
          });
          return { currentCarouselIndex: 0 };
        }
        return state;
      });
    },

    /**
     * 스토어의 현재 상태를 확인하는 함수 (디버깅용)
     * @returns 현재 스토어 상태 요약 문자열
     */
    checkStore: () => {
      const state = get();
      console.log("현재 스토어 상태:", state);
      return `이름: ${state.name}, 학과들: ${Object.keys(state.majors).join(
        ", "
      )}, 현재 선택된 학과: ${state.currentMajor}, 현재 직업 인덱스: ${
        state.currentCareerIndex
      }, 현재 캐러셀 인덱스: ${state.currentCarouselIndex}`;
    },
  };
});

export default useResultStore;
