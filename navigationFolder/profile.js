import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, List , ListItem, OverflowMenu, MenuItem  } from '@ui-kitten/components';

import createWallet from '../wallet';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
); 
const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);
const HomeIcon = (props) => (
  <Icon {...props} name='home-outline' />
);
const DashboardIcon = (props) => (
  <Icon {...props} name='options-2-outline'/>
);

const renderTitle = (props) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}> 
    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16}}>Profile</Text> 
  </View>
);

const Profile = ( {route, navigation} ) => {

  const [state, setState] = useState(false);
  const [userId, setUserId] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState(''); 

  const [display, SetDisplay] = useState(true);
  
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

  let data={};

  if(state === true){
  const getData = async () => {
  try {
    const paramId = await AsyncStorage.getItem('paramId')
    const privateKey = await AsyncStorage.getItem('privateKey')
    const publicKey = await AsyncStorage.getItem('publicKey')
    
    if(paramId !== null && privateKey !== null && publicKey !== null) {
      setUserId(paramId);
      setPrivateKey(privateKey);
      setPublicKey(publicKey);
    }
  } catch(e) {
    // error reading value
  }
}
  getData();
  data = {
          "data":{
              "doc_image":image1,
              "self_image": portraitImage,
              "name": name_,
              "doc_no": docNo_,
              "AadharNo": AadharNo,
              "mobileNumber": mobile 
          },
          "From": userId,
          "To": "0x35C7078bc7DA07abF8E73D8bC63043Bf07033c75"
    }
    
  }
  
  const raw = JSON.stringify(data)

  const sendData = () => {
    
          fetch('http://admin:iphone21@168.138.149.7:5984/privateledger', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic YWRtaW46aXBob25lMjE='
          },
          body: raw,
          redirect: 'follow'
          },
          
          )
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
  }; 
  

  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );
  const renderRightActions = () => (
    <React.Fragment> 
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={HomeIcon} title='Home' onPress={()=> navigation.navigate('welcome')} /> 
        <MenuItem accessoryLeft={DashboardIcon} title='Dashboard' onPress={()=> navigation.navigate('passportDrivingSelection')} />
      </OverflowMenu>
    </React.Fragment>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title={renderTitle} alignment='center' accessoryLeft={BackAction}  accessoryRight={renderRightActions} />
      <Divider/>
      <Layout style={{ flex: 1, padding: 20 , backgroundColor: 'white' }}>  
     
   <Layout style={{  backgroundColor: 'white', paddingVertical: 30,  minHeight: 400,  maxHeight: '60%', borderWidth: 2, borderColor: 'black', borderRadius: 8, }}> 
     <View style={{flexDirection: 'column', justifyContent: 'center', marginHorizontal: '7%' }}>
     <Image style={{ height: 140, width: 140, alignSelf: 'center', marginVertical: 10   }}  
                source={portraitImage} 
                resizeMode="contain"
      />  
      
     <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', marginTop: 40}}> 
                 <Text style={{fontWeight: 'bold', fontSize: 20, marginHorizontal: 18,  }}> {name_} </Text>  
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
   
      <View style={{flexDirection: 'column',justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 3}}>  

         
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', marginVertical: 20}}> 
                 <Text style={{fontFamily: 'Montserrat-Light', fontSize: 12, marginHorizontal: 18,  }}> {userId} </Text>  
      </View> 
  { display?
      <TouchableOpacity  style={styles.buttonContainer} activeOpacity={0.6} onPress={() => {createWallet(); setState(true); SetDisplay(false); }}>    
           <Text style={styles.buttonText}> Generate DID</Text>   
       </TouchableOpacity>
        :
        
       <TouchableOpacity   style={styles.buttonContainer} activeOpacity={0.6} onPress={sendData}>    
           <Text style={styles.buttonText}> Share Via Blockchain </Text>   
       </TouchableOpacity>
}
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