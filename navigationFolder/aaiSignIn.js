import React, {useState, setState, useEffect} from 'react';
import {View, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback,TouchableOpacity, KeyboardAvoidingView, ScrollView, Button, SafeAreaView, ImageBackground} from 'react-native';
import { Input, Text, Card, Modal } from '@ui-kitten/components';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction,  } from '@ui-kitten/components'; 

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const AAISignIn = ( {route, navigation} ) => {
  
    const [ID, SetID] = useState('');
    const [password, SetPassword] = useState('');

    const setIDHandler = id => {
        SetID(id);
      }
  
      const setPasswordHandler = password => {
        SetPassword(password); 
      } 

      const navigateBack = () => {
        navigation.goBack();
      };
      const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/> 
      );
    

  return (
 <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Airport Authority' alignment='center'  accessoryLeft={BackAction} style={{fontWeight: 'bold', }}  />  
      <Divider/>
    
    <KeyboardAvoidingView 
         style={styles.container}
        > 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
          <View style={styles.screen}> 
          <ImageBackground source={require('../images/airplaneB.jpg')} resizeMode="cover" style={styles.imageBackground}   >
             <Card style={{height: 300, justifyContent: 'center', backgroundColor: '#e6e6e6', borderColor: '#e6e6e6', borderRadius: 10, marginTop: 190, marginHorizontal: 2}}>  
                 <Input placeholder='Enter your AAI ID' onChangeText={setIDHandler} size='large' style={styles.inputStyle} />
                 <Input placeholder='Enter your AAI Password' onChangeText={setPasswordHandler}  size='large' style={styles.inputStyle} /> 
                  
                 <TouchableOpacity  onPress={()=>navigation.navigate('aaiDashboard')}  style={styles.buttonContainer} activeOpacity={0.6} >   
                   <Text style={styles.buttonText}>Authority SignIn</Text>    
                 </TouchableOpacity> 
             </Card>
             </ImageBackground>
          </View>
       </TouchableWithoutFeedback>  
    </KeyboardAvoidingView> 
  
   
</SafeAreaView> 
  );
}; 
 
const styles = StyleSheet.create({
 
content: {
  flexDirection: 'column',
},
text1: {
  

},
container: {
    flex: 1,
},
screen: {
    flex:1,
    backgroundColor: 'white',
    justifyContent: 'center'
},
buttonContainer: {
  backgroundColor: 'black',
  width: '80%', 
  height: 50,
  alignItems: 'center', 
  justifyContent: 'center',  
  borderRadius: 5,
  marginVertical: 30,
  marginHorizontal: '10%',
},
buttonText: {
  color: 'white'
},
inputStyle: {
  borderColor: 'black',
  marginTop: 10,
  borderRadius: 8,
  width: '80%',
  marginHorizontal: '10%'
},
imageBackground: {
  flex: 1,
 height: '100%',
},

});

export default AAISignIn;