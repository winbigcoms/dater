import { Controller, Form, useForm } from "react-hook-form";
import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as imagePicker from "expo-image-picker";
import { COLOR_PALETTE } from "style/color";
import { useState } from "react";
import { upload_imgs } from "api/event";
import useUserStore from "store/userStore";

export const PlaceForm = () => {
  const { control, setFocus } = useForm();
  const { uuid } = useUserStore();
  const [images, setImage] = useState<imagePicker.ImagePickerAsset[]>([]);

  const onRemoveImage = (idx: number) => {
    setImage((state) => state.filter((_, Idx) => idx !== Idx));
  };

  const checkGallery = async () => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    ]);
    if (granted["android.permission.READ_MEDIA_IMAGES"] === "granted") {
      console.log("모든 권한 획득");
    } else {
      console.log("거절된 권한있음");
    }
  };

  const onSelectImage = async () => {
    try {
      await checkGallery();
      const maxImg = 3 - images.length;
      const imgs = await imagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        selectionLimit: maxImg,
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });
      if (imgs.canceled) return;
      setImage((state) => [...state, ...imgs.assets]);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async () => {
    await upload_imgs(images, uuid);

    console.log("test");
  };

  return (
    <View style={PlaceFormStyle.container}>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="같이 갈곳이 어딘가요?"
            returnKeyType="next"
            onSubmitEditing={() => {
              setFocus("link");
            }}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={PlaceFormStyle.inputBox}
          />
        )}
      />
      <Controller
        name="link"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, ref } }) => (
          <TextInput
            ref={ref}
            placeholder="링크가 있나요?"
            returnKeyType="next"
            onSubmitEditing={() => {
              setFocus("memo");
            }}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={PlaceFormStyle.inputBox}
          />
        )}
      />
      <Controller
        name="memo"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, ref } }) => (
          <TextInput
            ref={ref}
            placeholder="메모할 내용이 있나요?"
            onChangeText={(value) => onChange(value)}
            value={value}
            style={PlaceFormStyle.inputBox}
          />
        )}
      />
      <TouchableOpacity onPress={onSelectImage}>
        <Text>이미지 추가하기</Text>
      </TouchableOpacity>
      <View style={PlaceFormStyle.imgContainer}>
        {images.length !== 0 &&
          images.map((img, idx) => (
            <View key={img.fileName}>
              <Image style={PlaceFormStyle.img} source={{ uri: img.uri }} />
              <View style={PlaceFormStyle.imgRemoveBtn}>
                <TouchableOpacity onPress={() => onRemoveImage(idx)}>
                  <Text style={PlaceFormStyle.imgRemoveBtnText}>x</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        {images.length < 3 && (
          <TouchableOpacity onPress={onSelectImage}>
            <View>
              <View style={PlaceFormStyle.imgAddBox}>
                <Text style={PlaceFormStyle.imgAddText}>+</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const PlaceFormStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR_PALETTE.pink,
    flex: 1,
    padding: 20,
  },
  inputBox: {
    borderColor: COLOR_PALETTE.gray,
    borderWidth: 1,
    paddingVertical: 10,
    paddingLeft: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  imgContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  imgBox: {
    position: "relative",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  imgRemoveBtn: {
    position: "absolute",
    top: 3,
    right: 3,
    backgroundColor: "#333",
    borderRadius: 15,
    width: 26,
    height: 26,
    flex: 1,
    alignItems: "center",
  },
  imgRemoveBtnText: {
    color: "#ccc",
    fontSize: 16,
  },
  imgAddBox: {
    width: 100,
    height: 100,
    borderColor: "#cfcfcf",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imgAddText: {
    fontSize: 25,
  },
});
