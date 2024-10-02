/* 
useAddUserInfo

fetch 통신 이후 useAuthStore에 유저 데이터와 액세스 토큰을 각각 저장해
로그인 상태를 만들고 추가 회원정보 페이지 이동을 수행한다.
*/

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";
import { postDataWithAuth } from "@/lib/services";

const useAddUserInfo = () => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser, removeUser, access_token, removeAccessToken } =
    useAuthStore();

  const router = useRouter();

  const handleAddUserInfo = async (
    school,
    grade,
    major,
    secondary_major,
    desired_major,
    desired_career
  ) => {
    setLoading(true);

    try {
      // 1. /submit_responses_univeristy로 POST 통신을 수행
      const response = await postDataWithAuth("addinformation", access_token, {
        user_id: user.user_id,
        school: school,
        grade: grade,
        major: major,
        secondary_major: secondary_major,
        desired_major: desired_major,
        desired_career: desired_career,
      });

      const fetchResult = await response.json();

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

      // 3. user 스토어, 세션 스토리지의 IsAdditionalUserInfo 업데이트 후 `/`로 이동
      updateUser({ IsAdditionalUserInfo: true });
      alert("회원 정보 등록에 성공했습니다!");
      router.push("/");
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleAddUserInfo };
};

export default useAddUserInfo;
