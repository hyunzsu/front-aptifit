const postData = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    const fetchResult = await response.json();

    if (response.ok) {
      // 응답에 성공하면 결과값을 반환
      return fetchResult;
    } else {
      // 응답에 실패하면 에러 메세지 반환
      console.error("에러 발생:", fetchResult.error);
      alert(fetchResult.error);
    }
  } catch (error) {
    console.error("데이터 전송 중 오류가 발생했습니다:", error);
  }
};

export default postData;
