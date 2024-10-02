import { create } from "zustand";
import {
  getDataFromSessionStorage,
  saveDataToSessionStorage,
} from "@/lib/utils";

// type TUser = {
//   name: string;
//   user_id: string;
//   IsPayment: boolean;
//   IsAdditionalUserInfo: boolean;
//   page: number;
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
  user: getDataFromSessionStorage("user"),
  setUser: (userData) => {
    saveDataToSessionStorage("user", userData);
    set({
      user: { ...userData },
    });
  },
  updateUser: (newData) => {
    const oldData = getDataFromSessionStorage("user");
    const updatedUser = { ...oldData, ...newData };
    saveDataToSessionStorage("user", updatedUser);
    set({
      user: updatedUser,
    });
  },
  removeUser: () => {
    sessionStorage.removeItem("user");
    set({
      user: getDataFromSessionStorage("user"),
    });
  },
  access_token: getDataFromSessionStorage("access_token"),
  setAccessToken: (tokenData) => {
    saveDataToSessionStorage("access_token", tokenData);
    set({ access_token: tokenData });
  },
  removeAccessToken: () => {
    sessionStorage.removeItem("access_token");
    set({ access_token: getDataFromSessionStorage("user") });
  },
}));

export default useAuthStore;
