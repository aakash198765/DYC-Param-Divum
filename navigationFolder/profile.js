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
     
   <Layout style={{  backgroundColor: 'white', paddingVertical: 30,  minHeight: 500,  maxHeight: '80%', borderWidth: 2, borderColor: 'black', borderRadius: 20, }}> 
     <View style={{flexDirection: 'column', justifyContent: 'center', marginHorizontal: '7%' }}>
     <Image style={{ height: 140, width: 140, alignSelf: 'center', marginVertical: 10   }}  
                source={portraitImage} 
                resizeMode="contain"
      />  

     <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', marginTop: 40}}> 
                 <Text style={{fontWeight: 'bold', fontSize: 20, }}> {name_} </Text>
      </View> 

      <View style={{flexDirection: 'column', marginVertical: 5}}>   
              <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 40 }}>   
                <View stytle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                   <Text style={styles.text1}> Doc No: </Text> 
                </View>
                <View  stytle={{flex: 1, flexDirection: 'column'}}>  
                   <Text style={{ marginHorizontal: 40 }}> {docNo_} </Text>  
                </View> 
              </View> 

              <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 40 }}> 
                <View stytle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                   <Text style={styles.text1}> Aadhaar No: </Text> 
                </View>
                <View  stytle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>  
                   <Text  style={{ marginHorizontal: 8 }}>  {AadharNo} </Text>  
                </View>  
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 40 }}>
                <View stytle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                   <Text style={styles.text1}> Mobile No: </Text> 
                </View>
                <View  stytle={{flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center'}}>  
                   <Text  style={{ marginHorizontal: 20 }} >  {mobile} </Text> 
                </View>  
              </View>  
      </View>  


    </View>
    </Layout>
   
      <View style={{flexDirection: 'column',justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 3}}>  
      <TouchableOpacity  style={styles.buttonContainer} activeOpacity={0.6} >   
           <Text style={styles.buttonText}> Generate DID</Text>   
       </TouchableOpacity>

       <TouchableOpacity   style={styles.buttonContainer} activeOpacity={0.6} >    
           <Text style={styles.buttonText}> Share Via Blockchain </Text>   
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
    marginVertical: 4.5,
},
buttonText: {
    color: 'white',
    fontFamily: 'Montserrate-Regular',
    fontSize: 14,
},
text1: {
  marginVertical: 5,
  fontSize: 16,
  marginRight: 0, 
},


});

export default Profile;