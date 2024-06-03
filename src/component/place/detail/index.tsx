import { useQuery } from "@tanstack/react-query";
import { get_promise } from "api/event";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useImgModalStore from "store/imgModalStore";
import { COLOR_PALETTE } from "style/color";

interface PlaceDetailProps {
  id: string;
}

export const PlaceDetail = (props: PlaceDetailProps) => {
  const { id } = props;

  const { onOpenImgModal } = useImgModalStore();
  const { height, width } = Dimensions.get("window");
  const onClickImg = (imgs: string[], order: number) => {
    const imgUris = imgs.map((img) => ({ uri: img }));
    onOpenImgModal({ imgs: imgUris, order });
  };

  const { data: placeData } = useQuery({
    queryKey: [id, "EventPlace"],
    queryFn: () => get_promise(id),
    enabled: Boolean(id),
  });

  return (
    <View style={style.container}>
      {placeData && (
        <View style={style.placeItemContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 5,
            }}
          >
            <Text style={style.title}>{placeData.title}</Text>
            <Text style={style.date}>{placeData.date}</Text>
          </View>
          <View>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 20 }}
            >
              <FlatList
                data={placeData.imgs}
                keyExtractor={(item) => item}
                numColumns={placeData.imgs.length}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      onClickImg(placeData.imgs, index);
                    }}
                    style={{
                      backgroundColor: COLOR_PALETTE.gray,
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{
                        width,
                        height: height / 2,
                      }}
                      source={{ uri: item }}
                    />
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
          <View>
            <Text style={style.memo}>메모</Text>
            <Text style={style.memo}>{placeData.memo}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PALETTE.pink,
  },
  placeItemContainer: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 24,
  },
  date: {
    fontSize: 16,
  },
  memo: {
    fontSize: 16,
  },
});
