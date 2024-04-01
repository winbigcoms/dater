import { START_DATE } from "const";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { get_day_list_10 } from "utill/date";

export const DdayCounter = () => {
  const dateList = get_day_list_10(START_DATE);

  return (
    <View style={DdayCounterStyleSheet.flexItemBox}>
      <Text style={DdayCounterStyleSheet.titleText}>다가오는 기념일</Text>
      <FlatList
        data={dateList}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={DdayCounterStyleSheet.fletItem}>
            <View>
              <Text style={DdayCounterStyleSheet.fletItemDday}>
                {item.title}
              </Text>
              <Text>{item.date.format("YYYY-MM-DD")}</Text>
            </View>
            <View>
              <Text style={DdayCounterStyleSheet.fletItemDday}>
                D-{item.Dday}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const DdayCounterStyleSheet = StyleSheet.create({
  flexItemBox: {
    flex: 2.5,
    borderBottomWidth: 1,
    borderBottomColor: "#c0c0c0",
    paddingTop: 5,
    backgroundColor: "#FFD6D6",
  },
  titleText: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  fletItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#c0c0c0",
    padding: 10,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  fletItemDday: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
