const postDataWithAuth = async (endpoint: string, data: any) => {
  const access_token = JSON.parse(sessionStorage.getItem("user")).access_token;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    const fetchResult = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        return { status: 401, error: "세션만료" };
      } else {
        console.error("에러 발생:", fetchResult.error);
        alert(fetchResult.error);
      }
    }

    return fetchResult;
  } catch (error) {
    console.error("데이터 전송 중 오류가 발생했습니다:", error);
  }
};

export default postDataWithAuth;
