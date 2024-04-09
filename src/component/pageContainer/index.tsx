import { ImgViewer } from "component/imgViewer";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export const PageContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContentsContainer}>{children}</View>
      </SafeAreaView>
      <ImgViewer />
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
