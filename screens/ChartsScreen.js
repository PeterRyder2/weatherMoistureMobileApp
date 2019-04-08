import React from "react";
import { Alert, ScrollView, View, Text, Button, StyleSheet, Picker} from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine, VictoryAxis } from "victory-native";
import victoryLabel from "victory-native/lib/components/victory-label";
import { VictoryLabel } from "victory-core/es";
import { Icon, IconToggle ,BottomNavigation } from 'react-native-material-ui';

const dataLine = [
  { timepoint: 1, value: 0 },
  { timepoint: 2, value: 0 },
  { timepoint: 3, value: 0 },
  { timepoint: 4, value: 0 },
];

class ChartsScreen extends React.Component {
  state = {
    data: null,
    maxNum:0,
    PickerSelectedVal :"Select an option",
    name: ""
  }
  static navigationOptions = {
    title: 'Statistics'

  };

  render() {
    /** For passing name around the app */
    console.log("data poo is " + this.state.data)
    const { navigation } = this.props;
    const currentUser = navigation.getParam('currentUser');
    console.log("currentUser IS ...." + currentUser);
    this.state.name = ""
    /********************************* */
/*
    <Text style={{"fontSize": 20, textAlign: 'center'}}>
    Please select an option below 
    and press the confirm button
  </Text>
*/
    return (
      <ScrollView contentContainerStyle = {styles.container}>
        <Text style={styles.text1}>
          Select the number of time units 
          to display below  
          and press the confirm button
        </Text>
       
     
      
      <Picker
        selectedValue={this.state.PickerSelectedVal}
       onValueChange={(itemValue, itemIndex) => 
       this.setState({PickerSelectedVal: itemValue})}
      // onValueChange={this.getMoisture}
       >
        <Picker.Item label="Select an option" value="null" />
        <Picker.Item label="last 4" value="4" />
        <Picker.Item label="last 8" value="8" />
        <Picker.Item label="last 16" value="16" />
        <Picker.Item label="last 24" value="24" />
        <Picker.Item label="last 32" value="32" />
        <Picker.Item label="last 48" value="48" />
        <Picker.Item label="all" value="255" />
      </Picker>
      


      <View style={styles.graph}>
        <VictoryChart  style={styles.graph} className="myLabel"  minDomain ={{y:0}} 
          maxDomain ={{y:this.state.maxNum}} width={300} theme={VictoryTheme.material}>
            <VictoryLine data={dataLine} x="timepoint" y="value" />
            
            <VictoryAxis 
              label="Time Unit"
              style={{
                axisLabel: { padding: 30 }
              }}
            />
            <VictoryAxis dependentAxis
              label="Moisture Value Unit (0 - 255)"
              style={{
                axisLabel: { padding: 60 }
              }}
            />
          </VictoryChart>

      </View>
        <BottomNavigation hidden={true} >
          <BottomNavigation.Action
              key="Home"
              icon="home"
              label="Home"
              onPress={() => this.props.navigation.navigate('Details',{
                currentUser: this.state.name,
              })}
          />
          <BottomNavigation.Action
              key="confirm"
              icon="check"
              label="Confirm"
              onPress={ this.graphData }          
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
            key="settings"
            icon="settings"
            label="Settings"
            onPress={() => this.props.navigation.navigate('Settings', {
              currentUser: this.state.name,
            })}   
          />
        </BottomNavigation>
      </ScrollView>
    );
  } // end render 


  graphData=()=>{
    
    Alert.alert(
        "You are to change the number of points to graph to : " + this.state.PickerSelectedVal,
        'Do you want to do this?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', 
          onPress:this.getMoisture},
        ],
        {cancelable: false},
      );
    }
    
  getMoisture = async ()=> {
    console.log("in getMoisture")
    this.setState({
      data : null,
      maxNum: 0,
      })
    // dataplicity code https://unilobed-poodle-4357.dataplicity.io/
    // FOR LOCAL HOST USE
    try{
      //const response = await fetch('http://192.168.0.2:5000/gd/' + this.state.PickerSelectedVal)
      console.log("name is XOXOXOXOXOX"  + this.state.name)
      const response = await fetch('https://unilobed-poodle-4357.dataplicity.io/gd/' + this.state.PickerSelectedVal +'/' + this.state.name)
      console.log(response)
      //var val = JSON.parse(response)
      const val = response._bodyInit
      console.log(typeof val)
      obj = JSON.parse(val);
      console.log(typeof obj )
  
      highestNum = obj[0]
      console.log("Highest num is  before loop is " + highestNum)
  
      for(i=0; i < obj.length ;i++){
        console.log("i is " + highestNum)
  
        // get the hisghest value
        console.log(obj[i])
        // get the hisghest number in the array
        if (obj[i]> highestNum ){
          highestNum = obj[i] 
        }
        dataLine[i] =  {timepoint: i+1, value: obj[i] }
      }
      console.log("Highest num is  " + highestNum)
      console.log("obj is " + obj)
  
      this.setState({
         data : obj,
         maxNum: highestNum
         })
    }catch(e){
      console.log(e);
    }

 

  } // end getMoisture 
}


const styles = StyleSheet.create({

    container:{
      flex:1,
      backgroundColor:'#fff',
      //alignItems:'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      justifyContent: 'space-between',
     // alignItems: 'center',
      textAlign:'center',
      
    },
    graph :{
      alignItems: 'center',
    },
    text1:{
      flex:0.4,
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign:'center',
    }
  
});

export default ChartsScreen

/*
<Picker
selectedValue={this.state.PickerSelectedVal}
onValueChange={(itemValue, itemIndex) => 
this.setState({PickerSelectedVal: itemValue})} >

<Picker.Item label="last 4" value="4" />
<Picker.Item label="last 8" value="8" />
<Picker.Item label="last 16" value="16" />
<Picker.Item label="last 24" value="24" />
<Picker.Item label="last 32" value="32" />
<Picker.Item label="last 48" value="48" />
</Picker>*/
