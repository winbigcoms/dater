import { StyleSheet, Text, View } from "react-native";
import { START_DATE } from "../../const";
import dayjs from "dayjs";

dayjs.locale();

export const MainContents = () => {
  return (
    <View style={MainContentsStyle.container}>
      <View style={MainContentsStyle.contentsHeader}>
        <Text>시작일: {START_DATE}</Text>
        <Text>오늘: {dayjs().format("YYYY-MM-DD")}</Text>
      </View>
    </View>
  );
};

const MainContentsStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentsHeader: {
    flex: 1,
    flexDirection: "row",
  },
});
