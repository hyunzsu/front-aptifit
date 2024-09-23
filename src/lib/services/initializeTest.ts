/*
 * initializeTest 함수
 *
 * 이 함수는 테스트를 초기화하는 비동기 함수입니다.
 * 세션 스토리지에서 사용자 데이터를 가져와 서버에 전송하여 테스트를 시작합니다.
 *
 * 주요 기능:
 * 1. 세션 스토리지에서 사용자 데이터 추출
 * 2. 사용자 데이터를 서버에 POST 요청으로 전송
 * 3. 요청 성공 여부에 따른 에러 처리
 * 4. 초기화 결과를 JSON 형태로 반환
 *
 * 반환값:
 * - 성공 시: 서버로부터 받은 JSON 응답 (테스트 초기화 정보)
 * - 실패 시: undefined (에러는 콘솔에 기록됨)
 *
 * 작업자: 김도현
 */

const initializeTest = async () => {
  // 세션 스토리지에서 사용자 데이터 가져오기
  const userData = sessionStorage.getItem("user");

  try {
    // 서버에 POST 요청 보내기
    const res = await fetch(`${process.env.NEXT_PUBLIC_INITIALIZE_HANLA}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userData,
    });

    // 응답이 성공적이지 않은 경우 에러 로깅
    if (!res.ok) {
      console.error("😢 initialize는 성공했는데 문제가 생겼습니다!");
    }

    // 응답 데이터를 JSON 형태로 반환
    return await res.json();
  } catch (error) {
    // 요청 실패 시 에러 로깅
    console.error("😢 initialize를 실패했습니다!");
  }
};

export default initializeTest;
