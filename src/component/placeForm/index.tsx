import { Controller, useForm } from "react-hook-form";
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as imagePicker from "expo-image-picker";
import { COLOR_PALETTE } from "style/color";

export const PlaceForm = () => {
  const { control, setFocus } = useForm();

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
      const imgs = await imagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        selectionLimit: 3,
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });
      if (imgs.canceled) return;
      console.log(imgs);
    } catch (err) {
      console.log(err);
    }
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
        <Text>이미지</Text>
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
  inputBox: {
    borderColor: COLOR_PALETTE.gray,
    borderWidth: 1,
    paddingVertical: 10,
    paddingLeft: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
});
