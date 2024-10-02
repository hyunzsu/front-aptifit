/* 
useResult (Auth O)

fetch 통신 이후 결과지 데이터를 불러와 세션 스토리지에 저장한다
*/

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, useResultStore } from "@/lib/stores";
import { postDataWithAuth } from "@/lib/services";
import { saveDataToSessionStorage } from "@/lib/utils";

const useResult = () => {
  const [loading, setLoading] = useState(false);
  const { user, access_token, removeUser, removeAccessToken } = useAuthStore();
  const { setName, setMajors, setCurrentMajor } = useResultStore();
  const router = useRouter();

  const handleInitializeResult = async () => {
    setLoading(true);

    try {
      // 1. /submit_responses_univeristy로 POST 통신을 수행
      const response = await postDataWithAuth(
        "submit_responses_university",
        access_token,
        { user_id: user.user_id, page: user.page }
      );

      // 2. fetchResult에서 데이터 설렉션 진행
      const fetchResult = await response.json();
      const { name, page, user_id, major1, major2, major3, major4, major5 } =
        fetchResult;

      // 에러 핸들링
      if (!response.ok) {
        // 세션만료 에러면 로그인 페이지로 이동
        if (response.status === 401) {
          removeUser();
          removeAccessToken();
          alert("로그인이 만료되어 재로그인이 필요합니다!");
          router.push("/login");
        } else {
          // 그 외의 에러
          console.error("로그인 실패:", fetchResult.error);
          alert(fetchResult.error);
        }
        return;
      }

      // 3-1. Zustand store에 데이터 저장
      const majorsData = {
        [major1.major_title]: major1,
        [major2.major_title]: major2,
        [major3.major_title]: major3,
        [major4.major_title]: major4,
        [major5.major_title]: major5,
      };
      setName(name);
      setMajors(majorsData);
      setCurrentMajor(major1.major_title);

      // 3-2. 세션스토리지에 데이터 저장
      // ResultStore와 동일한 형식으로 저장
      saveDataToSessionStorage("resultStoreData", {
        name,
        majors: majorsData,
        currentMajor: major1.major_title,
        page: page,
        user_id: user_id,
      });

      // 4. `/result`로 이동
      alert("결과지로 이동합니다!");
      router.push(`/result`);
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleInitializeResult };
};

export default useResult;
