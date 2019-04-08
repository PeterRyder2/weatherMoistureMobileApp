import React, { Component } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import {BottomNavigation } from 'react-native-material-ui';
//import Icon from 'react-native-vector-icons/Ionicons';

class SettingsScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: ""
    }
  }
  static navigationOptions = {
    title: 'Settings'
  };
  render() {
    // following code needed to passs this.stat.name around app
    const { navigation } = this.props;
    const currentUser = navigation.getParam('currentUser');
    this.state.name = currentUser;
    console.log("Name in Settings is "  + this.state.name)
    /********************************************* */
    return (
      <View style = {styles.container}> 
        <Text style = {styles.text1}> Settings coming soon </Text>

<BottomNavigation hidden={true} >
  <BottomNavigation.Action
      key="Home"
      icon="home"
      label="Home"
      onPress={() => this.props.navigation.navigate('Details', {
        currentUser: this.state.name,
      }) }
  />
  <BottomNavigation.Action
      key="Statistics"
      icon="assessment"
      label="Statistics"
      onPress={() => this.props.navigation.navigate('Charts', {
        currentUser: this.state.name,
      }) }
  />
  <BottomNavigation.Action
      key="menu"
      icon="menu"
      label="Menu"
      onPress={() => this.props.navigation.navigate('MoistureReading', {
        currentUser: this.state.name,
      }) }
  
  />
  <BottomNavigation.Action
      key="settings"
      icon="settings"
      label="Settings"
      onPress={() => this.props.navigation.navigate('Settings', {
        currentUser: this.state.name,
      }) }
  
  
  />
</BottomNavigation>
</View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'#fff',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      justifyContent: 'space-between',
      textAlign:'center',
      
    },
    bottomnav:{
      backgroundColor: 'rgba(0, 102, 0, 0.5)'
    },

    contentContainer: {
      paddingVertical: 20
    },
    text1:{
      flex:0.4,
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign:'center',
    }
})
export default SettingsScreen
    