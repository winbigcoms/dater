import { create } from "zustand";

export interface UserId {
  uuid: string;
  setUserId: (uuid: string) => void;
}

const useUserStore = create<UserId>((set) => ({
  uuid: "",
  setUserId: (uuid: string) => {
    set(() => ({ uuid }));
  },
}));

export default useUserStore;
