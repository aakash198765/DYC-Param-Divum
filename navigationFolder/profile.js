import React, {useState} from 'react';
import { SafeAreaView, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, List , ListItem,  } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const Profile = ( {route, navigation} ) => {

  
  const {  name, docNo , portrait, image, aadhaar_number, mobileNumber } = route.params; 

 const name_ = name;
 const portraitImage =  portrait;
 const docNo_ = docNo; 
 const AadharNo =  aadhaar_number;
 const image1 = image;
 const mobile = mobileNumber;

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/> 
  );



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Profile' alignment='center' accessoryLeft={BackAction} style={{fontWeight: 'bold', }} />
      <Divider/>
      <Layout style={{ flex: 1, padding: 20 , backgroundColor: 'white' }}>  
     
      <Layout style={{  backgroundColor: 'white', justifyContent: 'center', minHeight: 500,  maxHeight: '80%', borderWidth: 2, borderColor: 'black', borderRadius: 20, }}> 
     <View style={{flexDirection: 'column', justifyContent: 'center', marginHorizontal: '7%' }}>
     <Image style={{ height: 150, width: 150, alignSelf: 'center', borderRadius: 100, borderColor: 'white', marginVertical: 40   }} 
                source={portraitImage} 
                resizeMode="contain"
      />  

        <Text style={styles.text1}> Full Name:        {name_} </Text>
        <Text style={styles.text1}> Doc No:             {docNo_} </Text>
        <Text style={styles.text1}> Aadhaar No:     {AadharNo} </Text>
        <Text style={styles.text1}> Mobile No:        {mobile} </Text>  
    </View>
    </Layout>
   
      <View style={{flexDirection: 'column',justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 3}}>  
      <TouchableOpacity  style={styles.buttonContainer} activeOpacity={0.6} >   
           <Text style={styles.buttonText}> Generate ID</Text>   
       </TouchableOpacity>

       <TouchableOpacity   style={styles.buttonContainer} activeOpacity={0.6} >   
           <Text style={styles.buttonText}> Share Via AAI </Text>   
       </TouchableOpacity>
     </View>
      
     
      </Layout>
    </SafeAreaView> 
  );
}; 

const styles = StyleSheet.create({

content: {
  flexDirection: 'column',
},
text1: {
  marginVertical: 5,
  fontSize: 16,
},
container: {
    fontSize: 30,
    fontFamily: 'bold', 
},
buttonContainer: {
    backgroundColor: 'black', 
    width: '70%', 
    height: 50,
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 8,
    marginVertical: 10,
},
buttonText: {
    color: 'white'
}


});

export default Profile;