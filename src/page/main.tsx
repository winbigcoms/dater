import { StyleSheet, View } from "react-native";
import { DdayCounter } from "component/d-day";
import { MainHeader } from "component/mainHeader";
import { PlaceList } from "component/place/list";
import { PageContainer } from "component/pageContainer";

export const MainPage = () => {
  return (
    <PageContainer>
      <View style={styles.mainContentsContainer}>
        <MainHeader />
        <DdayCounter />
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