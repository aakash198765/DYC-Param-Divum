import React, { Component } from 'react'
import { StyleSheet, View, Button, Text, Image, TouchableHighlight, Alert, SafeAreaView, TouchableOpacity } from 'react-native'
import launchImageLibrary from 'react-native-image-picker'; 
import FaceSDK, { Enum, FaceCaptureResponse, LivenessResponse, MatchFacesResponse, MatchFacesRequest, Image as FaceImage } from '@regulaforensics/react-native-face-api-beta';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction, List , ListItem,  } from '@ui-kitten/components';
import {ProgressBar} from '@react-native-community/progress-bar-android';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );



var image1 = new FaceImage()
var image2 = new FaceImage() 

export default class PassengerProfileFaceMatch extends Component {  
  constructor(props) {
    super(props) 

   const {name, docNo, aadhaar_number, mobileNumber, portrait, imageSet1} = props.route.params;     

    const navigateBack = () => {
        props.navigation.goBack();
      };

   // const { portrait, resultPass, image1, aadhaar_number, mobileNumber , name, docNo } = props.route.params; 

    this.state = { 
       //portrait -- base64 image & imageSet1 -- bitmap image in this scenario -- so set the images accordingly 
      portrait : require('../images/portrait.png'), 
      imageSet1: require('../images/portrait.png'), 
      aadhaar_number: aadhaar_number,
      mobileNumber: mobileNumber ,
      name: name,
      docNo: docNo,
      img1: require('../images/portrait.png'), 
      img2: require('../images/portrait.png'), 
      similarity: "nil", 
      
      BackAction: ()=> <TopNavigationAction icon={BackIcon}  onPress={navigateBack} />,
    }
  }

  pickImage(first) {
    Alert.alert("Select Option", "", [ 
    /*{ 
      text: "Use gallery",
      onPress: () => launchImageLibrary({ includeBase64: true }, response => {
        this.setImage(first, response.base64, Enum.eInputFaceType.ift_DocumentPrinted)
      })
    },*/
    {
      text: "OK",
      onPress: () => FaceSDK.presentFaceCaptureActivity(result => {
        this.setImage(first, FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap, Enum.eInputFaceType.ift_Live)
      }, e => { })
    }], { cancelable: true })
  } 

  // configure image1 setting so first image can hold the value
  /* setImage1(portrait, imageSet1) {  
      image1.bitmap = imageSet1
      image1.imageType = Enum.eInputFaceType.ift_DocumentPrinted
      this.setState({ img1: portrait })  
      this.setState({ liveness: "nil" }) 
  }
  */ 
  

  setImage(first, base64, type){ 
    if (base64 == null) return
    this.setState({ similarity: "nil" })

   /*if (first) {
      image1.bitmap = base64
      image1.imageType = type
      this.setState({ img1: { uri: "data:image/png;base64," + base64 } }) 
      this.setState({ liveness: "nil" })
    } else */ { 
     // console.log(base64); 

     // setting image 1 while setting image2 itself , so won't need another seperate function -----setImage1---- to update image1 
     image1.bitmap = this.state.portrait.base64 
     image1.imageType = Enum.eInputFaceType.ift_DocumentPrinted 
     this.setState({ portrait: this.state.portrait })  

     //


      image2.bitmap = base64
      image2.imageType = type 
      this.setState({ img2: { uri: "data:image/png;base64," + base64 } })  
    }
  }

  clearResults() {
    this.setState({ 
      img1: require('../images/portrait.png'), 
      img2: require('../images/portrait.png'),
      similarity: "nil",
     })
    image1 = new FaceImage()
    image2 = new FaceImage()
  }

  matchFaces() {
    if (image1 == null || image1.bitmap == null || image1.bitmap == "" ||  image2 == null || image2.bitmap == null || image2.bitmap == "")
      return this.setState({similarity: "Invalid Image"}) 
    this.setState({ similarity: "Processing..." })

    const request = new MatchFacesRequest()
    request.images = [image1, image2] 

    FaceSDK.matchFaces(JSON.stringify(request), response => {
      response = MatchFacesResponse.fromJson(JSON.parse(response)) 
      matchedFaces = response.matchedFaces 
      this.setState({ similarity: matchedFaces.length > 0 ? ((matchedFaces[0].similarity * 100).toFixed(2) + "%" + "  Matched") : " Not Matched" })
    }, e => { this.setState({ similarity: e }) })
  }


  render() {
    return ( 
    <SafeAreaView style={{ flex: 1 ,backgroundColor: '#f2f2f2',  }}>  
       <TopNavigation title='Passenger Profile' alignment='center' accessoryLeft={this.state.BackAction} style={{fontWeight: 'bold', }}  /> 
       <Divider/> 
      <View style={styles.container}>  

          <View style={{ flexDirection: "column", padding: 5, backgroundColor: '#f2f2f2', }}> 
           <View style={{ flexDirection: "column", marginTop: 10, backgroundColor: '#f2f2f2', marginBottom: 10, marginHorizontal: 5, borderRadius: 5  }}>
                <View style={{ flexDirection: "column", alignItems: "center", marginTop: 10, backgroundColor: '#f2f2f2', marginBottom: 30,  }}> 
                   <Image style={{ height: 150, width: 150, borderRadius: 100, marginVertical: 30 }}
                       source={this.state.portrait}  /> 
                </View>

                <Text style={styles.text1}> Full Name:        {this.state.name} </Text>
                <Text style={styles.text1}> Doc No:             {this.state.docNo} </Text> 
                <Text style={styles.text1}> Aadhaar No:     {this.state.aadhaar_number} </Text>
                <Text style={styles.text1}> Mobile No:        {this.state.mobileNumber} </Text>  
                <Text></Text> 
            </View> 

             

            <View style={{ flexDirection: "column", alignItems: "center" , marginVertical: 5,  backgroundColor: '#f2f2f2', }}>
              <TouchableHighlight onPress={() => this.pickImage(false)}>
                <Image style={{ height: 150, width: 150, borderRadius: 100 }}
                       source={this.state.img2}  />
              </TouchableHighlight>
            </View>
          </View>

          <View style={{ flexDirection: 'column', width: "100%", alignItems: "center", backgroundColor: '#f2f2f2', }}>
            <View style={{ padding: 3, width: "75%" }}>
              <Button color='black' onPress={() => { this.matchFaces() }}
                      title="     Match     " />
            </View>
           
            <View style={{ padding: 3, width: "75%", backgroundColor: '#f2f2f2', }}>
              <Button color='black' onPress={() => { this.clearResults() }}
                      title="Clear" />
            </View>
          </View> 
        

          <View style={{ flexDirection: 'row' , marginVertical: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2', }}>
            <Text style={{ marginLeft: -20, fontSize: 18 }}>Similarity: {this.state.similarity}</Text> 
          </View> 


        </View> 
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1, 
    backgroundColor: '#f2f2f2', 
   
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text1: {
    marginVertical: 10,
    fontSize: 16,
    marginHorizontal: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  resultsScreenBackButton: {
    position: 'absolute',
    bottom: 0,
    right: 20
  },
  buttonContainer: {
    backgroundColor: '#bf8040', 
    width: '40%', 
    height: 40,
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 3,
    marginVertical: 10,
},
buttonText: {
    color: 'white'
},
example: {
  marginVertical: 24,
},
})