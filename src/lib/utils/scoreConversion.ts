/**
 * 7점 만점 점수를 100점 만점으로 변환하는 함수
 *
 * @param score - 변환할 점수 (0-7 사이의 숫자)
 * @returns 100점 만점으로 변환된 정수 점수
 *
 * @example
 * convertTo100Scale(4) // returns 57
 * convertTo100Scale(7) // returns 100
 * convertTo100Scale(1) // returns 14
 *
 * @description
 * 이 함수는 7점 만점 시스템의 점수를 100점 만점 시스템으로 변환합니다.
 * 변환 과정에서 소수점이 발생할 경우 반올림하여 정수로 반환합니다.
 * 백엔드에서 받아온 7점 만점 데이터를 프론트엔드에서 표시할 때 사용합니다.
 */

export const convertTo100Scale = (score: number): number => {
  const convertedScore = (score / 7) * 100;
  return Math.round(convertedScore); // 정수로 반올림
};
