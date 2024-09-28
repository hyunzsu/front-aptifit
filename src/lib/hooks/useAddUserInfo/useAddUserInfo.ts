"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";

/* 
useAddUserInfo

fetch 통신 이후 useAuthStore에 유저 데이터와 액세스 토큰을 각각 저장해
로그인 상태를 만들고 추가 회원정보 페이지 이동을 수행한다.
*/

const useAddUserInfo = () => {
  const { user, updateUser, removeUser, access_token } = useAuthStore();
  const router = useRouter();

  const handleAddUserInfo = async (
    school,
    grade,
    major,
    secondary_major,
    desired_major,
    desired_career
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/addinformation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            user_id: user.user_id,
            school: school,
            grade: grade,
            major: major,
            secondary_major: secondary_major,
            desired_major: desired_major,
            desired_career: desired_career,
          }),
        }
      );

      const fetchResult = await response.json();

      if (!response.ok) {
        if (fetchResult.status === 401) {
          removeUser();
          alert("로그인이 만료됐습니다");
          router.push("/login"); // 로그인 페이지로 이동
          return;
        }

        console.error("에러 발생:", fetchResult.error);
        alert(fetchResult.error);
        return;
      }
      console.log(fetchResult);
      updateUser({ IsAdditionalUserInfo: true });
      alert("회원 정보 등록에 성공했습니다!");
      router.push("/");
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return { handleAddUserInfo };
};

export default useAddUserInfo;
