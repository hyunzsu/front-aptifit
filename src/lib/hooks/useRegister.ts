"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";
import { postData } from "@/lib/services";

/* 
useRegister(Auth X)

fetch 통신 이후 useAuthStore에 유저 데이터와 액세스 토큰을 각각 저장해
로그인 상태를 만들고 추가 회원정보 페이지 이동을 수행한다.
*/

const useRegister = () => {
  const { setUser, setAccessToken } = useAuthStore();
  const router = useRouter();

  const handleRegister = async ({ name, phone, password, email }) => {
    try {
      // 1. /register로 POST 통신을 수행
      const response = await postData("register", {
        name,
        phone,
        email,
        password,
      });

      // 2. fetchResult에서 데이터 설렉션 진행
      const fetchResult = await response.json();
      const { access_token, ...rest } = fetchResult;

      if (!response.ok) {
        console.error("회원가입 실패:", fetchResult.error);
        alert(fetchResult.error);
        return;
      }

      // 3. user, access_token 스토어 업데이트 및 세션 스토리지 저장
      setUser(rest);
      setAccessToken(access_token);

      // 4. `/add-user-info`로 이동
      router.push("/add-user-info");
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return { handleRegister };
};

export default useRegister;
