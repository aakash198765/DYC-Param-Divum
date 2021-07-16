import React, {useState} from 'react';
import { SafeAreaView, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, List , ListItem,  } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const Driving = ( {route, navigation} ) => {

  //extract params
  const { 
      resultPass,
      name, docNo, dob, age ,gender, birth_place,docType, nationality, dept,  issue_date, expiry_date, portrait, place_of_issue,
      dl_address, dl_endorsed, dl_iss_type,  dl_permit, dl_permit_endorsed,  dl_record_creation,  dl_restriction_cod, image1, aadhaar_number, 
      mobileNumber, 
   } 
   = route.params;

  const details = [  
    {id: 1, field: 'Full Name         ', value: name },
    {id: 2, field: 'D. License No. ', value: docNo  },
    {id: 4, field: 'DOB                  ',  value: dob },  
    {id: 5, field: 'Age                    ',  value: age },
    {id: 7, field: 'Issue Date        ',  value: issue_date},
    {id: 8, field: 'Expiry Date      ',  value: expiry_date },
    {id: 3, field: 'Address ', value: dl_address },
    //{id: 9, field: 'Place of Issue  ',  value: place_of_issue },  
  
  ];   



  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/> 
  );

  const renderItem = ({ item, index }) => (
    <ListItem title={`${item.field}        ${item.value}`}  />
    
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Driving License Details' alignment='center' accessoryLeft={BackAction} style={{fontWeight: 'bold', }} />
      <Divider/>
      <Layout style={{ flex: 1, padding: 20 , backgroundColor: 'white' }}>  
      <Layout style={{  backgroundColor: 'white', justifyContent: 'center', maxHeight: '80%', borderWidth: 2, borderColor: 'black', borderRadius: 20, }}> 
       
        <List
         style={styles.container}
         data={details}
         renderItem={renderItem}  
       /> 


             <Image
                style={{
                  height: 150,
                  width: 150,
                  alignSelf: 'center',
                  borderRadius: 100,
                  borderColor: 'white',
                  marginVertical: 10
                  
                }}
                source={portrait} 
                resizeMode="contain"
              />

      </Layout> 
      <Text></Text>
      {/* <Button title='Facial Recognizition' onPress={()=>navigation.navigate('faceMatching', { portrait: portrait, resultPass: resultPass, image1: image1, aadhaar_number: aadhaar_number,mobileNumber: mobileNumber, name: name, docNo: docNo } )} color='black'  /> */}
      
      <TouchableOpacity  onPress={()=>navigation.navigate('faceMatching', { portrait: portrait, resultPass: resultPass, image1: image1, aadhaar_number: aadhaar_number,mobileNumber: mobileNumber, name: name, docNo: docNo } )} 
          style={styles.buttonContainer} activeOpacity={0.6} >    
             <Text style={styles.buttonText}>               Facial Recognizition             </Text>       
     </TouchableOpacity>
      </Layout>
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
    fontSize: 30,
    fontFamily: 'bold', 
},
buttonContainer: {
  backgroundColor: 'black',
  width: '70%', 
  height: 50,
  alignSelf: 'center', 
  justifyContent: 'center',  
  borderRadius: 5,
  marginVertical: 5,
},
buttonText: {
  color: 'white'
},

}); 

