import { NFTsTabParamList, RootStackParamList } from "@/models";
import Feeds from "@/screens/Feeds";
import FeedsByNFTHolders from "@/screens/FeedsByNFTHolders";
import FeedsByPoapsHolders from "@/screens/FeedsByPoapsHolders";
import Ethereum from "@/screens/NFTs/Ethereum";
import Poaps from "@/screens/NFTs/Poaps";
import Replies from "@/screens/Replies";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialTopTabNavigator<NFTsTabParamList>();

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: "#000000",
    card: "#000000",
    text: "#ffffff",
  },
};

function NFTsTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Ethereum"
        component={Ethereum}
        options={{ title: "ETH" }}
      />
      <Tab.Screen name="Poaps" component={Poaps} options={{ title: "POAPS" }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="FeedsScreen"
            component={Feeds}
            options={{
              title: "Trending",
            }}
          />
          <Stack.Screen
            name="RepliesScreen"
            component={Replies}
            options={{
              title: "Conversation",
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="NFTsTab"
            component={NFTsTabs}
            options={{
              title: "Filter",
            }}
          />
          <Stack.Screen
            name="FeedsByNFTScreen"
            component={FeedsByNFTHolders}
            options={{
              title: "NFT Holders",
            }}
          />
          <Stack.Screen
            name="FeedsByPoapsScreen"
            component={FeedsByPoapsHolders}
            options={{
              title: "Poap Holders",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
