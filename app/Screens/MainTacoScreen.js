import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from "axios";

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
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._assembleTaco()}>
          <Text>Create your own taco!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._createRandomTaco()}>
          <Text>Create a random taco!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default MainTacoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
