import { create } from "zustand";

export interface UserLoginData {
  userId: string;
  name: string;
  main_event: "";
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
  main_event: "",
  setUserId: (uuid: string) => {
    set(() => ({ uuid }));
  },
  setUserLogin: (loginData: UserLoginData) => {
    set((data) => ({ ...data, ...loginData }));
  },
}));

export default useUserStore;
