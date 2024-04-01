import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DdayCounter } from "component/d-day";
import { Header } from "component/header";
import { MainHeader } from "component/mainHeader";
import { PlaceList } from "component/place/list";

export const MainPage = () => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.mainContentsContainer}>
          <MainHeader />
          <DdayCounter />
          <PlaceList />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContentsContainer: {
    flex: 1,
    width: "100%",
  },
});
