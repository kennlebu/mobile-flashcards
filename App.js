import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Platform, View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import Quiz from "./components/Quiz";
import Score from "./components/Score";
import decks from "./reducers";
import { green } from "./utils/colors";
import middleware from "./middleware";
import NewDeck from "./components/NewDeck";
import AddCard from "./components/AddCard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { setLocalNotification } from "./utils/helpers";

const Tab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const Main = createNativeStackNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={DeckList} />
      <Tab.Screen name="Add Deck" component={NewDeck} />
    </Tab.Navigator>
  );
}

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(decks, middleware)}>
        <NavigationContainer>
          <View style={{ height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={green} barStyle="default" />
          </View>
          <Main.Navigator>
            <Main.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Main.Screen name="Deck" component={Deck} />
            <Main.Screen name="AddCard" component={AddCard} />
            <Main.Screen name="Quiz" component={Quiz} />
            <Main.Screen name="Score" component={Score} />
          </Main.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
