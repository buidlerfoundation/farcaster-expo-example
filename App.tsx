import { RootStackParamList } from "@/models";
import Feeds from "@/screens/Feeds";
import Replies from "@/screens/Replies";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="FeedsScreen"
          component={Feeds}
          options={{ title: "Trending" }}
        />
        <Stack.Screen name="RepliesScreen" component={Replies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
