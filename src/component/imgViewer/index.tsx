import ImageView from "react-native-image-viewing";
import useImgModalStore from "store/imgModalStore";

export const ImgViewer = () => {
  const { imgs, visible, order, onCloseImgModal } = useImgModalStore();

  return (
    <ImageView
      images={imgs}
      imageIndex={order}
      visible={visible}
      onRequestClose={onCloseImgModal}
    />
  );
};
