import { Dummy_PLACE, PLACE_TYPE } from "const";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export const PlaceList = () => {
  return (
    <View style={PlaceListStyle.container}>
      <Text style={PlaceListStyle.titleText}>우리들의 Wish Place</Text>
      <FlatList
        data={Dummy_PLACE}
        keyExtractor={(place) => place.id}
        renderItem={({ item }) => (
          <View style={PlaceListStyle.placeItem}>
            <Text style={PlaceListStyle.placeItemTitle}>
              {item.title} / {PLACE_TYPE[item.tag]}
              {item.date && `/ ${item.date}`}
            </Text>
            <View style={PlaceListStyle.imgContainer}>
              {item.imgs.map((imgUrl) => (
                <Image
                  key={imgUrl}
                  source={{ uri: imgUrl }}
                  style={PlaceListStyle.img}
                />
              ))}
            </View>
            <Text style={PlaceListStyle.placeMemo} numberOfLines={1}>
              {item.memo}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const PlaceListStyle = StyleSheet.create({
  container: {
    flex: 5,
  },
  titleText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  placeItem: {
    padding: 10,
    gap: 5,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  placeItemTitle: {
    fontWeight: "600",
    fontSize: 15,
  },
  imgContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  img: {
    width: 90,
    height: 90,
  },
  placeMemo: {
    width: "85%",
  },
});
