/*
 * submitResponses 함수
 *
 * 이 함수는 사용자의 응답을 서버에 제출하는 비동기 함수입니다.
 *
 * 주요 기능:
 * 1. 사용자 응답 데이터를 서버에 POST 요청으로 전송
 * 2. 요청 성공 여부에 따른 에러 처리
 * 3. 응답 결과를 JSON 형태로 반환
 *
 * 매개변수:
 * - data: { page: number, user_id: string, responses: any[] }
 *   page: 현재 페이지 번호
 *   user_id: 사용자 식별자
 *   responses: 사용자의 응답 데이터 배열
 *
 * 반환값:
 * - 성공 시: 서버로부터 받은 JSON 응답
 * - 실패 시: undefined (에러는 콘솔에 기록됨)
 *
 * 작업자: 김도현
 */

const submitResponses = async (data: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user_id: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responses: any;
}) => {
  const { page, user_id, responses } = data;

  try {
    // 서버에 POST 요청 보내기
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUBMIT_RESPONSES_HANLA}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page, user_id, responses }),
      }
    );

    // 응답이 성공적이지 않은 경우 에러 로깅
    if (!res.ok) {
      console.error("😢 submitResponses 성공했는데 문제가 생겼습니다!");
    }

    // 응답 데이터를 JSON 형태로 반환
    return await res.json();
  } catch (error) {
    // 요청 실패 시 에러 로깅
    console.error("😢 submitResponses 실패했습니다!");
  }
};

export default submitResponses;
