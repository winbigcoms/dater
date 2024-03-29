import { FlatList, StyleSheet, Text, View } from "react-native";
import { START_DATE } from "../../const";
import dayjs from "dayjs";
import { get_day_list_10, get_past_Date } from "../../utill/date";

dayjs.locale();

export const MainContents = () => {
  const dateList = get_day_list_10(START_DATE);

  return (
    <View style={MainContentsStyle.container}>
      <View style={MainContentsStyle.contentsHeader}>
        <View>
          <Text>우리벌써!: {get_past_Date(START_DATE)}일</Text>
        </View>
        <View>
          <Text>시작일: {START_DATE}</Text>
        </View>
      </View>
      <View style={MainContentsStyle.flexItemBox}>
        <FlatList
          data={dateList}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={MainContentsStyle.fletItem}>
              <View>
                <Text style={MainContentsStyle.fletItemDday}>{item.title}</Text>
                <Text>{item.date.format("YYYY-MM-DD")}</Text>
              </View>
              <View>
                <Text style={MainContentsStyle.fletItemDday}>
                  D-{item.Dday}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const MainContentsStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contentsHeader: {
    flex: 1,
    backgroundColor: "yellow",
    padding: 10,
  },
  flexItemBox: {
    flex: 4,
  },
  fletItem: {
    borderBottomWidth: 1,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  fletItemDday: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
