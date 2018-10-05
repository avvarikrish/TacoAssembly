import React, { Component } from "react";
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Card, CardItem, Content, Form } from "native-base";
import axios from "axios";
import CustomMultiPicker from "react-native-multiple-select-list";
const { width, height } = Dimensions.get("window");

class ShellScreen extends Component {
  static navigationOptions = {
    headerTitle: "Shells (Select 1)"
  };
  constructor(props){
    super(props);
    this.state = {
      shells: [],
      finalShells: [],
      disabled: true
    }
  }
  _selectShell = (shellValues) => {
    this.state.finalShells = shellValues[0];
  }
  _goToBaseLayer = (shellValues) => {
    if (shellValues == undefined) {
      alert ("Please select a value");
    } else {
      var self = this;
      axios.get ("https://tacos-ocecwkpxeq.now.sh/baseLayers")
        .then (function (response) {
          var baseLayerValues = response["data"];
          self.props.navigation.navigate("BaseLayerScreen", {shells: shellValues, baseLayers: baseLayerValues});
        })
    }
  }

  render() {
    const { navigation } = this.props;
    var shells = navigation.getParam ("shells");
    for (var i = 0; i < shells.length; i++) {
      this.state.shells.push (shells[i]["name"]);
    }
    return (
      <View style={{ flex: 1 }}>
        <Content>
          <Form>
            <View>
              <CustomMultiPicker
                options={this.state.shells}
                search={false}
                multiple={false}
                placeholder={"Search"}
                placeholderTextColor={"#757575"}
                returnValue={"label"} // label or value
                callback={res => {this._selectShell(res)}}
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
            onPress = {() => this._goToBaseLayer(this.state.finalShells)}
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
export default ShellScreen;
