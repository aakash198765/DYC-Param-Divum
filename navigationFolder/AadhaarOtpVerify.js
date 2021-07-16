import React, { useState } from 'react';
import {View,Text,StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import {  Divider, TopNavigation, TopNavigationAction,Icon } from '@ui-kitten/components';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { color } from 'react-native-reanimated';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' /> 
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
      <View style={{flex:1}}>
      <TopNavigation title='OTP Verification' alignment='center' accessoryLeft={BackAction} />
      <Divider/>
        <View style={styles.container}> 
        <Image  source={require('../images/verify.png')}  style={styles.logo}  /> 

        <OTPInputView
        style={styles.otp}
         pinCount={6} 
         autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled = {(code => {
            setOtp(code)
        })}
         />
         

         <TouchableOpacity onPress={Verify} style={styles.buttonContainer} activeOpacity={0.6} >  
               <Text style={styles.buttonText}>Verify</Text>  
           </TouchableOpacity>
         
        </View>
      </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white', 
    },
    borderStyleBase: {
    width: 30,
    height: 45,
    
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
      height: 100,
      marginVertical: '5%'
  },
  text: {
    margin: 10,
    fontSize: 30,
    textAlign: "center",
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  buttonContainer: {
    backgroundColor: 'black',
    width: '70%', 
    height: 50,
    alignItems: 'center', 
    justifyContent: 'center',  
    borderRadius: 10,
    marginVertical: 5,
},
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
},
logo: {
  width: 350,
  height: 230,
  marginTop: '20%',

},

})
export default OtpVerify;