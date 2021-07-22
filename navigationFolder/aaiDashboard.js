import React, { useState, setState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Keyboard, TouchableOpacity, KeyboardAvoidingView, ScrollView, Button, SafeAreaView } from 'react-native';
import { Input, Text, Card, Modal } from '@ui-kitten/components';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction, } from '@ui-kitten/components';
const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
); 

const renderTitle = (props) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}> 
      <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16}}>Passenger List</Text> 
    </View>
  );

/*
const renderItem = ( {item} ) =>(
console.log("name")
  
  <View style={styles.item}>
     <Text style={styles.title}>name: {item.name} </Text>   
   </View> 
 
)
*/
// const RenderItemList = (data) => {
//     console.log(data);
//     return (
//         <ScrollView>
//             { /*
//      data.map((item, index) => (
//         <View key = {item.id} style = {styles.item}>
//            <Text>{item.name}</Text>
//         </View>
//       ))
//       */
//             }
//         </ScrollView>
//     );
// };
/*
const renderFlatList = ({ item }) => (
    <TouchableOpacity key={item.id} style={styles.item} onPress={()=>navigation.navigate('passengerProfileFaceMatch', {doc_image: item.doc_image, doc_no: item.doc_no, mobileNumber: item.mobileNumber,
                                                                                                                        name: item.name, self_image: item.self_image
                                                                                                                      })}> 
        <Text style={styles.title}>{item.name ? item.name : 'Name is empty' }</Text>
        <Text style={styles.title}>{item.doc_no ? item.doc_no : 'Doc No.  is empty' }</Text>
    </TouchableOpacity> 
)
*/

const AAIDashboard = ({ route, navigation }) => {
    const [data, setData] = useState({});
    const [dataBody, setDataBody] = useState([]);
    //var document = data.docs;
   // var dataBody = [];
    const raw_1 = {
        "selector": {
            "To": "0x35C7078bc7DA07abF8E73D8bC63043Bf07033c75"
        }
    };
    const getData = async () => {
        fetch('http://admin:iphone21@168.138.149.7:5984/privateledger/_find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46aXBob25lMjE='
            },
            body: JSON.stringify(raw_1),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log('error', error))
            .finally(() => { data_out() })
    }
    useEffect(() => {
        getData();
        //data_out();
        /*  document = data.docs;
        for( const ele in document){ 
            dataBody[ele] = document[ele].data; 
          } 
         console.log(dataBody); */
    }, []); 

    const data_out = () => { 
       //total data
        // console.log(data);
        let document = data.docs
        let docArray = dataBody
        for (const ele in document) {
            //console.log(document[ele].data.doc_image);
            let doc_image = document[ele].data.doc_image;
            // console.log(doc_image);
            let doc_no = document[ele].data.doc_no;
            // console.log(doc_no);
            let mobileNumber = document[ele].data.mobileNumber;
            // console.log(mobileNumber);
            let AadharNo = document[ele].data.AadharNo;
            // console.log(AadharNo);
            let name = document[ele].data.name;
            // console.log(name);
            let self_image = document[ele].data.self_image;
            // console.log(self_image);
            let dataList = { doc_image, doc_no, mobileNumber, name, self_image, AadharNo };
            docArray.push(dataList);
        }
        setDataBody([...docArray])   
        //console.log(dataBody[0]);
        // console.log(typeof(dataBody)); 
    }
    const navigateBack = () => {
        navigation.goBack(); 
    };
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    ); 

    const CustomButton = () => (
      <TouchableOpacity  style={styles.buttonContainer} activeOpacity={0.6} onPress={() => data_out()}>   
          <Text style={styles.buttonText}> Passenger List</Text>   
      </TouchableOpacity>
    ); 

    const renderFlatList = ({ item }) => (
      <TouchableOpacity key={item.id} activeOpacity={0.6} style={styles.item} onPress={()=>navigation.navigate('passengerProfileFaceMatch', {doc_image: item.doc_image, doc_no: item.doc_no, mobileNumber: item.mobileNumber,
                                                                                                                          name: item.name, self_image: item.self_image, AadharNo: item.AadharNo
                                                                                                                        })}> 
          <Text style={styles.title}>{item.name ? item.name : 'Name is empty' }</Text>
          <Text style={styles.title}>{item.doc_no ? item.doc_no : 'Doc No.  is empty' }</Text>
      </TouchableOpacity> 
  )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title={renderTitle} alignment='center' accessoryLeft={BackAction} />
            <Divider />
            <View style={styles.screen}>
                {/* <Button title="data" onPress={data_out}/> */} 

                {dataBody.length === 0 ? <CustomButton /> : <FlatList
                    data={dataBody}
                    renderItem={renderFlatList}  
                />} 
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        margin: 2,
        margin: 20,
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    text1: {
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        padding: 10,
        marginVertical: 2.5,
        marginHorizontal: '1%',
        width: '98%',
        height: 45,
        borderRadius: 5,
    },
    title: {
        color: 'white',
        fontFamily: 'Montserrate-SemiBold',
        fontSize: 14,
    },
    example: {
        marginVertical: 24,
    },
    buttonContainer: { 
      backgroundColor: 'black', 
      width: '60%', 
      height: 40, 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderRadius: 8,
      marginVertical: 4.5,
      marginHorizontal: 75
  },
  buttonText: {
      color: 'white',
      fontFamily: 'Montserrate-Light',
      fontSize: 14,
  },
});
export default AAIDashboard; 