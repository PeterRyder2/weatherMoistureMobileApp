import * as React from 'react';
import { Alert,StyleSheet, Text, View, Picker } from 'react-native';
import {Button, Paragraph, Menu, Divider } from 'react-native-paper';
import {BottomNavigation } from 'react-native-material-ui';
import PropTypes from 'prop-types'

export default class MenuScreen extends React.Component {
  
  state = {
    visible: false,
    MoistureData: undefined,
    Moisture: false,
    AutoVal: false,
    getAutoVal:false,
    TurnOnNow: false,
    PickerSelectedVal : 'none',
    val: 'Unassinged',
    AutoValFromArduino: "Unassinged",
    name:""
  };

  _changeAutoValue = () => {

    this.setState({
      visible: false,
      Moisture: false,
      getAutoVal:false,
      AutoVal: true,
      TurnOnNow: false,
      })

  }

  _getCurrentAutoVal= async () =>{
    try{
        console.log("in getCurrentAutoVal")
        // dataplicity code https://unilobed-poodle-4357.dataplicity.io/
        // FOR LOCAL HOST USE
        //const response = await fetch('http://192.168.0.2:5000/gav')
        const response = await fetch('https://unilobed-poodle-4357.dataplicity.io/gav')
        console.log(response)
        //var val = JSON.parse(response)
        this.setState({
          AutoValFromArduino:response._bodyInit,
          visible: false,
          Moisture: false,
          getAutoVal: true,
          AutoVal: false,
          TurnOnNow: false,
        })
 
    }
    catch(e){
        console.log(e)
    }
  } // end getCurrentAutoVal

  _getLiveMoisture = async ()=> {
    console.log("in getLiveMoisture")

    // dataplicity code https://unilobed-poodle-4357.dataplicity.io/
    // FOR LOCAL HOST USE
    //const response = await fetch('http://192.168.0.2:5000/gmr')
    try{
      //const response = await fetch('http://192.168.0.2:5000/gmr')

      const response = await fetch('https://unilobed-poodle-4357.dataplicity.io/gmr/'+ this.state.name)
      console.log(response)
      //var val = JSON.parse(response)
      const val = response._bodyInit
      this.setState({
        moisturData : val,
        visible: false,
        Moisture: true,
        getAutoVal:false,
        AutoVal: false,
        TurnOnNow: false,
        })
    }
    catch(e){
      console.error(e.message)
    }
  } // end getMoisture 

  // alerts the user they are going to change the picker value in the auto moisture
  // then calls this.changeAutoValue
  _getSelectedPickerValue=()=>{
    Alert.alert(
        "You are to change the Automated watering level to: " + this.state.PickerSelectedVal,
        'Do you want to do this?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', 
          onPress:this.ChangeAutoValue},
        ],
        {cancelable: false},
      );
    }

    /**
     * This method sends an api request to the 
     * pi to alter the minimum auto value
     * 
    */
    ChangeAutoValue = async ()=> {
      try{
          console.log("in ChangeAutoValue")
          // dataplicity code https://unilobed-poodle-4357.dataplicity.io/
          // FOR LOCAL HOST USE
          //const response = await fetch('http://192.168.0.2:5000/cav/'+this.state.PickerSelectedVal+'/' + this.state.name)
          const response = await fetch('https://unilobed-poodle-4357.dataplicity.io/cav/'+this.state.PickerSelectedVal + '/' + this.state.name)
          console.log(response)
          //var val = JSON.parse(response)
          this.state.val = response._bodyInit

      }
      catch(e){
          console.log(e)
      }
      finally{
          Alert.alert(
              "The Current Auto Value at the arduino is " + this.state.val)
      }

    } 


  _openMenu = () => this.setState({ 
                        visible: true,
                        Moisture: false,
                        getAutoVal:false,
                        AutoVal: false,
                        TurnOnNow: false,
                      });

  _closeMenu = () => this.setState({ 
                              visible: false,
                              Moisture: false,
                              getAutoVal:false,
                              AutoVal: false,
                              TurnOnNow: false,
                            });

  _changeChoice = (val) => this.setState({ choice: val });

  _openMoistureRead= () => this.setState({ Moisture: true });

  _openMinVal= () => this.setState({ AutoVal: true });

  _openTurnOnNow= () => this.setState({ TurnOnNow: true });

  render() {
    // following code needed to passs this.stat.name around app
    const { navigation } = this.props;
    const currentUser = navigation.getParam('currentUser');
    this.state.name = currentUser;
    console.log("Name in Settings is "  + this.state.name)
    /********************************************* */


    console.log("Moisture is  "  + this.state.Moisture)

    const moistMessage =  <Text style={styles.text1} >
                            The moisture reading is {this.state.data}
                          </Text>

    const SetAutoValue =
    <View>
      <Text style = {styles.text2}>Please select a value to set the automated watering system.{"\n"}
      Values offered: 50,100,150,200{"\n"}
      Lower values will mean the watering system will automatically turn on in dryer conditions
      and vice versa
      </Text>
      <Picker
        // selectedValue={"hello !!"}
        selectedValue={this.state.PickerSelectedVal}
        onValueChange={(itemValue, itemIndex) => 
        this.setState({
          PickerSelectedVal: itemValue,  
        })} >

        <Picker.Item label="50" value="50" />
        <Picker.Item label="100" value="100" />
        <Picker.Item label="150" value="150" />
        <Picker.Item label="200" value="200" />
        <Picker.Item label = "none" value = "none"/>
      </Picker>

      <Button  onPress={this._getSelectedPickerValue}>Press here to set the Auto value </Button>

    </View> 

    const GetAutoValue = <Text style={styles.text1} >The current Minimum value from the arduino is set to  {this.state.AutoValFromArduino}</Text>;

    
    const TurnOnNow = <Text>System turned on</Text>;


    let message;  

    // executes if the Get current Moisture is fired
    if (this.state.Moisture){
      // sets the rest false 
      console.log("at moisture if")
      this._getLiveMoisture
      message = moistMessage
    }
    // executes if the Set minumum Auto value is fired
    else if (this.state.AutoVal){
      console.log("at auto if")
      message = SetAutoValue
    }
    
    // executes if the Set minumum Auto value is fired
    else if (this.state.getAutoVal){
      console.log("at GetAutoValue if")
      message = GetAutoValue
    }

    // executes if the Get current Moisture is fired
    else if (this.state.TurnOnNow){
      console.log("at turn on if")
      message = moistMessage
    }
    else{
      console.log("at final else")
      message = <Text></Text>  
    }
   

    console.log("MESSAGE IS "  + message)

   
    return (
      <View style = {styles.container}>

        <Menu 
          visible={this.state.visible}
          onDismiss={this._closeMenu}
          anchor={
            <Button  onPress={this._openMenu}>Welcome to the menu. Press me for options </Button>
          }
        >
         <Menu.Item onPress={this._getLiveMoisture} title="Get Current Moisture level" />
         <Divider />
          <Menu.Item onPress={this._changeAutoValue} title="Set the water min value " />
          <Divider />
          <Menu.Item onPress={this._getCurrentAutoVal} title="Get the water min value " />
          <Divider />
          <Menu.Item onPress={this._openTurnOnNow} title="water NOW!" />
          <Divider />
          <Menu.Item onPress={this._openMenu} title="RESET!!!!" />
        </Menu>
        
        <View style={styles.text1}>
          {message}
        </View>
      
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
    },
    text2:{
      
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign:'center',
    }

})

/****Proptypes section ******* */

//proptypes for bottomnavigation
// You can declare that a prop is a specific JS type. 
BottomNavigation.propTypes = {
  active: PropTypes.string,
  children: PropTypes.node.isRequired,
  hidden: PropTypes.bool, /* DEFAULT: false */
}

BottomNavigation.Action.propTypes ={
 icon: PropTypes.string.isRequired,
 label: PropTypes.string,
 onPress: PropTypes.func,
}

Menu.propTypes={
 visible: PropTypes.bool.isRequired,
 onDismiss: PropTypes.func.isRequired,
 anchor: PropTypes.node.isRequired
}
Menu.Item.propTypes={
 onPress: PropTypes.func.isRequired,
 title: PropTypes.string.isRequired
}

Picker.propTypes={
 selectedValue: PropTypes.string.isRequired,
 onValueChange: PropTypes.func.isRequired,
}

Picker.Item.propTypes={
 label: PropTypes.string.isRequired,
 value: PropTypes.string.isRequired
}


