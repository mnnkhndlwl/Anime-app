import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./src/screens/Home/Home";
import { MagnifyingGlassIcon,ArrowLeftIcon } from "react-native-heroicons/outline";
import { Anime } from "./src/screens/Anime/Anime";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ route, navigation }) => ({
            headerTitleStyle: {
              fontSize: 20,
              color: "white",
            },
            headerStyle: {
              backgroundColor: "red",
            },
            headerRight: () => (
              <MagnifyingGlassIcon
                color="white"
                size="30"
                onPress={() => {
                  navigation.navigate("Search");
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Anime"
          component={Anime}
          options={({ route,navigation }) => ({
            headerShadowVisible: false,
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
