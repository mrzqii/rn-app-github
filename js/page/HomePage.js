import React, { Component } from "react";
import { View, Text, Image, BackHandler } from "react-native";
import PopularPage from "../page/PopularPage";
import TrendingPage from "../page/TrendingPage";
import FavoritePage from "../page/FavoritePage";
import MyPage from "./MyPage";
import NavigationUtil from "../navigator/NavigationUtil";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
// 字体使用 显示不正确 还需要额外的配置
// https://segmentfault.com/q/1010000012524890
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Entypo from "react-native-vector-icons/Entypo";

import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    //如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
    if (nav.routes[1].index === 0) {
      return false; // 表示退出应用
    }
    dispatch(NavigationActions.back());
    return true;
  };

  _tabNavigation() {
    return createBottomTabNavigator(
      {
        PopularPage: {
          screen: PopularPage,
          navigationOptions: {
            tabBarLabel: "最热",
            tabBarIcon: ({ tintColor, focused }) => (
              <Image
                source={require("../../res/tab/icon_tab_cat_center_selected.png")}
                style={{ tintColor: tintColor, width: 24, height: 24 }}
              />
            )
          }
        },
        TrendingPage: {
          screen: TrendingPage,
          navigationOptions: {
            tabBarLabel: "趋势",
            tabBarIcon: ({ tintColor, focused }) => (
              <Image
                source={require("../../res/tab/icon_tab_cat_center_select.png")}
                style={{ tintColor: tintColor, width: 24, height: 24 }}
              />
            )
          }
        },
        FavoritePage: {
          screen: FavoritePage,
          navigationOptions: {
            tabBarLabel: "收藏",
            tabBarIcon: ({ tintColor, focused }) => (
              <Image
                source={require("../../res/tab/icon_tab_cat_center_select.png")}
                style={{ tintColor: tintColor, width: 24, height: 24 }}
              />
            )
          }
        },
        MyPage: {
          screen: MyPage,
          navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({ tintColor, focused }) => (
              <Image
                source={require("../../res/tab/icon_tab_cat_center_select.png")}
                style={{ tintColor: tintColor, width: 24, height: 24 }}
              />
            )
          }
        }
      },
      {
        initialRouteName: "PopularPage",
        tabBarOptions: {
          activeTintColor: "red" // 自定义设置聚焦的颜色
        }
      }
    );
  }
  render() {
    // 这里把最外层的navigation保存在这个工具类里面 就不会出现多层嵌套navigator跳转问题了
    NavigationUtil.navigation = this.props.navigation;
    const Tab = createAppContainer(this._tabNavigation());
    return <DynamicTabNavigator />;
    // return <Tab />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(HomePage);
