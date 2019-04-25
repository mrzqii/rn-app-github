// 可以进行动态配置的底部导航栏
import React, { Component } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import PopularPage from "../page/PopularPage";
import TrendingPage from "../page/TrendingPage";
import FavoritePage from "../page/FavoritePage";
import MyPage from "../page/MyPage";
// react-navigation-tabs这个插件是react-navigation这个插件依赖的一个插件 所以不需要再次安装
import { BottomTabBar } from "react-navigation-tabs";

import { connect } from "react-redux";
const TABS = {
  //在这里配置页面的路由

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
};

class DynamicTabNavigator extends Component<Props> {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  _tabNavigator() {
    // 这里我们第一次运行的时候把这个tab保存起来 避免每次切换主题的时候会重新render函数 是tab回到第一个
    if (this.Tabs) {
      return this.Tabs;
    }
    const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS;
    // 这里比如有什么权限控制之类的需求 我们可以根据条件来显示需要加载的页面
    const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }; //根据需要定制显示的tab
    PopularPage.navigationOptions.tabBarLabel = "最热"; //动态配置Tab属性
    return (this.Tabs = createAppContainer(
      createBottomTabNavigator(tabs, {
        //   这个配置项是定制我们的tabBar
        tabBarComponent: props => {
          return <TabBarComponent theme={this.props.theme} {...props} />;
        }
      })
    ));
  }

  render() {
    const Tab = this._tabNavigator();
    return <Tab />;
  }
}

class TabBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime()
    };
  }

  render() {
    // const { routes, index } = this.props.navigation.state;
    // if (routes[index].params) {
    //   const { theme } = routes[index].params;
    //   if (theme && theme.updateTime > this.theme.updateTime) {
    //     this.theme = theme;
    //   }
    // }
    return <BottomTabBar {...this.props} activeTintColor={this.props.theme} />;
  }
}

const mapStateToProps = state => ({ theme: state.theme.theme });
export default connect(mapStateToProps)(DynamicTabNavigator);
