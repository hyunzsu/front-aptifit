import { create } from "zustand";

// type TUser = {
//   name: string;
//   user_id: string;
//   IsPayment: boolean;
//   IsAdditionalUserInfo: boolean;
//   page: number;
//   responses?: number[];
//   questions?: string[];
//   result?: any;
//   access_token: string;
// };

// type TAuthState = {
//   isLoggedIn: boolean;
//   login: (user: TUser) => void;
//   logout: () => void;
// };

// Zustand 스토어 생성
const useAuthStore = create((set) => ({
  user: JSON.parse(sessionStorage.getItem("user")),
  setUser: (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    set({
      user: { ...userData },
    });
  },
  removeUser: () => {
    sessionStorage.removeItem("user");
    set({
      user: JSON.parse(sessionStorage.getItem("user")),
    });
  },
  access_token: JSON.parse(sessionStorage.getItem("access_token")),
  setAccessToken: (tokenData) => {
    sessionStorage.setItem("access_token", JSON.stringify(tokenData));
    set({ access_token: tokenData });
  },
  removeAccessToken: () => {
    sessionStorage.removeItem("access_token");
    set({ access_token: JSON.parse(sessionStorage.getItem("access_token")) });
  },
}));

export default useAuthStore;
