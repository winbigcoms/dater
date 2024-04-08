import { PageContainer } from "component/pageContainer";
import { PlaceList } from "component/place/list";
import { StyleSheet, View } from "react-native";

export const PlacePage = () => {
  return (
    <PageContainer>
      <View style={styles.mainContentsContainer}>
        <PlaceList />
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  mainContentsContainer: {
    flex: 1,
    width: "100%",
  },
});
