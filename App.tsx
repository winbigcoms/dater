import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Header } from "./src/component/header";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MainContents } from "./src/component/main";

const headerStatusBarHeight = StatusBar.currentHeight;

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Header />
        <MainContents />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
