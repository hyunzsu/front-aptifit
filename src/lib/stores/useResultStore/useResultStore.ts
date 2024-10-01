import { create } from "zustand";
import { CATEGORIES, Category } from "@/lib/constants/categories";

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
  currentCarouselIndex: number;
  currentCategory: Category; // 새로 추가: 현재 선택된 카테고리
  setName: (name: string) => void;
  setMajors: (majors: Record<string, Major>) => void;
  getMajorByTitle: (title: string) => Major | undefined;
  setCurrentMajor: (majorTitle: string) => void;
  getCurrentMajor: () => Major | undefined;
  checkStore: () => string;
  setCurrentCareerIndex: (index: number) => void;
  resetCurrentCareerIndex: () => void;
  setCurrentCarouselIndex: (index: number) => void;
  resetCurrentCarouselIndex: () => void;
  setCurrentCategory: (category: Category) => void; // 새로 추가: 카테고리 설정 함수
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
const setDataToSessionStorage = (key: string, value: unknown) => {
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
    currentCarouselIndex: storedData?.currentCarouselIndex || 0,
    currentCategory: storedData?.currentCategory || CATEGORIES[0], // 새로 추가: 현재 카테고리 초기화

    setName: (name: string) => {
      set((state) => {
        if (state.name !== name) {
          setDataToSessionStorage("resultStoreData", { ...state, name });
          return { name };
        }
        return state;
      });
    },

    setMajors: (majors: Record<string, Major>) => {
      set((state) => {
        if (JSON.stringify(state.majors) !== JSON.stringify(majors)) {
          setDataToSessionStorage("resultStoreData", { ...state, majors });
          return { majors };
        }
        return state;
      });
    },

    getMajorByTitle: (title: string) => get().majors[title],

    setCurrentMajor: (majorTitle: string) => {
      set((state) => {
        if (state.currentMajor !== majorTitle) {
          setDataToSessionStorage("resultStoreData", {
            ...state,
            currentMajor: majorTitle,
            currentCareerIndex: 0,
            currentCarouselIndex: 0,
            currentCategory: CATEGORIES[0], // 새로 추가: 카테고리 초기화
          });
          return {
            currentMajor: majorTitle,
            currentCareerIndex: 0,
            currentCarouselIndex: 0,
            currentCategory: CATEGORIES[0], // 새로 추가: 상태 업데이트에도 카테고리 초기화 추가
          };
        }
        return state;
      });
    },

    getCurrentMajor: () => get().majors[get().currentMajor],

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

    // 새로 추가: 현재 카테고리를 설정하는 함수
    setCurrentCategory: (category: Category) => {
      set((state) => {
        if (state.currentCategory !== category) {
          setDataToSessionStorage("resultStoreData", {
            ...state,
            currentCategory: category,
          });
          return { currentCategory: category };
        }
        return state;
      });
    },

    checkStore: () => {
      const state = get();
      return `이름: ${state.name}, 학과들: ${Object.keys(state.majors).join(
        ", "
      )}, 현재 선택된 학과: ${state.currentMajor}, 현재 직업 인덱스: ${
        state.currentCareerIndex
      }, 현재 캐러셀 인덱스: ${state.currentCarouselIndex}, 현재 카테고리: ${
        state.currentCategory
      }`;
    },
  };
});

export default useResultStore;
