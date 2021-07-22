import React, { useState } from 'react';
import {View,Text,StyleSheet, Button, TouchableOpacity, Image, Keyboard,  KeyboardAvoidingView, Platform,  SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import {  Divider, TopNavigation, TopNavigationAction,Icon } from '@ui-kitten/components';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { color } from 'react-native-reanimated';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' /> 
); 

const renderTitle = (props) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}> 
    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16}}>OTP Verification</Text> 
  </View>
);


const OtpVerify = ({props,navigation,route}) => {

    const [o, setOtp] = useState('');
 
    const c_id = route.params.client_id;
    const m_number = route.params.mobile_number;
    const aadhaar_number = route.params.aadhaar_number;
    const mobileNumber = route.params.mobileNumber;
    
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNTg0MDk4MSwianRpIjoiYjZkNmVmNTUtMzlkMi00ZmUyLWIxMjEtNjAyNzZmNTkxYWY3IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LmRpdnVtQGFhZGhhYXJhcGkuaW8iLCJuYmYiOjE2MjU4NDA5ODEsImV4cCI6MTYyODQzMjk4MSwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInJlYWQiXX19.MYwTYiwNd4Qy0gDNN_XbvGtYJjbtqVnk33mbzG0IsF0");

    var raw = JSON.stringify({
  "client_id": c_id, 
  "otp": o,
  "mobile_number": m_number
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    }; 

   console.log(requestOptions);
    const Verify = () => {
             fetch("https://sandbox.surepass.io/api/v1/aadhaar-v2/submit-otp", requestOptions)
            .then(response => response.text())
            .then(result => console.log()  ) 
            .catch(error => console.log('error', error));

            navigation.navigate('passportDrivingSelection', {aadhaar_number: aadhaar_number, mobileNumber: mobileNumber }); 
    } 

       
   const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/> 
  );

    return( 
    <SafeAreaView style={{ flex: 1 }}> 
      <TopNavigation title={renderTitle} alignment='center' accessoryLeft={BackAction} />
      <Divider/> 
        
  <KeyboardAvoidingView   style={styles.container}> 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>      
      <View style={styles.screen}>  
            <Image  source={require('../images/verify.png')}  style={styles.logo}  />
        
        <View style={styles.section1}>
           <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14}} > Enter the Otp: </Text>  
            <OTPInputView
            style={styles.otp}
            pinCount={6} 
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled = {(code => { setOtp(code) })}
             /> 

         <TouchableOpacity onPress={Verify} style={styles.buttonContainer} activeOpacity={0.6} >  
               <Text style={styles.buttonText}>Verify</Text>  
          </TouchableOpacity>
        </View> 
      
      </View>  
    </TouchableWithoutFeedback> 
  </KeyboardAvoidingView>   
</SafeAreaView> 
    );
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
    screen: {
      flex:1,
  },
  section1: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    //marginVert: 100,
  },
    borderStyleBase: {
    width: 30,
    height: 40, 
  },
 
  borderStyleHighLighted: {
    borderColor: "black",
  },
 
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black'
  },
 
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  otp: {
      width: "80%",
     height: 50,
     // marginTop: 120, 

  },  
  buttonContainer: {
    backgroundColor: 'black',
    width: '60%', 
    height: 50,
    alignItems: 'center', 
    justifyContent: 'center',  
   borderRadius: 6,
   marginVertical: 30
},
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrate-Regular', 
    fontSize: 14,
},
logo: {
  width: 350,
  height: 230,
  alignSelf: 'center',
  marginTop: 100,
 

},

})
export default OtpVerify;