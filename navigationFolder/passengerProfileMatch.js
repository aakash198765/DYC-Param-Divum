import React, { Component } from 'react'
import { StyleSheet, View, Button, Text, Image, TouchableHighlight, Alert, SafeAreaView, TouchableOpacity, Keyboard } from 'react-native'
import launchImageLibrary from 'react-native-image-picker'; 
import FaceSDK, { Enum, FaceCaptureResponse, LivenessResponse, MatchFacesResponse, MatchFacesRequest, Image as FaceImage } from '@regulaforensics/react-native-face-api-beta';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction, List , ListItem,  } from '@ui-kitten/components';
import {ProgressBar} from '@react-native-community/progress-bar-android';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );
  
  
  
  const renderTitle = (props) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}> 
      <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16}}>Passenger Profile</Text> 
    </View>
  );

var image1 = new FaceImage()
var image2 = new FaceImage() 

export default class PassengerProfileFaceMatch extends Component {  
  constructor(props) {
    super(props) 

   const { doc_image, doc_no, mobileNumber, name, self_image, AadharNo } = props.route.params;     

    const navigateBack = () => {
        props.navigation.goBack();
      };

   // const { portrait, resultPass, image1, aadhaar_number, mobileNumber , name, docNo } = props.route.params; 

    this.state = { 
       //portrait -- base64 image & imageSet1 -- bitmap image in this scenario -- so set the images accordingly 
      portrait : self_image,  
      imageSet1: doc_image, 
      aadhaar_number: AadharNo,
      mobileNumber: mobileNumber ,
      name: name,
      docNo: doc_no,
      img1: require('../images/portrait.png'), 
      img2: require('../images/portrait.png'), 
      similarity: "Nil", 
    
      BackAction: ()=> <TopNavigationAction icon={BackIcon}  onPress={navigateBack} />,
    }
  }

  pickImage(first) {
    Alert.alert(' "DYC" Would Like to Access the Camera', "", [ 
      { 
        text: "Don't Allow",
        onPress: () => Keyboard.dismiss(),
     }, 
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
    this.setState({ similarity: "Nil" })

   /*if (first) {
      image1.bitmap = base64
      image1.imageType = type
      this.setState({ img1: { uri: "data:image/png;base64," + base64 } }) 
      this.setState({ liveness: "nil" })
    } else */ { 
     // console.log(base64); 

     // setting image 1 while setting image2 itself , so won't need another seperate function -----setImage1---- to update image1 
     image1.bitmap = this.state.imageSet1 
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
      similarity: "Nil",
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
    <SafeAreaView style={{ flex: 1 ,backgroundColor: 'white',  }}>  
       <TopNavigation title={renderTitle} alignment='center' accessoryLeft={this.state.BackAction}   /> 
       <Divider/> 
      <View style={styles.container}>  

          <View style={{ flexDirection: "column", padding: 5, backgroundColor: 'white', marginTop: 50, marginBottom: 40 }}> 
             <View style={{ flexDirection: "row", marginTop: 10, backgroundColor: 'white', justifyContent: 'center', marginVertical: 30, marginRight: 9.5 }}>
                <View style={{ flexDirection: "column"  }}> 
                   <Image style={{ height: 120, width: 120 }}
                       source={this.state.portrait}  /> 
                </View> 
                <View style={{ flexDirection: "column",  marginLeft: 9.5 }}>
                   <TouchableHighlight onPress={() => this.pickImage(false)}> 
                       <Image style={{ height: 120, width: 120 }}
                             source={this.state.img2}  /> 
                       </TouchableHighlight>
                </View> 
             </View>   
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline'}}>  
                 <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, }}> {this.state.name} </Text>
          </View> 

          <View style={{flexDirection: 'column', marginTop: 5, marginBottom: 80}}>   
              <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 65 }}> 
                <View stytle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                   <Text style={styles.text1}> Doc No: </Text> 
                </View>
                <View  stytle={{flex: 1, flexDirection: 'column'}}>  
                   <Text style={{ marginHorizontal: 67, fontFamily: 'Montserrat-Light' }}>  {this.state.docNo} </Text>  
                </View> 
              </View> 

              <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 65 }}> 
                <View stytle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                   <Text style={styles.text1}> Aadhaar No: </Text> 
                </View>
                <View  stytle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>  
                   <Text  style={{ marginHorizontal: 31, fontFamily: 'Montserrat-Light', }}>  {this.state.aadhaar_number} </Text> 
                </View>  
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 65 }}>
                <View stytle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                   <Text style={styles.text1}> Mobile No: </Text> 
                </View>
                <View  stytle={{flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center'}}>  
                   <Text  style={{ marginHorizontal: 45, fontFamily: 'Montserrat-Light', }} >  {this.state.mobileNumber} </Text> 
                </View> 
              </View>  
            </View>  


          <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}> 
               <TouchableOpacity  onPress={() => { this.matchFaces() }}  style={styles.buttonContainer} activeOpacity={0.6} >   
                   <Text style={styles.buttonText}> Match</Text>   
               </TouchableOpacity> 

               <TouchableOpacity onPress={() => { this.clearResults() }}   style={styles.buttonContainer} activeOpacity={0.6} >   
                   <Text style={styles.buttonText}> Clear</Text>   
               </TouchableOpacity> 
          </View> 
        

          <View style={{ flexDirection: 'row' , marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}> 
            <Text style={{  fontFamily: 'Montserrat-Light', fontSize: 16 }}>Similarity: {this.state.similarity}</Text> 
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
    backgroundColor: 'white', 
   
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text1: {
    marginVertical: 5,
    fontSize: 16,
    fontFamily: 'Montserrat-Light',
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
    backgroundColor: 'black', 
    width: '70%', 
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 5,
    marginVertical: 4.5,
},
buttonText: {
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: 14,
},
example: {
  marginVertical: 24,
},

})