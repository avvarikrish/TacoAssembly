import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
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
import { TextButton, RaisedTextButton } from "react-native-material-buttons";
import axios from "axios";
const { width, height } = Dimensions.get("window");

class BaseLayerScreen extends Component {
  static navigationOptions = {
    headerTitle: "Base Layers (Select up to 3)"
  };
  constructor(props){
    super(props);
    this.state = {
      baseLayers: [],
      finalBaseLayers: "",
      baseLayersArray: []
    }
  }
  _selectBaseLayer = (baseLayerValues) => {
    this.state.baseLayersArray = baseLayerValues;
    var newBaseLayerValues = baseLayerValues[1];
    for (var i = 2; i < baseLayerValues.length; i++) {
      if (i == baseLayerValues.length-1) {
        newBaseLayerValues += ", and " + baseLayerValues[i];
      } else {
        newBaseLayerValues += ", " + baseLayerValues[i];
      }
    }
    this.state.finalBaseLayers = newBaseLayerValues;
  }
  _goToMixin = (baseLayerValues) => {
    if (this.state.baseLayersArray.length < 5) {
      const { navigation } = this.props;
      var shellValues = navigation.getParam ("shells");
      var self = this;
      axios.get ("https://tacos-ocecwkpxeq.now.sh/mixins")
        .then (function (response) {
          var mixinValues = response["data"];
          self.props.navigation.navigate("MixinScreen", {shells: shellValues, baseLayers: baseLayerValues, mixins: mixinValues});
        })
    } else {
      alert ("Please select up to 3 base layers");
    }
  }
  render() {
    const { navigation } = this.props;
    var baseLayers = navigation.getParam ("baseLayers");
    for (var i = 0; i < baseLayers.length; i++) {
      this.state.baseLayers.push (baseLayers[i]["name"]);
    }
    return (
      <View style={{ flex: 1 }}>
        <Content>
          <Form>
            <View>
              <CustomMultiPicker
                options={this.state.baseLayers}
                search={false}
                multiple={true}
                placeholder={"Search"}
                placeholderTextColor={"#757575"}
                returnValue={"label"}
                callback={res => {this._selectBaseLayer(res)}}
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
            onPress = {() => this._goToMixin(this.state.finalBaseLayers)}
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
export default BaseLayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
