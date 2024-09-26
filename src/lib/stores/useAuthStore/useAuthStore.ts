import { create } from "zustand";

// Zustand 스토어 생성
const useAuthStore = create((set) => ({
  isLoggedIn: sessionStorage.getItem("access_token"), // 로그인 상태 기본값
  login: (token: string, user: string) => {
    sessionStorage.setItem("access_token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    set({ isLoggedIn: true });
  },
  logout: () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");
    set({ isLoggedIn: "" });
  },
  checkLoginStatus: () => {
    const access_token = sessionStorage.getItem("access_token");
    set({ isLoggedIn: !!access_token }); // 토큰이 있으면 true, 없으면 false
  },
}));

export default useAuthStore;
