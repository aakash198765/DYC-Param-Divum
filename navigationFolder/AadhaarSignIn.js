import React, {useState, setState, useEffect} from 'react';
import {View, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity,Image, ScrollView, Button, SafeAreaView} from 'react-native';
import { Input, Text, Card, Modal } from '@ui-kitten/components';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction,  } from '@ui-kitten/components'; 

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);


const SignIn = ({navigation, props}) => {
    const [details, setDetails] = useState([]);
    const [aadhaar, setAadhaar] = useState();
    const [otpSent, setOtpSent] = useState(false);
    const [mobileNumber, setMobileNumber] = useState();
    const [buttonOtp, setButtonOtp] = useState('Get OTP');
    let client_id="";
    const setDetailsHandler = (input) => {
      setDetails([...details, input]); 
    }
    const setAadhaarHandler = input => {
      setAadhaar(input);
    }
    const setMobileNumberHandler = (input) => {
      setMobileNumber(input);
    }
    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
        "Authorization" :  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNTg0MDk4MSwianRpIjoiYjZkNmVmNTUtMzlkMi00ZmUyLWIxMjEtNjAyNzZmNTkxYWY3IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LmRpdnVtQGFhZGhhYXJhcGkuaW8iLCJuYmYiOjE2MjU4NDA5ODEsImV4cCI6MTYyODQzMjk4MSwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInJlYWQiXX19.MYwTYiwNd4Qy0gDNN_XbvGtYJjbtqVnk33mbzG0IsF0",
      },
      body: JSON.stringify({
        "id_number": aadhaar,
      }),
      redirect: 'follow'
      };

    const getOtp = () => {
      if(!aadhaar){
        return Alert.alert("Aadhaar number is missing");
      }
      if(!mobileNumber){
         return Alert.alert("Registered mobile number is missing");
      }
      if(aadhaar && mobileNumber){
        setOtpSent(true);
        return fetch("https://sandbox.surepass.io/api/v1/aadhaar-v2/generate-otp", requestOptions).then(response => {
        //  console.log("response", response);
         return response.text()
       }).then(result =>{
         //console.log("result", result);
        setDetailsHandler(result);
        setButtonOtp('Resend OTP');
        Alert.alert(  "OTP sent successsfully. Please verify" );
       }).catch(error =>{
        return error;
       }) 
      }  
    };

    const nav = () => {
      if(otpSent === true){
        if(details){
          if(details[0]){
            let arr=details[0];
            let res=arr.split(' ');
            client_id=res[2].substring(1, res[2].length-2); 
            navigation.navigate('OtpVerify',{client_id: client_id, mobile_number: mobileNumber, aadhaar_number: aadhaar, mobileNumber: mobileNumber }); 
          }
        } 
        if(mobileNumber && aadhaar){
          // Alert.alert(  "Something went wrong",'Retry', [ { text: "OK", onPress: () => navigation.navigate('SignIn') }] );
        }
      }
     else{
    // Alert.alert("OTP not sent",'Please get OTP.', [ { text: "OK", onPress: () => navigation.navigate('SignIn') } ]);
    navigation.navigate('OtpVerify',{client_id: 'client_id', mobile_number: mobileNumber, aadhaar_number: aadhaar, mobileNumber: mobileNumber }); 
     }
   }
     
   const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/> 
  );
   
    return(
        {nav},
        <SafeAreaView style={{ flex: 1 }}>
          <TopNavigation title='Aadhaar Verification' alignment='center' accessoryLeft={BackAction} style={{fontWeight: 'bold' }}  /> 
          <Divider/>
        <KeyboardAvoidingView 
         style={styles.container}
        > 
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
            <View style={styles.screen}> 
             
            <Image  source={require('../images/aadharSignIn.png')}  style={styles.logo}  /> 

        <View style={{flex:1, justifyContent: 'flex-end', marginBottom: 56}}> 
            <Card style={{height: 300, justifyContent: 'center', backgroundColor: 'white', borderRadius: 10, borderColor: 'white'}}> 
            <Input 
                placeholder='Enter your Aadhaar Number' 
                type="integer"
                onChangeText={setAadhaarHandler}
                size='large' 
                style={styles.inputStyle} 
            /> 
            <Input 
                placeholder='Enter your Registered Mobile Number' 
                type="integer"
                onChangeText={setMobileNumberHandler}
                style={styles.inputStyle} 
                size='large'
             />        
           <View style={{marginTop: 24}}>
                  <TouchableOpacity  onPress={getOtp} style={styles.buttonContainer} activeOpacity={0.6} >  
                      <Text style={styles.buttonText}>{buttonOtp}</Text> 
                  </TouchableOpacity>

                 <TouchableOpacity onPress={nav}  style={styles.buttonContainer} activeOpacity={0.6} >   
                      <Text style={styles.buttonText}>Verify</Text>     
                 </TouchableOpacity>
           </View>
          </Card>
       </View>
      </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView> 
        
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    screen: {
        flex:1,
        padding: 30,
        alignItems: 'center',
        backgroundColor: 'white', 
    },
  buttonContainer: {
    backgroundColor: 'black',
    width: '100%', 
    height: 50,
    alignItems: 'center', 
    justifyContent: 'center',  
    borderRadius: 5,
    marginVertical: 4.5, 
},
  buttonText: {
    color: 'white',
    fontSize: 14, 
    fontFamily: 'Montserrat-Regular'
},
inputStyle: {
  borderColor: 'black',
  borderRadius: 8,
  fontFamily: 'Montserrat-Light', 
  fontSize: 12,
  marginVertical: 4.5,
},
logo: {
  width: 350,
  height: 230,
},

})
export default SignIn;