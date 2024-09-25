import { create } from "zustand";

// Zustand 스토어 생성
const useAuthStore = create((set) => ({
  isLoggedIn: false, // 로그인 상태 기본값
  login: (token: string) => {
    sessionStorage.setItem("access_token", token);
    set({ isLoggedIn: true });
  },
  logout: () => {
    sessionStorage.removeItem("access_token");
    set({ isLoggedIn: false });
  },
  checkLoginStatus: () => {
    const accessToken = sessionStorage.getItem("access_token");
    set({ isLoggedIn: !!accessToken }); // 토큰이 있으면 true, 없으면 false
  },
}));

export default useAuthStore;
