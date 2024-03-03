import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoutesNames } from "./RouteNames";
import { BookDetailScreen } from "../pages/BookDetailsScreen";
import { AddBookScreen } from "../pages/AddBookScreen";
import { HomeScreen } from "../pages/HomeScreen";
import { EditBookScreen } from "../pages/EditBookSreen";
import { IconAdd, IconBooks } from "../components/Icons";
import { StyleConst } from "../StyleConst";
import { Book } from "~/store/types";

const exampleItem: Book = {
  title: 'Book',
  description: '...',
  id: '1',
}
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={RoutesNames.LIB} component={HomeScreen} />
      <HomeStack.Screen
        name={RoutesNames.EDIT}//@ts-ignore
        component={EditBookScreen}
        initialParams={{ item: exampleItem }}
      />
      <HomeStack.Screen
        name={RoutesNames.BOOK_DETAILS}//@ts-ignore
        component={BookDetailScreen}
        initialParams={{ item: exampleItem }}
      />
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