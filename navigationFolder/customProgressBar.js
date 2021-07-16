import React, { useReducer } from 'react';
import { TextInput, View, StyleSheet, Image, Button, TouchableOpacity, Text } from 'react-native';



export default function CustomProgressBar () {  
    const bar = 80;
  return ( 
        <View style={styles.progressBar}> 
          {
              bar === 20?  
              <View style={{height: '100%', width: '20%' , backgroundColor: 'black', borderRadius: 5 }}></View> 
              : bar === 40?  <View style={{height: '100%', width: '40%' , backgroundColor: 'black', borderRadius: 5 }}>  </View>
              : bar === 60?  <View style={{height: '100%', width: '60%' , backgroundColor: 'black', borderRadius: 5 }}>   </View>  
              : bar === 80?   <View style={{height: '100%', width: '80%' , backgroundColor: 'black', borderRadius: 5 }}>  </View>
              : <View style={{height: '100%', width: '100%' , backgroundColor: 'black', borderRadius: 5 }}>  </View> 
            } 
       </View>
    
    
  );
}


const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
   height: 5,
   width: 200,
   backgroundColor: '#f2f2f2',
   borderRadius: 2,
  },
});