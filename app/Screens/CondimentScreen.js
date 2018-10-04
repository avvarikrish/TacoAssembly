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
import CustomMultiPicker from "react-native-multiple-select-list";
import axios from "axios";
const { width, height } = Dimensions.get("window");

class CondimentScreen extends Component {
  static navigationOptions = {
    headerTitle: "Condiments (Select up to 3)"
  };
  constructor(props){
    super(props);
    this.state = {
      condiments: [],
      finalCondiments: [],
      condimentsArray: []
    }
  }
  _selectCondiment = (condimentValues) => {
    this.state.condimentsArray = condimentValues
    var newCondimentValues = condimentValues[1];
    for (var i = 2; i < condimentValues.length; i++) {
      if (i == condimentValues.length-1) {
        newCondimentValues += ", and " + condimentValues[i];
      } else {
        newCondimentValues += ", " + condimentValues[i];
      }
    }
    this.state.finalCondiments = newCondimentValues;
  }
  _goToSeasonings = (condimentValues) => {
    if (this.state.condimentsArray.length < 5) {
      const { navigation } = this.props;
      var shellValues = navigation.getParam ("shells");
      var baseLayerValues = navigation.getParam ("baseLayers");
      var mixinValues = navigation.getParam ("mixins")
      var self = this;
      axios.get ("https://tacos-ocecwkpxeq.now.sh/seasonings")
        .then (function (response) {
          var seasoningValues = response["data"];
          self.props.navigation.navigate("SeasoningScreen", {shells: shellValues, baseLayers: baseLayerValues, mixins: mixinValues, condiments: condimentValues, seasonings: seasoningValues});
        })
    } else {
      alert ("Please select up to 3")
    }
  }
  render() {
    const { navigation } = this.props;
    var condiments = navigation.getParam ("condiments");
    for (var i = 0; i < condiments.length; i++) {
      this.state.condiments.push (condiments[i]["name"]);
    }
    return (
      <View style={{ flex: 1 }}>
        <Content>
          <Form>
            <View>
              <CustomMultiPicker
                options={this.state.condiments}
                search={false}
                multiple={true}
                placeholder={"Search"}
                placeholderTextColor={"#757575"}
                returnValue={"label"} // label or value
                callback={res => {this._selectCondiment(res)}}
                rowBackgroundColor={"white"}
                rowHeight={42}
                rowRadius={10}
                iconColor={"#fe7500"}
                iconSize={30}
                selectedIconName={"ios-checkbox-outline"}
                unselectedIconName={"ios-square-outline"}
              />
            </View>
          </Form>
        </Content>
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
            onPress = {() => this._goToSeasonings(this.state.finalCondiments)}
          >
            <Text style={{ color: "#fe5700", fontSize: 20, padding: 10}}>
              Add and Continue
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}
export default CondimentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
