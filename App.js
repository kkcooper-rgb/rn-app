import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import Main from './src/Main';
import GoodDetail from './src/pages/GoodDetail';
import GoodList from './src/pages/GoodList';
import store from './src/redux/index';
export default class App extends Component {
  state = {
    themeColor: '#C00000',
  };
  render() {
    const {themeColor} = this.state;
    const Stack = createNativeStackNavigator();
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="GoodDetail"
              component={GoodDetail}
              options={{
                title: '商品详情',
                headerStyle: {
                  backgroundColor: themeColor,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="GoodList"
              component={GoodList}
              options={{
                title: '商品列表',
                headerStyle: {
                  backgroundColor: themeColor,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
