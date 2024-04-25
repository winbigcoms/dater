import { create } from "zustand";

export interface UserLoginData {
  userId: string;
  name: string;
  mainEvent: "";
}
export interface UserInfo extends UserLoginData {
  uuid: string;
  setUserId: (uuid: string) => void;
  setUserLogin: (loginData: UserLoginData) => void;
}

const useUserStore = create<UserInfo>((set) => ({
  uuid: "",
  userId: "",
  name: "",
  mainEvent: "",
  setUserId: (uuid: string) => {
    set(() => ({ uuid }));
  },
  setUserLogin: (loginData: UserLoginData) => {
    set((data) => ({ ...data, ...loginData }));
  },
}));

export default useUserStore;
