import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PassportDrivingSelection } from './passportDriving'; 
import   Scanning   from './scanDocument';
import { Passport } from './passport';
import { Driving } from './driving';
import SignIn from './AadhaarSignIn';
import OtpVerify from './AadhaarOtpVerify';
import FaceMatching from './fatchMatching';
import Profile from './profile';

//
import Welcome from './welcomeScreen';
import AAISignIn from './aaiSignIn'; 
import AAIDashboard from './aaiDashboard';
import PassengerProfileFaceMatch from './passengerProfileMatch';
//import DLAPI from './dlAPI';


const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => ( 
  <Navigator headerMode='none' >  
    <Screen name="welcome" component={Welcome} /> 
    <Screen name='aaiSignIn' component={AAISignIn} /> 
    <Screen name='aaiDashboard' component={AAIDashboard} /> 
    <Screen name="passengerProfileFaceMatch" component={PassengerProfileFaceMatch} /> 


    <Screen name='SignIn' component={SignIn} />
    <Screen name="OtpVerify" component={OtpVerify} />
    <Screen name="passportDrivingSelection" component={PassportDrivingSelection} /> 
    <Screen name='Scan' component={Scanning}  /> 
    <Screen name='passport' component={Passport}  />
    <Screen name="driving" component={Driving} />
    <Screen name='faceMatching' component={FaceMatching} /> 
    <Screen name="profile" component={Profile} /> 
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
); 