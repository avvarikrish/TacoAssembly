import React from "react";
import {
  createStackNavigator,
  TabNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { AsyncStorage } from "react-native";

import MainTacoScreen from "./Screens/MainTacoScreen";
import ShellScreen from "./Screens/ShellScreen";
import BaseLayerScreen from "./Screens/BaseLayerScreen";
import MixinScreen from "./Screens/MixinScreen";
import CondimentScreen from "./Screens/CondimentScreen";
import SeasoningScreen from "./Screens/SeasoningScreen";
import FinalTacoScreen from "./Screens/FinalTacoScreen";
import CartScreen from "./Screens/CartScreen";

const TacoStack = createStackNavigator(
  {
    MainTacoScreen: {
      screen: MainTacoScreen
    },
    ShellScreen: {
      screen: ShellScreen
    },
    BaseLayerScreen: {
      screen: BaseLayerScreen
    },
    MixinScreen: {
      screen: MixinScreen
    },
    CondimentScreen: {
      screen: CondimentScreen
    },
    SeasoningScreen: {
      screen: SeasoningScreen
    },
    FinalTacoScreen: {
      screen: FinalTacoScreen
    }
  }
)
const CartStack = createStackNavigator(
  {
    CartScreen: {
      screen: CartScreen
    }
  }
)
const AppStack = createBottomTabNavigator(
  {
    Tacos: {
      screen: TacoStack,
      navigationOptions: {
        tabBarLabel: "TACOS",
      }
    },
    Cart: {
      screen: CartStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "CART",
        tabBarOnPress: async () => {
          const items = await AsyncStorage.getItem("Cart");
          totalAddToCartItems = JSON.parse (items);
          if (totalAddToCartItems == null) {
            alert ("No items in cart");
          } else {
            navigation.navigate("CartScreen", {addToCartItems: totalAddToCartItems});
          }
        }
      })
    }
  }
)
export const createRootNavigator = () => {
  return createSwitchNavigator(
    {
      Main: {
        screen: AppStack
      }
    },
    {
      initialRouteName: "Main"
    }
  );
};
