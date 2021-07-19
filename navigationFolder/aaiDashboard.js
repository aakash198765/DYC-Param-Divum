import React, {useState, setState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert, Keyboard, TouchableOpacity, KeyboardAvoidingView, ScrollView, Button, SafeAreaView  } from 'react-native';
import { Input, Text, Card, Modal } from '@ui-kitten/components';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction,  } from '@ui-kitten/components'; 


// portraait image -- base64 url image
// imageSet1 image -- bitmap Image
const DATA = [
  {
    id: '',
    name: '',
    docNo: '',
    aadhaar_number: '',
    mobileNumber: '',
    portrait: '',
    imageSet1: ''
  },
  {
    id: '',
    name: '',
    docNo: '',
    aadhaar_number: '',
    mobileNumber: '',
    portrait: '',
    imageSet1: ''
  },
  {
    id: '',
    name: '',
    docNo: '',
    aadhaar_number: '',
    mobileNumber: '',
    portrait: '',
    imageSet1: ''
  },
]; 

/*

 // fetch data  set
 const [passengerProfile, setPassengerProfile] = useState([]);

// fetch API 
const passengersDetails = async () => {
  try {
    const response = await fetch('https://reactnative.dev/movies.json'); 
    const json = await response.json();
    setPassengerProfile(json.title);  
  } catch (error) {
    console.error(error);
  }
}

// function to call fetchApi on screen loading
useEffect(() => {
passengersDetails();
console.log(passengerProfile);  
}, []);


*/


const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);




const AAIDashboard = ( {route, navigation} ) => { 
  
  const renderItem = ({ item }) => ( 
    <TouchableOpacity  activeOpacity={0.6} 
          onPress={()=>navigation.navigate('passengerProfileFaceMatch', { name: item.name, docNo: item.docNo, aadhaar_number: item.aadhaar_number, mobileNumber: item.mobileNumber,
                                                                          portrait: item.portrait, imageSet1: item.imageSet1, 
       })} >    
      <View style={styles.item}>
       <Text style={styles.title}>{item.name}</Text>
       <Text style={styles.title}>{item.id}</Text> 
      </View> 
  </TouchableOpacity> 

  ); 

  
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/> 
  );


  return (
 <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Passengers List' alignment='center'   accessoryLeft={BackAction} />  
      <Divider/>
      <View style={styles.screen}> 
          <FlatList
              data={DATA}
              renderItem={renderItem} 
              keyExtractor={item => item.id} 
           />  
      </View> 
</SafeAreaView> 
  );
}; 
 
const styles = StyleSheet.create({
screen: {
    flex:1,
    backgroundColor: 'white', 
 },
button: {
    margin: 2,
    margin: 20,
  },
buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly', 
    marginTop: 20, 
  },
text1: {
  

  },
item: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:  'black', 
    padding: 10,
    marginVertical: 2.5,
    marginHorizontal: '1%',
    width: '98%',
    height: 45,
    borderRadius: 5, 
  },
title: {
    color: 'white',
    fontFamily: 'Montserrate-Regular',
    fontSize: 14,
  },
  example: {
    marginVertical: 24,
  },

});

export default AAIDashboard; 

