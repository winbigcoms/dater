import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Dummy_PLACE,
  PLACE_SEARCH_TYPE,
  PLACE_SEARCH_TYPE_CONVERT,
  PLACE_TYPE,
} from "const";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useImgModalStore from "store/imgModalStore";
import { COLOR_PALETTE } from "style/color";

export const PlaceList = () => {
  const { onOpenImgModal } = useImgModalStore();
  const route = useRoute();
  const navigation = useNavigation();

  const [placeType, setPlaceType] =
    useState<(typeof PLACE_SEARCH_TYPE)[number]>("ALL");

  const onChangeSearchType = (type: (typeof PLACE_SEARCH_TYPE)[number]) => {
    setPlaceType(type);
  };

  const onClickImg = (imgs: string[], order: number) => {
    const imgUris = imgs.map((img) => ({ uri: img }));
    onOpenImgModal({ imgs: imgUris, order });
  };

  const onClickPlaceMore = () => {
    navigation.navigate("place" as never);
  };

  const onClickTItle = (id: string) => {
    // @ts-ignore
    navigation.navigate("placeDetail", { id });
  };

  return (
    <View style={PlaceListStyle.container}>
      {route.name === "home" && (
        <View>
          <View style={PlaceListStyle.header}>
            <Text style={PlaceListStyle.titleText}>우리들의 Wish Place</Text>
            <TouchableOpacity onPress={onClickPlaceMore}>
              <Text style={PlaceListStyle.moreItem}>더보기</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {route.name === "place" && (
        <View style={PlaceListStyle.placeSearchView}>
          {PLACE_SEARCH_TYPE.map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => {
                onChangeSearchType(type);
              }}
            >
              <View
                style={{
                  ...PlaceListStyle.placeSearchViewItem,
                  ...(type === placeType &&
                    PlaceListStyle.SelectedPlaceSearchViewItem),
                }}
              >
                <Text
                  style={
                    type === placeType &&
                    PlaceListStyle.SelectedPlaceSearchViewItemText
                  }
                >
                  {PLACE_SEARCH_TYPE_CONVERT[type]}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <FlatList
        data={Dummy_PLACE.filter((data) =>
          placeType === "ALL"
            ? true
            : placeType === "isVisited"
            ? data.isVisited
            : !data.isVisited
        )}
        keyExtractor={(place) => place.id}
        renderItem={({ item }) => (
          <View style={PlaceListStyle.placeItem}>
            <TouchableOpacity
              style={{
                alignSelf: "flex-start",
              }}
              onPress={() => onClickTItle(item.id)}
            >
              <Text style={PlaceListStyle.placeItemTitle}>
                {item.title} / {PLACE_TYPE[item.tag]}
                {item.date && ` / ${item.date}`}
              </Text>
            </TouchableOpacity>
            <View style={PlaceListStyle.imgContainer}>
              {item.imgs.length === 0 ? (
                <Image
                  key="none"
                  source={require("../../../imgs/empty.png")}
                  style={PlaceListStyle.img}
                />
              ) : (
                item.imgs.map((imgUrl, order) => (
                  <TouchableOpacity
                    key={imgUrl}
                    onPress={() => {
                      onClickImg(item.imgs, order);
                    }}
                  >
                    <Image
                      source={{ uri: imgUrl }}
                      style={PlaceListStyle.img}
                    />
                  </TouchableOpacity>
                ))
              )}
            </View>
            <Text style={PlaceListStyle.placeMemo} numberOfLines={1}>
              {item.memo || "메모된 것이 없어요!"}
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
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    backgroundColor: COLOR_PALETTE.pink,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
    shadowOffset: {
      width: 1,
      height: -1,
    },
  },
  titleText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  moreItem: {
    fontSize: 12,
    textDecorationLine: "underline",
    textDecorationColor: "#ccc",
  },
  placeSearchView: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_PALETTE.gray,
  },
  placeSearchViewItem: {
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderColor: "pink",
  },
  SelectedPlaceSearchViewItem: {
    backgroundColor: "pink",
  },
  SelectedPlaceSearchViewItemText: {
    color: "white",
  },
  placeItem: {
    padding: 10,
    gap: 5,
    borderBottomColor: COLOR_PALETTE.gray,
    borderBottomWidth: 1,
  },
  placeItemTitle: {
    fontWeight: "600",
    fontSize: 15,
    color: COLOR_PALETTE.black,
    marginBottom: 5,
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
    width: "90%",
    color: COLOR_PALETTE.black,
  },
});
