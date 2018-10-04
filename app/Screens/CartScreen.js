import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
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

class CartScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentCart: []
    }
  }
  render() {
    const { navigation } = this.props;
    this.state.currentCart = navigation.getParam ("addToCartItems");
    return (
      <View style={{ flex: 1 }}>
        <Content>
          <Form>
            <View>
              {this.state.currentCart.map ((value, index) => (
                <Card key = {index}>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text style={{ color: "#fe5700", fontSize: 20 }}> {value["shell"]} </Text>
                        <Text style={{ color: "grey" }}> {value["description"]} </Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              ))}
            </View>
          </Form>
        </Content>
      </View>
    );
  }
}
export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
