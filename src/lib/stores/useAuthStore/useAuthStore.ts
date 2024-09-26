import { create } from "zustand";

type TUser = {
  name: string;
  user_id: string;
  IsPayment: boolean;
  IsAdditionalUserInfo: boolean;
  page: number;
  responses?: number[];
  questions?: string[];
  result?: any;
  access_token: string;
};

type TAuthState = {
  isLoggedIn: boolean;
  login: (user: TUser) => void;
  logout: () => void;
};

// Zustand 스토어 생성
const useAuthStore = create<TAuthState>((set) => ({
  isLoggedIn: !!sessionStorage.getItem("user"), // 세션스토리지를 바탕으로 초깃값을 두어 세션 스토리지에 값이 있다면 새로고침해도 false X
  login: (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    set({ isLoggedIn: !!sessionStorage.getItem("user") });
  },
  logout: () => {
    sessionStorage.removeItem("user");
    set({ isLoggedIn: !!sessionStorage.getItem("user") });
  },
}));

export default useAuthStore;
