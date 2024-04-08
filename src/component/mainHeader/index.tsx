import { START_DATE } from "const";
import { Image, StyleSheet, Text, View } from "react-native";
import { get_past_Date } from "utill/date";

export const MainHeader = () => {
  return (
    <View style={MainContentsHeaderStyle.contentsHeader}>
      <Image
        style={{
          flex: 1,
        }}
        source={{
          uri: "https://baek-log-img.s3.ap-northeast-2.amazonaws.com/dater/image+1+1.png",
        }}
        resizeMode="cover"
      />
      <View style={MainContentsHeaderStyle.dateInfo}>
        <Text style={MainContentsHeaderStyle.dateInfoText}>
          우리벌써!: {get_past_Date(START_DATE)}일
        </Text>
        <Text style={MainContentsHeaderStyle.dateInfoText}>
          시작일: {START_DATE}
        </Text>
      </View>
    </View>
  );
};

const MainContentsHeaderStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contentsHeader: {
    flex: 2,
  },
  dateInfo: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  dateInfoText: {
    color: "#fff",
  },
});
