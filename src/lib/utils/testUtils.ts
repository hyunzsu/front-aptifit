/**
 * 테스트 페이지 관련 유틸리티 함수들
 *
 * 이 파일은 테스트 페이지에서 사용되는 여러 유틸리티 함수들을 포함합니다.
 * 데이터 로드, 저장, 폼 유효성 검사 등의 기능을 제공합니다.
 *
 * 작업자 : 김도현
 */

/**
 * 세션 스토리지에서 테스트 데이터를 불러옵니다.
 * @param pageId 현재 페이지 ID
 * @returns 저장된 데이터 객체 또는 null
 */
export const loadTestData = (pageId: string | string[]) => {
  const savedData = sessionStorage.getItem(`aptifit${pageId}`);
  if (savedData) {
    return JSON.parse(savedData);
  }
  return null;
};

/**
 * 테스트 데이터를 세션 스토리지에 저장합니다.
 * @param pageId 저장할 페이지 ID
 * @param data 저장할 데이터
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveTestData = (pageId: string, data: any) => {
  sessionStorage.setItem(`aptifit${pageId}`, JSON.stringify(data));
};

/**
 * 폼의 유효성을 검사합니다.
 * 모든 문제에 답변했는지 확인합니다.
 * @param pageId 현재 페이지 ID
 * @returns 모든 문제에 답변했으면 true, 그렇지 않으면 false
 */
export const formValidation = (pageId: string | string[]) => {
  const savedData = loadTestData(pageId);
  if (savedData) {
    const { responses } = savedData;
    return !responses.includes(0); // 0은 답변하지 않은 문제를 나타냅니다
  }
  return false;
};
