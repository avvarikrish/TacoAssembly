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
import CustomMultiPicker from "react-native-multiple-select-list";
const { width, height } = Dimensions.get("window");

class SeasoningScreen extends Component {
  static navigationOptions = {
    headerTitle: "Seasonings (Unlimited)"
  };
  constructor(props){
    super(props);
    this.state = {
      seasonings: [],
      finalSeasonings: []
    }
  }
  _selectSeasoning = (seasoningValues) => {
    var newSeasoningValues = seasoningValues[1];
    for (var i = 2; i < seasoningValues.length; i++) {
      if (i == seasoningValues.length-1) {
        newSeasoningValues += ", and " + seasoningValues[i];
      } else {
        newSeasoningValues += ", " + seasoningValues[i];
      }
    }
    this.state.finalSeasonings = newSeasoningValues;
  }
  _goToFinalTacos = (seasoningValues) => {
    const { navigation } = this.props;
    var shellValues = navigation.getParam ("shells");
    var baseLayerValues = navigation.getParam ("baseLayers");
    var mixinValues = navigation.getParam ("mixins")
    var condimentValues = navigation.getParam ("condiments");
    this.props.navigation.navigate("FinalTacoScreen", {shells: shellValues, baseLayers: baseLayerValues, mixins: mixinValues, condiments: condimentValues, seasonings: seasoningValues});
  }
  render() {
    const { navigation } = this.props;
    var x = navigation.getParam ("shells");
    var seasonings = navigation.getParam ("seasonings");
    for (var i = 0; i < seasonings.length; i++) {
      this.state.seasonings.push (seasonings[i]["name"]);
    }
    return (
      <View style={{ flex: 1 }}>
        <Content>
          <Form>
            <View>
              <CustomMultiPicker
                options={this.state.seasonings}
                search={false}
                multiple={true}
                placeholder={"Search"}
                placeholderTextColor={"#757575"}
                returnValue={"label"} // label or value
                callback={res => {this._selectSeasoning(res)}}
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
            onPress = {() => this._goToFinalTacos(this.state.finalSeasonings)}
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
export default SeasoningScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
