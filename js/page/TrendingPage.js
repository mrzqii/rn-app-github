import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { onThemeChange } from "../action/theme";
class TrendingPage extends Component {
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
            // navigation.setParams({
            //   theme: {
            //     tintColor: "red",
            //     updateTime: new Date().getTime()
            //   }
            // });
            this.props.onThemeChange("#096");
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(onThemeChange(theme))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingPage);
