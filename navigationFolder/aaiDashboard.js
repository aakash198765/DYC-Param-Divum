import React, { useState, setState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Keyboard, TouchableOpacity, KeyboardAvoidingView, ScrollView, Button, SafeAreaView } from 'react-native';
import { Input, Text, Card, Modal, Spinner } from '@ui-kitten/components';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction, } from '@ui-kitten/components';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
); 

const renderTitle = (props) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}> 
      <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16}}>Passenger List</Text> 
    </View>
  );

const AAIDashboard = ({ route, navigation }) => {
    const [data, setData] = useState({});
    const [dataBody, setDataBody] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);
    
    const raw_1 = {
        "selector": {
            "To": "0x35C7078bc7DA07abF8E73D8bC63043Bf07033c75"
        }
    };
    const getData = () => {
        return fetch('http://admin:iphone21@168.138.149.7:5984/privateledger/_find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46aXBob25lMjE='
            },
            body: JSON.stringify(raw_1),
            redirect: 'follow'
        }).then(response =>{
                 return response.json();
            }).then(result =>{
                if(result){
                    data_out(result);
                }
                setData(result);
                return result;
            }).catch(error => {
                return error
            }).finally(() => { 
                setShowSpinner(false); 
            })
    }
    useEffect(() => {
        getData();
    }, []); 

    const data_out = (data) => { 
        let document = data.docs
        let docArray = dataBody
        for (const ele in document) {
            let doc_image = document[ele].data.doc_image;
            let doc_no = document[ele].data.doc_no;
            let mobileNumber = document[ele].data.mobileNumber;
            let AadharNo = document[ele].data.AadharNo;
            let name = document[ele].data.name;
            let self_image = document[ele].data.self_image;
            let dataList = { doc_image, doc_no, mobileNumber, name, self_image, AadharNo };
            docArray.push(dataList);
        }
        setDataBody([...docArray]);   
    }
    const navigateBack = () => {
        navigation.goBack(); 
    };
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    ); 

    const renderFlatList = ({ item }) => (
       <>
            <TouchableOpacity 
                key={item.id} 
                activeOpacity={0.6} 
                style={styles.item} 
                onPress={()=>
                        navigation.navigate('passengerProfileFaceMatch', {
                            doc_image: item.doc_image, 
                            doc_no: item.doc_no, 
                            mobileNumber: item.mobileNumber,
                            name: item.name, 
                            self_image: item.self_image, 
                            AadharNo: item.AadharNo
                            }
                        )}
        > 
          <Text style={styles.title}>{item.name ? item.name : ' - ' }</Text>
          <Text style={styles.title}>{item.doc_no ? item.doc_no : ' - ' }</Text>
        </TouchableOpacity> 
    </>
  )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title={renderTitle} alignment='center' accessoryLeft={BackAction} />
            <Divider />
            {
                showSpinner ?
                <View style={styles.loading}>
                    <Pulse size={15} color="#000000" />
                </View>
                :
                <View  style={styles.screen}>
                    <FlatList 
                        data={dataBody}
                        renderItem={renderFlatList}
                    />
                </View>
            }
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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