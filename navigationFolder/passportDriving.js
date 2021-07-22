import React from 'react';
import { SafeAreaView, Button, View, TouchableOpacity, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import {  Divider, Layout, TopNavigation, Icon, TopNavigationAction, OverflowMenu } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);
const HomeIcon = (props) => (
  <Icon {...props} name='home-outline' />
);

const renderTitle = (props) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}> 
    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16}}>Document Verification</Text> 
  </View>
); 


export const PassportDrivingSelection = ({ navigation, route }) => { 
  
  const { aadhaar_number, mobileNumber} = route.params; 

  const navigateBack = () => {
    navigation.goBack();
  }; 

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}  /> 
  );
  const renderRightActions = () => (
   
    <React.Fragment>
        <TopNavigationAction icon={HomeIcon} onPress={()=> navigation.navigate('welcome')} /> 
    </React.Fragment> 

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
      <TopNavigation title={renderTitle}  alignment='center' accessoryLeft={BackAction}  accessoryRight={renderRightActions} /> 
      <Divider/> 

      <ImageBackground source={require('../images/airplaneB.jpg')} resizeMode="cover" style={styles.imageBackground}   >
      <View style={styles.container}> 
      <Text style={{ fontFamily: 'Montserrat-Light', marginTop: 10, fontSize: 14,   }}> Select Any one  </Text> 
      <Text style={{ fontFamily: 'Montserrat-Light', marginVertical: 2, fontSize: 14,   }}> Document Verification to proceed </Text> 
       <View style={{flex: 1, marginVertical: 70}} >
       <TouchableOpacity onPress={navigateToPassportScanner}  style={styles.buttonContainer} activeOpacity={0.6} >   
           <Text style={styles.buttonText}>Passport</Text> 
       </TouchableOpacity>

       <TouchableOpacity onPress={navigateToDLScanner}  style={styles.buttonContainer} activeOpacity={0.6} >   
           <Text style={styles.buttonText}>Driving Licence</Text>   
       </TouchableOpacity>
      </View>
     
      </View>
      </ImageBackground> 
    </SafeAreaView>
  );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        //justifyContent: 'center',
        marginTop: '100%',
        padding: 10,
       // alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: 'black', 
        width: '60%', 
        height: 40, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 5,
        marginVertical: 4.5, 
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Montserrat-Rugular',
        fontSize: 14,
    },
    imageBackground: {
      flex: 1,
     height: '60%',
    },

});