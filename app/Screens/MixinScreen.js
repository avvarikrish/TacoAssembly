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

class MixinScreen extends Component {
  static navigationOptions = {
    headerTitle: "Mixins (Select up to 2)"
  };
  constructor(props){
    super(props);
    this.state = {
      mixins: [],
      finalMixins: "",
      mixinArray: []
    }
  }
  _selectMixin = (mixinValues) => {
    this.state.mixinArray = mixinValues;
    var newMixinValues = mixinValues[1];
    for (var i = 2; i < mixinValues.length; i++) {
      if (i == mixinValues.length-1) {
        newMixinValues += ", and " + mixinValues[i];
      } else {
        newMixinValues += ", " + mixinValues[i];
      }
    }
    this.state.finalMixins = newMixinValues;
  }
  _goToCondiments = (mixinValues) => {
    if (this.state.mixinArray.length < 4) {
      const { navigation } = this.props;
      var shellValues = navigation.getParam ("shells");
      var baseLayerValues = navigation.getParam ("baseLayers");
      var self = this;
      axios.get ("https://tacos-ocecwkpxeq.now.sh/condiments")
        .then (function (response) {
          var condimentValues = response["data"];
          self.props.navigation.navigate("CondimentScreen", {shells: shellValues, baseLayers: baseLayerValues, mixins: mixinValues, condiments: condimentValues});
        })
    } else {
      alert ("Please select up to 2 mixins");
    }
  }
  render() {
    const { navigation } = this.props;
    var mixins = navigation.getParam ("mixins");
    for (var i = 0; i < mixins.length; i++) {
      this.state.mixins.push (mixins[i]["name"]);
    }
    return (
      <View style={{ flex: 1 }}>
        <Content>
          <Form>
            <View>
              <CustomMultiPicker
                options={this.state.mixins}
                search={false}
                multiple={true}
                placeholder={"Search"}
                placeholderTextColor={"#757575"}
                returnValue={"label"} // label or value
                callback={res => {this._selectMixin(res)}}
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
            onPress = {() => this._goToCondiments(this.state.finalMixins)}
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
export default MixinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
