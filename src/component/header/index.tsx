import { StyleSheet, Text, View } from "react-native";

export const Header = () => {
  return (
    <View style={HeaderStyle.container}>
      <View>
        <Text style={HeaderStyle.Logo}>D/T</Text>
      </View>
    </View>
  );
};

const HeaderStyle = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 50,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  Logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
