/* 
useLogin (Auth O)

fetch 통신 이후 useAuthStore에 유저 데이터와 액세스 토큰을 각각 저장해
로그인 상태를 만들고 추가 회원정보의 유무를 파악해 페이지 이동을 수행한다.
*/

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";
import { postData } from "@/lib/services";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser, setAccessToken } = useAuthStore();

  const router = useRouter();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      // 1. /login으로 POST 통신을 수행
      const response = await postData("login", {
        email,
        password,
      });

      // 2. fetchResult에서 데이터 설렉션 진행
      const fetchResult = await response.json();
      const { access_token, ...rest } = fetchResult;

      if (!response.ok) {
        console.error("로그인 실패:", fetchResult.error);
        alert(fetchResult.error);
        return;
      }

      // 3. user, access_token 스토어 업데이트 및 세션 스토리지 저장
      setUser(rest);
      setAccessToken(access_token);

      // 4. 추가정보X일 시에 `/add-user-info`로 이동 OR `/`로 이동
      if (!rest.IsAdditionalUserInfo) {
        alert("추가정보 입력이 필요합니다!");
        router.push("/add-user-info");
      } else {
        alert("로그인 성공!");
        router.push("/");
      }
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLogin };
};

export default useLogin;
