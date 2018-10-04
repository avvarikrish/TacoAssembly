import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Container,
  Content,
  Icon,
  Header,
  Left,
  Right,
  Body,
  Button,
  Form
} from "native-base";
import axios from "axios";
const { width, height } = Dimensions.get("window");

class MainTacoScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      randomTaco: []
    }
  }
  _assembleTaco = () => {
    var self = this;
    axios.get ("https://tacos-ocecwkpxeq.now.sh/shells")
      .then (function (response) {
        var shells = response["data"];
        self.props.navigation.navigate("ShellScreen", {shells: shells});
      })
  }
  _createRandomTaco = () => {
    var self = this;
    var ingredients = ["shells", "baseLayers", "mixins", "condiments", "seasonings"];
    var randomTaco = [];
    for (var i = 0; i < ingredients.length; i++) {
      axios.get ("https://tacos-ocecwkpxeq.now.sh/" + ingredients[i])
        .then (function (response) {
          var randomValue = Math.floor(Math.random() * response["data"].length);
          randomTaco.push (response["data"][randomValue]["name"]);
          if (randomTaco.length == 5) {
            self.props.navigation.navigate("FinalTacoScreen", {shellValue: randomTaco[0], baseLayerValue: randomTaco[1], mixinValue: randomTaco[2], condimentValue: randomTaco[3], seasoningValue: randomTaco[4]});
          }
        })
    }

    // console.log (self.state.randomTaco);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Card>
          <TouchableOpacity
            style={{
              width: width,
              marginVertical: 20,
              borderRadius: 5,
              paddingVertical: 0,
              shadowOffset: { width: 0, height: 0 },
              alignItems: "center",
              justifyContent: "center",
            }}
            disabled = {false}
            onPress = {() => this._assembleTaco()}
          >
            <Text style={{ color: "#fe5700", fontSize: 20, padding: 10}}>
              Build your own Taco!
            </Text>
          </TouchableOpacity>
        </Card>
        <Card>
          <TouchableOpacity
            style={{
              width: width,
              marginVertical: 20,
              borderRadius: 5,
              paddingVertical: 0,
              shadowOffset: { width: 0, height: 0 },
              alignItems: "center",
              justifyContent: "center",
            }}
            disabled = {false}
            onPress = {() => this._createRandomTaco()}
          >
            <Text style={{ color: "#fe5700", fontSize: 20, padding: 10}}>
              Create a Random Taco!
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}
export default MainTacoScreen;
