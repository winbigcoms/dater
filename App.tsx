import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainPage } from "page/main";
import { PlacePage } from "page/place";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={MainPage}
          options={{ headerTitle: "Dater" }}
        />
        <Stack.Screen
          name="place"
          component={PlacePage}
          options={{ headerTitle: "Dater - Wish Place" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
