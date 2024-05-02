import dayjs from "dayjs";
import "dayjs/locale/ko";
import { START_DATE } from "const";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { get_day_list_10 } from "utill/date";
import useUserStore from "store/userStore";

dayjs.locale("ko");

export const DdayCounter = () => {
  const dateList = get_day_list_10(START_DATE);

  return (
    <View style={DdayCounterStyleSheet.flexItemBox}>
      <Text style={DdayCounterStyleSheet.titleText}>기념일</Text>
      <FlatList
        data={dateList}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={DdayCounterStyleSheet.fletItem}>
            <View>
              <Text style={DdayCounterStyleSheet.fletItemDday}>
                {item.title}
              </Text>
              <Text>
                {item.date.format("YYYY-MM-DD")}({item.date.format("ddd")})
              </Text>
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
    flex: 1.75,
    borderBottomColor: "#c0c0c0",
    paddingTop: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#cfffe5",
  },
  titleText: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  fletItem: {
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
