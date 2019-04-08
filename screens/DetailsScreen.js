import React, { Component } from 'react';
import { StatusBar, View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {BottomNavigation } from 'react-native-material-ui';
//import Icon from 'react-native-vector-icons/Ionicons';

class DetailsScreen extends React.Component {
  
  constructor(props){
    super(props)

  }
  state = {
    weatherData: false, 
    id: "Unassinged",
    main: "Unassinged",
    description : "Unassinged",
    icon: "Unassinged",
    name: "",
  }

  static navigationOptions = {
    title: 'Home'
  };

    render() {

      /*** For moving the name around the app  */
      const { navigation } = this.props;
      //const currentUser = navigation.getParam('currentUser');
      const currentUser = "Peter Ryder";
      console.log("currentUser IS ...." + currentUser);
      console.log("this.state.weatherData is  ...." + this.state.weatherData);
      this.state.name = currentUser;

      const weatherDescription = 
        <Text style = {styles.text1}> Description:{this.state.description}{"\n"}
          Main:{this.state.main}{"\n"}
          ID code for weather : {this.state.id}{"\n"}
          Icon: {this.state.icon}{"\n"}
        </Text>
      

      let weatherMessage;
      // diplay the weather data if the weatherData is set
      // to true
      if(this.state.weatherData){

        weatherMessage = weatherDescription;
      }



     
      return (
  
        <ScrollView contentContainerStyle = {styles.container}>
          <Text style = {styles.container} >
                Welcome {this.state.name} {"\n"} to the  Details weather screen.{"\n\n"}
                Please use the Bottom navigation bar to navigate through the app.{"\n\n"}
                Press the "weather" Button below to get real time weather data for Foxford, Co Mayo 
          </Text>
          <View style = {styles.container}>
            {weatherMessage}
          </View>

        

        <BottomNavigation hidden={true} >
        <BottomNavigation.Action
            key="Home"
            icon="home"
            label="Home"
            onPress={() => this.props.navigation.navigate('Details', {
              currentUser: this.state.name,
            }) }                />
        <BottomNavigation.Action
            key="Statistics"
            icon="assessment"
            label="Statistics"
            onPress={() => this.props.navigation.navigate('Charts', {
              currentUser: this.state.name,
            }) }
        />
        <BottomNavigation.Action
            key="Menu"
            icon="menu"
            label="Menu"
            onPress={() => this.props.navigation.navigate('Menu', {
              currentUser: this.state.name,
            }) }             
        />
        <BottomNavigation.Action
            key="weather"
            icon="cloud"
            label="Weather"
            onPress={this._getWeather}                
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
        </ScrollView>
      )
  }

    _getWeather = async ()=> {
      console.log("in _getWeather")

      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=53.976192&lon=-9.117549&appid=8aaae57f966915b85ed963bd8af3866f')
      console.log(response)
      const {weather} = await response.json()
      console.log("response is " + {weather})
      // adding json objects to variables
      const main = weather[0]['main']
      const id  = weather[0]['id']
      const description = weather[0]['description']
      const icon = weather[0]['icon']
  
      this.setState({
        id: id,
        main: main,
        description: description,
        icon: icon,
        weatherData: true,
      })
    }
}// end detailsScreen class


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
        
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign:'center',
      },
})
    
export default DetailsScreen;
    