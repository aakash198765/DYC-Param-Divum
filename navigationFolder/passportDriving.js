import React from 'react';
import { SafeAreaView, Button, View, TouchableOpacity, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import {  Divider, Layout, TopNavigation, Icon, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const PassportDrivingSelection = ({ navigation, route }) => { 
  
  const { aadhaar_number, mobileNumber} = route.params; 

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}  /> 
  );

  // navigation from Home to Detail Screen
  const navigateToPassportScanner = () => {
    navigation.navigate('Scan', { choice: 'passport', title: 'PASSPORT SCANNER', aadhaar_number: aadhaar_number, mobileNumber: mobileNumber });
  }; 

  // navigation from Home to Detail Screen
  const navigateToDLScanner = () => {
    navigation.navigate('Scan', { choice: 'dl', title: 'DRIVING LICENCE SCANNER', aadhaar_number: aadhaar_number, mobileNumber: mobileNumber });  
  }; 



  return (
    <SafeAreaView style={{ flex: 1 }}> 
      <TopNavigation title='Documents Scanner'  alignment='center' accessoryLeft={BackAction}   />
      <Divider/> 

      <ImageBackground source={require('../images/airplaneB.jpg')} resizeMode="cover" style={styles.imageBackground}   >
      <View style={styles.container}> 
     

       <TouchableOpacity onPress={navigateToPassportScanner}  style={styles.buttonContainer} activeOpacity={0.6} >   
           <Text style={styles.buttonText}> PASSPORT</Text> 
       </TouchableOpacity>

       <TouchableOpacity onPress={navigateToDLScanner}  style={styles.buttonContainer} activeOpacity={0.6} >   
           <Text style={styles.buttonText}> DRIVING LICENCE</Text>   
       </TouchableOpacity>
      
     
      </View>
      </ImageBackground> 
    </SafeAreaView>
  );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-end',
        marginBottom: 70,
        alignItems: 'center',
        
        
    },
    buttonContainer: {
        backgroundColor: 'black', 
        width: '60%', 
        height: '8%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white'
    },
    imageBackground: {
      flex: 1,
     height: '100%',
    },

});