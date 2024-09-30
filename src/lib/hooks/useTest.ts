"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";
import { postDataWithAuth } from "@/lib/services";
import { saveDataToSessionStorage } from "@/lib/utils";

/* 
useTest (Auth O)

fetch 통신 이후 useAuthStore에 유저 데이터와 액세스 토큰을 각각 저장해
로그인 상태를 만들고 추가 회원정보 페이지 이동을 수행한다.
*/

const useTest = () => {
  const { user, access_token, removeUser, removeAccessToken } = useAuthStore();
  const router = useRouter();

  /* 1. 테스트 시작 */
  const handleInitializeTest = async () => {
    try {
      // 1. /submit_responses_univeristy로 POST 통신을 수행
      const response = await postDataWithAuth(
        "submit_responses_university",
        access_token,
        { user_id: user.user_id, page: user.page }
      );

      // 2. fetchResult에서 데이터 설렉션 진행
      const fetchResult = await response.json();
      const { questions, responses, page, user_id } = fetchResult;

      // 에러 핸들링
      if (!response.ok) {
        // 세션만료 에러면 로그인 페이지로 이동
        if (response.status === 401) {
          removeUser();
          removeAccessToken();
          alert("로그인이 만료되어 재로그인이 필요합니다!");
          router.push("/login");
          return;
        }
        // 그 외의 에러
        console.error("로그인 실패:", fetchResult.error);
        alert(fetchResult.error);
        return;
      }

      // 3. 세션스토리지에 데이터 저장
      saveDataToSessionStorage(`aptifit${page}`, {
        questions: questions,
        responses: responses,
        page: page,
        user_id: user_id,
      });

      // 4. `/test/${page}`로 이동
      alert("테스트를 시작합니다!");
      router.push(`test/${page}`);
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return { handleInitializeTest };
};

export default useTest;
