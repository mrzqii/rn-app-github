import React, { Component } from "react";
import { View, Text } from "react-native";
import NavigationUtil from "../navigator/NavigationUtil";

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      const { navigation } = this.props;
      navigation.navigate("Main");
      // NavigationUtil.goPage({}, "Main");
    }, 2000);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View>
        <Text> WelcomePage </Text>
      </View>
    );
  }
}
