import React, {useState} from 'react';
import { SafeAreaView, View, StyleSheet, Button, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, List , ListItem,  } from '@ui-kitten/components';


const Welcome = ( {route, navigation} ) => {
 

  return (
    <SafeAreaView style={{ flex: 1 }}> 
    <ImageBackground source={require('../images/airplaneB.jpg')} resizeMode="cover" style={styles.imageBackground}   >
    <View style={{flexDirection: 'row', marginVertical: 60 }}> 
       <View style={{marginTop: 30, marginHorizontal: 10}}> 
          <Image  source={require('../images/aeroplane.png')}  style={styles.logo2}  /> 
       </View>

       <View  style={{ flex: 1,}}> 
          <Text style={styles.text} category='h1'>DIGI</Text>
          <Text style={styles.text} category='h1'>YATRA</Text> 
          <View style={{flexDirection: 'row'}}>
             <Text style={{  marginVertical: 14, fontWeight: 'bold' }} category='s1'> {"⦃param⦄"} </Text>   
             <Image  source={require('../images/logo.png')}  style={styles.logo}  /> 
          </View>
       </View>
    </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 90}}> 
         <Text></Text> 
         <Text></Text>  
        <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}  style={styles.buttonContainer} activeOpacity={0.6} >  
             <Text style={styles.buttonText}>Passenger</Text>  
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('aaiDashboard')}  style={styles.buttonContainer} activeOpacity={0.6} >   
             <Text style={styles.buttonText}>Airport Authority</Text>    
        </TouchableOpacity>
    </View> 

   </ImageBackground>
    </SafeAreaView> 
  );
}; 

const styles = StyleSheet.create({

content: {
  flexDirection: 'column',
},
text1: {
  

},

buttonContainer: {
    backgroundColor: 'black',
    width: '60%', 
    height: 50,
    alignItems: 'center', 
    justifyContent: 'center',  
    borderRadius: 5,
    marginVertical: 10,
},
buttonText: {
    color: 'white'
},
text: {
  fontWeight: 'bold'
},
logo: {
  marginHorizontal: 5,
  marginVertical: 6, 
  width: 55,
  height: 30,
},
logo2: {
  width: 79,
  height: 80,
},
imageBackground: {
  flex: 1,
 height: '100%',
},


}); 

export default Welcome; 

