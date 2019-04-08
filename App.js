import React, { Component } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import ChartsScreen from './screens/ChartsScreen';
import MenuScreen from './screens/MenuScreen';
import TestScreen from  './screens/TestScreen';

class App extends React.Component {
  render() {
    return (
      <PaperProvider>
          <TestApp />
      </PaperProvider>

    );
  }
}

const AppStackNavigator = createStackNavigator(
{
  Login: LoginScreen,
  Details: DetailsScreen,
  Settings: SettingsScreen,
  Charts: ChartsScreen,
  Menu: MenuScreen,
  Test: TestScreen,
},
{
  initialRouteName: 'Details'
})

const TestApp = createAppContainer(AppStackNavigator)


export default App