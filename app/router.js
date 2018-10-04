import React from "react";
import {
  createStackNavigator,
  TabNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
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
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-nutrition-outline" color={tintColor} size={30} />
        ),
      }
    },
    Cart: {
      screen: CartStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "CART",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-cart-outline" color={tintColor} size={24} />
        ),
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
  },
  {
    tabBarOptions: {
      activeTintColor: "#fe7500",
      inactiveTintColor: "#767676",
      style: {
        backgroundColor: "white",
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5
      }
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
