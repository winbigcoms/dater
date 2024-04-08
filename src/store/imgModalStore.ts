import { create } from "zustand";

export interface ImgModalStore {
  imgs: { uri: string }[];
  order: number;
  visible: boolean;
  onCloseImgModal: () => void;
  onOpenImgModal: ({
    imgs,
    order,
  }: {
    imgs: { uri: string }[];
    order: number;
  }) => void;
}

const useImgModalStore = create<ImgModalStore>((set) => ({
  imgs: [],
  order: 0,
  visible: false,
  onCloseImgModal: () =>
    set(() => ({
      imgs: [],
      order: 0,
      visible: false,
    })),
  onOpenImgModal: ({
    imgs,
    order,
  }: {
    imgs: { uri: string }[];
    order: number;
  }) =>
    set(() => ({
      imgs,
      order,
      visible: true,
    })),
}));

export default useImgModalStore;
