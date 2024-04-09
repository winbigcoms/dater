import { Dummy_PLACE } from "const";
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

  const target = Dummy_PLACE.find((data) => data.id === id);

  return (
    <View style={style.container}>
      {target && (
        <View style={style.placeItemContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 5,
            }}
          >
            <Text style={style.title}>{target.title}</Text>
            <Text style={style.date}>{target.date}</Text>
          </View>
          <View>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 20 }}
            >
              <FlatList
                data={target.imgs}
                keyExtractor={(item) => item}
                numColumns={target.imgs.length}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      onClickImg(target.imgs, index);
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
            <Text style={style.memo}>{target.memo}</Text>
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
