//mostyl implemented code for google sign in 
//https://github.com/lingonsaft/google-sign-in-expo-create-react-native-app/blob/master/App.js


import React, { Component } from 'react';
import { TouchableOpacity,
        View,
        Text,
        Button,
        Image,
        Alert,
        StyleSheet} from 'react-native';
import { PropTypes } from 'victory-native';
//import { GoogleSigninButton } from 'react-native-google-signin';

// code from tutorial  https://www.youtube.com/watch?v=ELXvcyiTTHM&t=13s

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: true,
      dataBaseConnected: false,
      name: "",
      photoUrl: "",
      returnFromDatabase:"",
    }
  }
  static navigationOptions = {
    title: 'Login'
  };
  dataNameStore  = async () => {
    console.log("in dataNameStore")
    // dataplicity code https://unilobed-poodle-4357.dataplicity.io/
    try{
      const response = await fetch('http://192.168.0.2:5000/std/'+ this.state.name)
      //const response = await fetch('https://unilobed-poodle-4357.dataplicity.io/std/' + name1)
      console.log(response)
      const val = response._bodyInit
      this.setState({
        returnFromDatabase : true,
        })

      Alert.alert(val) 
    }
    catch(e){
      console.error(e.message)
    }
  } // end data 
  


  signIn = async () => {
    console.log("in SignIn")
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "35914207324-7jk6d3vksnrnlt3hjd0h1sap9fftdtb2.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      })
      if (result.type === "success" ) {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
    finally{
      const DataVal = this.dataNameStore()
      console.log("dataval is" + DataVal )
    }
  } // end sign in 

  render() {

    return (
      <View style={styles.container} >
        {this.state.signedIn == true ? (
          // sending currentUser as a param to other screen
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} 
            direction={() => this.props.navigation.navigate('Details', {
              currentUser: this.state.name,
            }) }
          />
        ) : (
          <LoginPage signIn={this.signIn}/>
        )}
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View style = {styles.container}>
      <Text style={styles.text1}>Welcome to the automated watering system. Sign in below</Text>
      
      <TouchableOpacity onPress={() => props.signIn()}>
      <Image
        source={require('../assets/googleSignIn.png')}
      />
      </TouchableOpacity>
    </View>
  )
}

const LoggedInPage  = props => {
  //const val = () => {props.dataNameStore}
  //val
  return (
    <View style={styles.container}>
      <Text style = {styles.text1}>Welcome: {props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl}} />
      <Button style={{flex: 1}}
         title="Enter Details screen"
         onPress={props.direction} 
      />
    </View>
  )
} // end loggedInPage
const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 'bold',
    fontSize: 20,
    textAlign:'center',
  },
  header: {
    fontSize: 25
  },
  text1:{
    flex:0.4,
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign:'center',
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})
  export default LoginScreen;


/****Proptypes section *******/
//proptypes for bottomnavigation
// You can declare that a prop is a specific JS type. 
