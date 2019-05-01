import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  createMaterialTopTabNavigator,
  createAppContainer,
  SafeAreaView
} from "react-navigation";
import NavigationUtil from "../navigator/NavigationUtil";
export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.tabNames = ["Java", "Android", "ios", "React", "react native", "php"];
  }
  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        //   这样就能动态的传递参数到每个tab页面咯 官方是没有说明的
        // 通过这个方式就能给每个tab初始化的时候做一些个性化的东西
        screen: props => <PopularTab {...props} tabLabel={item} />,
        navigationOptions: {
          title: item
        }
      };
    });
    return tabs;
  }
  render() {
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        this._genTabs(),
        // {
        //   PopularTab1: {
        //     screen: PopularTab,
        //     navigationOptions: {
        //       title: "Tab1"
        //     }
        //   },
        //   PopularTab2: {
        //     screen: PopularTab,
        //     navigationOptions: {
        //       title: "Tab2"
        //     }
        //   }
        // }
        {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false, //是否使标签大写，默认为true
            scrollEnabled: true, //是否支持 选项卡滚动，默认false
            style: {
              backgroundColor: "blue", //TabBar 的背景颜色
              // backgroundColor: theme.themeColor, //TabBar 的背景颜色
              height: 30 //fix 开启scrollEnabled后再Android上初次加载时闪烁问题
            },
            indicatorStyle: styles.indicatorStyle, //标签指示器的样式
            labelStyle: styles.labelStyle //文字的样式
          }
          //   lazy: true
        }
      )
    );
    return (
      <View style={{ marginTop: 30, flex: 1 }}>
        <TabNavigator />
      </View>
    );
  }
}

const PopularTab = ({ tabLabel }) => {
  return (
    <View>
      <Text
        onPress={() => {
          NavigationUtil.goPage({}, "DetailPage");
        }}
      >
        {tabLabel}
        跳转到详情页
      </Text>
      <Text
        onPress={() => {
          NavigationUtil.goPage({}, "DataStoreDemoPage");
        }}
      >
        {tabLabel}
        跳转到DataStoreDemoPage
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabStyle: {
    // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: "white"
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: "red",
    margin: 10
  }
});
