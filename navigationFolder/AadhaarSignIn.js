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
    const [mobileNumber, setMobileNumber] = useState('');
   
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

  

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNTg0MDk4MSwianRpIjoiYjZkNmVmNTUtMzlkMi00ZmUyLWIxMjEtNjAyNzZmNTkxYWY3IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LmRpdnVtQGFhZGhhYXJhcGkuaW8iLCJuYmYiOjE2MjU4NDA5ODEsImV4cCI6MTYyODQzMjk4MSwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInJlYWQiXX19.MYwTYiwNd4Qy0gDNN_XbvGtYJjbtqVnk33mbzG0IsF0");

    
    var raw = JSON.stringify({
    "id_number": aadhaar
    });
    
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    
    const getOtp = () => {
        setOtpSent(true);
        
          fetch("https://sandbox.surepass.io/api/v1/aadhaar-v2/generate-otp", requestOptions)
         .then(response => response.text())
         .then(result => setDetailsHandler(result))
         .catch(error => console.log('error', error));
        
        
    };

    const nav = () => {
      if(otpSent === true){
      let arr=details[0];
      let res=arr.split(' ');
      client_id=res[2].substring(1, res[2].length-2); 
  
      navigation.navigate('OtpVerify',{client_id: client_id, mobile_number: mobileNumber, aadhaar_number: aadhaar, mobileNumber: mobileNumber }); 
      }
     else{
     Alert.alert(  "OTP not sent",'Retry',
     [
       { text: "OK", onPress: () => navigation.navigate('SignIn') }
     ]
     );

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

            <Card style={{height: 300, justifyContent: 'center', backgroundColor: 'white', borderRadius: 10, borderColor: 'white'}}> 
            <Input placeholder='Enter your Aadhaar Number' onChangeText={setAadhaarHandler} size='large' style={{...styles.inputStyle, marginTop: 20}}/>
            <Input placeholder='Enter your Registered Mobile Number' onChangeText={setMobileNumberHandler} style={styles.inputStyle} size='large'/> 
          
           {/* <Button style={styles.button}  onPress={getOtp} title='GET OTP' color='black' /> 
            <Text></Text>
            <Button style={styles.button}  onPress={nav} title='  VERIFY  ' color='black'  /> 
           */} 
           <Text> </Text>
           

            <TouchableOpacity  onPress={getOtp} style={styles.buttonContainer} activeOpacity={0.6} >  
               <Text style={styles.buttonText}>Get OTP</Text> 
           </TouchableOpacity>

           <TouchableOpacity onPress={nav}  style={styles.buttonContainer} activeOpacity={0.6} >   
             <Text style={styles.buttonText}>Verify</Text>     
           </TouchableOpacity>
  
            </Card>
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
    marginVertical: 5,
},
  buttonText: {
    color: 'white'
},
inputStyle: {
  borderColor: 'black',
  marginTop: 10,
  borderRadius: 8,
},
logo: {
  width: 350,
  height: 230,
},

})
export default SignIn;