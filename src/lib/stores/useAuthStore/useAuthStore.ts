import { create } from "zustand";
import {
  getDataFromSessionStorage,
  saveDataToSessionStorage,
} from "@/lib/utils";

/* useAuthStore - 사용자, 액세스 토큰 데이터를 전역으로 관리하는 상태변수 */
const useAuthStore = create((set) => ({
  // 1-1. user 스토어
  user: getDataFromSessionStorage("user"),
  // 1-2. user 스토어 업데이트
  setUser: (userData: object) => {
    saveDataToSessionStorage("user", userData);
    set({
      user: { ...userData },
    });
  },
  // 1-3. user 스토어 객체 합성
  updateUser: (newData: object) => {
    const oldData = getDataFromSessionStorage("user");
    const updatedUser = { ...oldData, ...newData };
    saveDataToSessionStorage("user", updatedUser);
    set({
      user: updatedUser,
    });
  },
  // 1-4. user 스토어 초기화
  removeUser: () => {
    sessionStorage.removeItem("user");
    set({
      user: getDataFromSessionStorage("user"),
    });
  },
  // 2-1. access_token 스토어
  access_token: getDataFromSessionStorage("access_token"),
  // 2-2. access_token 스토어 업데이트
  setAccessToken: (tokenData: string) => {
    saveDataToSessionStorage("access_token", tokenData);
    set({ access_token: tokenData });
  },
  // 2-3. access_token 스토어 초기화
  removeAccessToken: () => {
    sessionStorage.removeItem("access_token");
    set({ access_token: getDataFromSessionStorage("user") });
  },
}));

export default useAuthStore;
