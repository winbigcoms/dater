import { create } from "zustand";

export interface EVENT_DATA {
  id: string;
  event_title: string;
  date: string;
  opponent_name: string;
  owner: string;
}

export interface EVENT extends EVENT_DATA {
  setEvent: (event: EVENT_DATA) => void;
}

export const useEventStore = create<EVENT>((set) => ({
  id: "",
  event_title: "",
  date: "",
  opponent_name: "",
  owner: "",
  setEvent: (event) => {
    set(() => event);
  },
}));
