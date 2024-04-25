import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const PlaceDetailHeaderRight = () => {
  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate("placeAdd" as never);
  };

  return (
    <View>
      <TouchableOpacity onPress={onClick}>
        <Text>더하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    color: "red",
  },
});
