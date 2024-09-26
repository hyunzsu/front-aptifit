import { create } from "zustand";

// Zustand 스토어 생성
const useAuthStore = create((set) => ({
  isLoggedIn: !!sessionStorage.getItem("access_token"), // 세션스토리지를 바탕으로 초깃값을 두어 세션 스토리지에 값이 있다면 새로고침해도 false X
  login: (token: string, user: string) => {
    sessionStorage.setItem("access_token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    set({ isLoggedIn: true });
  },
  logout: () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");
    set({ isLoggedIn: false });
  },
}));

export default useAuthStore;
