import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <Text> TrendingPage </Text>
        <Button
          title="改变主题色"
          onPress={() => {
            navigation.setParams({
              theme: {
                tintColor: "red",
                updateTime: new Date().getTime()
              }
            });
          }}
        />
      </View>
    );
  }
}
