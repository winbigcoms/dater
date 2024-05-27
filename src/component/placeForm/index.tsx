import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as imagePicker from "expo-image-picker";
import { COLOR_PALETTE } from "style/color";
import { useState } from "react";
import { post_promise, upload_imgs } from "api/event";
import useUserStore from "store/userStore";
import { CustomTextInput } from "component/form";
import { PLACE_INFO, UPLOAD_PLACE_INFO } from "types/place";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { useEventStore } from "store/eventStore";

export const PlaceForm = () => {
  const { control, setFocus, handleSubmit } = useForm();
  const { id: eventId } = useEventStore();
  const { uuid } = useUserStore();
  const navigation = useNavigation();
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
        base64: true,
      });
      if (imgs.canceled) return;

      setImage((state) => [...state, ...imgs.assets]);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const { title, memo, link } = data;
    const s3_urls = await upload_imgs(images, uuid.split("-")[0]);

    const uploadData: UPLOAD_PLACE_INFO = {
      title,
      memo,
      imgs: s3_urls,
      link,
      isVisited: false,
      tag: "travel",
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      event_id: eventId,
    };

    await post_promise(uploadData);
    navigation.navigate("place" as never);
  };

  return (
    <View style={PlaceFormStyle.container}>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, ref } }) => (
          <CustomTextInput
            value={value}
            controllerRef={ref}
            onSubmitEditing={() => {
              setFocus("link");
            }}
            titleText="목적지"
            placeholder="어디로 갈까요?"
            returnKeyType="next"
            onChangeText={(value) => onChange(value)}
          />
        )}
      />
      <Controller
        name="link"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, ref } }) => (
          <CustomTextInput
            placeholder="링크가 있나요?"
            returnKeyType="next"
            onSubmitEditing={() => {
              setFocus("memo");
            }}
            controllerRef={ref}
            titleText="링크"
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
      />
      <Controller
        name="memo"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, ref } }) => (
          <CustomTextInput
            controllerRef={ref}
            placeholder="메모할 내용이 있나요?"
            titleText="메모"
            onChangeText={(value) => onChange(value)}
            value={value}
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
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text
          style={{
            textAlign: "right",
          }}
        >
          언젠가 같이 하기!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const PlaceFormStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR_PALETTE.pink,
    flex: 1,
    padding: 20,
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
