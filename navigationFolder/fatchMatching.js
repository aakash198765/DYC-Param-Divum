import React, { Component } from 'react'
import { StyleSheet, View, Button, Text, Image, TouchableHighlight, Alert, SafeAreaView, TouchableOpacity } from 'react-native'
import launchImageLibrary from 'react-native-image-picker'; 
import FaceSDK, { Enum, FaceCaptureResponse, LivenessResponse, MatchFacesResponse, MatchFacesRequest, Image as FaceImage } from '@regulaforensics/react-native-face-api-beta';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction, List , ListItem,  } from '@ui-kitten/components';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );



var image1 = new FaceImage()
var image2 = new FaceImage() 

export default class FaceMatching extends Component { 
  constructor(props) {
    super(props) 

    const navigateBack = () => {
        props.navigation.goBack();
      };

    const { portrait, resultPass, image1, aadhaar_number, mobileNumber , name, docNo } = props.route.params; 
    this.state = { 
      portrait : portrait,
      imageSet1: image1,
      aadhaar_number: aadhaar_number,
      mobileNumber: mobileNumber,
      name: name,
      docNo: docNo, 
      img1: require('../images/portrait.png'), 
      img2: require('../images/portrait.png'),
      similarity: "nil",
      liveness: "nil",
      BackAction: ()=> <TopNavigationAction icon={BackIcon}  onPress={navigateBack} />,
      profile: ()=> props.navigation.navigate('profile', { portrait: this.state.portrait, image: this.state.imageSet1, aadhaar_number: this.state.aadhaar_number, mobileNumber: this.state.mobileNumber, 
                                                           name: this.state.name, docNo: this.state.docNo, 
                                               }), 
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
     image1.bitmap = this.state.imageSet1
     image1.imageType = Enum.eInputFaceType.ift_DocumentPrinted
     this.setState({ img1: this.state.portrait })  
     this.setState({ liveness: "nil" }) 
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
      liveness: "nil"
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

  liveness() {
    FaceSDK.startLiveness(result => {
      result = LivenessResponse.fromJson(JSON.parse(result))
      
      this.setImage(true, result.bitmap, Enum.eInputFaceType.ift_Live)
      if(result.bitmap != null)
        this.setState({ liveness: result["liveness"] == 0 ? "passed" : "unknown" })  
    }, e => { })
  }

  render() {
    return ( 
    <SafeAreaView style={{ flex: 1 ,  }}> 
       <TopNavigation title='Facial Recognizition' alignment='center' accessoryLeft={this.state.BackAction} style={{fontWeight: 'bold', }}  />
       <Divider/> 
      <View style={styles.container}>  
        <View style={styles.container}> 
          <View style={{ flexDirection: "row", padding: 5 , marginTop: 60, marginBottom: 30 }}>  
            <View style={{ flexDirection: "column", alignItems: "center", marginVertical: 5,  }}>
                <Image
                  style={{
                    height: 130,
                    width: 140,
                  }}
                  source={this.state.portrait}   
                  /> 
            </View> 
            <View style={{ flexDirection: "column", alignItems: "center" , marginVertical: 5,  }}> 
              <TouchableHighlight onPress={() => this.pickImage(false)}>
                <Image
                  style={{
                    height: 130,
                    width: 140,
                  }}
                  source={this.state.img2}
                   />
              </TouchableHighlight>
            </View>
          </View>

        <View style={{ flexDirection: 'column', width: "100%", alignItems: "center", marginVertical: 40,  }}> 

          <TouchableOpacity  style={styles.buttonContainer} activeOpacity={0.6} onPress={() => { this.matchFaces() }}  >   
                <Text style={styles.buttonText}> Match </Text>   
           </TouchableOpacity> 

           <TouchableOpacity  style={styles.buttonContainer} activeOpacity={0.6}  onPress={() => { this.liveness() }}  >   
                <Text style={styles.buttonText}> Liveness</Text>   
           </TouchableOpacity> 

           <TouchableOpacity  style={styles.buttonContainer} activeOpacity={0.6}  onPress={() => { this.clearResults() }}  >   
                <Text style={styles.buttonText}> Clear </Text>   
           </TouchableOpacity> 

        </View> 
          <View style={{ flexDirection: 'row' , marginVertical: 10,  }}>
            <Text style={{ marginLeft: -20, fontSize: 14 }}>Similarity: {this.state.similarity}</Text> 
            <Text style={{ marginLeft: 20, fontSize: 14 }}>Liveness: {this.state.liveness}</Text> 
          </View>
        </View> 
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 50, marginBottom: 5}}> 
           <TouchableOpacity  style={styles.buttonContainer} activeOpacity={0.6} onPress={this.state.profile} >   
                <Text style={styles.buttonText}>Profile</Text>   
           </TouchableOpacity> 
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
    alignItems: 'center', 
    backgroundColor: 'white',
   
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
    width: '60%', 
    height: 45,
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 6,
    marginVertical: 4.5,
},
buttonText: {
    color: 'white',
    fontFamily: 'Montserrate-Regular',
    fontSize: 14, 
}
})