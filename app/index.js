import React from "react";
import { createRootNavigator } from "./router";

export default class App extends React.Component {
  render() {
    const Layout = createRootNavigator ();
    return <Layout />
  }
}
