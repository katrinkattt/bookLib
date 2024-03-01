import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoutesNames } from "./RouteNames";
import { BookDetailScreen } from "../pages/BookDetailsScreen";
import { AddBookScreen } from "../pages/AddBookScreen";
import { HomeScreen } from "../pages/HomeScreen";
import { IconAdd, IconBooks } from "../components/Icons";
import { StyleConst } from "../StyleConst";


const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={RoutesNames.HOME} component={HomeScreen} />
      <HomeStack.Screen name={RoutesNames.BOOK_DETAILS} component={BookDetailScreen} />
    </HomeStack.Navigator>
  );
}
export const Navigator = () => (

  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === RoutesNames.ADD_BOOK) {
            return <IconAdd color={color} />;
          } else {
            return <IconBooks color={color} />;
          }
        },
        tabBarStyle: {
          height: 80,
          backgroundColor: StyleConst.AccentColor,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      })}

    >
      <Tab.Screen name={RoutesNames.HOME} component={HomeStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name={RoutesNames.ADD_BOOK} component={AddBookScreen} />
    </Tab.Navigator>
  </NavigationContainer>

)