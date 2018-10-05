import React, { Component } from "react";
import { Text, View, TouchableOpacity, AsyncStorage, Dimensions } from 'react-native';
import {  Card } from "native-base";
import axios from "axios";
const { width, height } = Dimensions.get("window");

class FinalTacoScreen extends Component {
  static navigationOptions = {
    headerTitle: "Final Taco"
  };
  constructor(props){
    super(props);
    this.state = {
      addToCartItem: "",
      addToCartTaco: ""
    }
  }
  _addToCart = async () => {
    var product = [];
    AsyncStorage.getItem("Cart",(err,res)=> {
      if (!res) {
       product.push ({shell: this.state.addToCartShell, description: this.state.addToCartTaco});
       AsyncStorage.setItem("Cart", JSON.stringify(product));
      } else {
        product = JSON.parse(res);
        product.push({shell: this.state.addToCartShell, description: this.state.addToCartTaco});
        AsyncStorage.setItem("Cart", JSON.stringify(product));
      }
    })
    alert ("Item added to cart");
  }
  render() {
    const { navigation } = this.props;
    var shells = navigation.getParam ("shells");
    var baseLayers = navigation.getParam ("baseLayers");
    var mixins = navigation.getParam ("mixins");
    var condiments = navigation.getParam ("condiments");
    var seasonings = navigation.getParam ("seasonings");
    if (seasonings == undefined) {
      seasonings = "None";
    }
    this.state.addToCartShell = shells + " with\n";
    this.state.addToCartTaco = baseLayers + "\n\n" + mixins + "\n\n" + condiments + "\n\n" + seasonings;
    this.state.addToCartItem = this.state.addToCartShell + this.state.addToCartTaco;
    return (
      <View>
        <Card>
          <Text style={{color: "#fe5700", fontSize: 20}}> {this.state.addToCartShell} </Text>
          <Text style= {{color: "grey"}}> {this.state.addToCartTaco} </Text>
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
            onPress = {() => this._addToCart()}
          >
            <Text style={{ color: "#fe5700", fontSize: 20, padding: 10}}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}
export default FinalTacoScreen;
