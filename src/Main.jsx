import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {HomeStackScreen,CateStackScreen} from "./router/index"
import Home from './pages/Home';
import Cate from './pages/Cate';
import Cart from './pages/Cart';
import My from './pages/My';
export default class Main extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      themeColor: '#C00000'
    };
   
  }
  render() {
    const Tab = createBottomTabNavigator();
    const {themeColor} = this.state;
    const {route} = this.props;
    console.log(this.props,"router_key");
    return (
      <Tab.Navigator
      initialRouteName={route.params&&route.params.router_key||'home'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'cate') {
              iconName = focused ? 'md-grid' : 'md-grid-outline';
            } else if (route.name === 'cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'my') {
              iconName = focused
                ? 'ios-person-circle'
                : 'ios-person-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: themeColor,
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            title: '首页',
            headerStyle: {
              backgroundColor: themeColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Tab.Screen
          name="cate"
          component={Cate}
          options={{
            title: '分类',
            headerStyle: {
              backgroundColor: themeColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Tab.Screen
          name="cart"
          component={Cart}
          options={{
            title: '购物车',
            headerStyle: {
              backgroundColor: themeColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Tab.Screen
          name="my"
          component={My}
          options={{
            title: '我的',
            headerStyle: {
              backgroundColor: themeColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}
