/* 
useLogout (Auth X)

fetch 통신 이후 useAuthStore에 유저 데이터와 액세스 토큰을 각각 제거해
로그아웃 상태를 만들고 추가 회원정보의 유무를 파악해 페이지 이동을 수행한다.
*/

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";
import { postData } from "@/lib/services";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { removeAccessToken, removeUser } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    try {
      // 1. /logout으로 POST 통신을 수행
      const response = await postData("logout", {});
      const fetchResult = await response.json();

      if (!response.ok) {
        console.error("로그아웃 실패:", fetchResult.error);
        alert(fetchResult.error);
        return;
      }

      // 2. user, access_token 스토어 초기화 및 세션 스토리지 제거
      removeUser();
      removeAccessToken();
      alert("로그아웃이 됐습니다!");

      // 3. `/`로 이동
      router.push("/");
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLogout };
};

export default useLogout;
