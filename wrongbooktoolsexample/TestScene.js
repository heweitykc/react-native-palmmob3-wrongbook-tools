import React, { Component,PureComponent,useState } from 'react';
import { Platform, StyleSheet, Text, View,TouchableOpacity } from 'react-native';

// import {  RotationExample, PanExample } from 'react-native-palmmob3-wrongbook-tools';
import PanExample from "./libs/PanExample"
// import RotationExample from "./libs/RotationExample"
import {launchImageLibrary } from 'react-native-image-picker';

let testpaper1 = require('./demo1.jpg');
// let testpaper1 = require('./paper1.jpeg');
// let testpaper1 = require('./testpaper1_zhai.jpg');
// let testpaper1 = require('./yiti.png');
// let testpaper1 = {uri:"http://3.palmmob.com/testres/paper1.jpeg"};

const App = () => {
  const [imgUri,  setImgUri] = useState(null);
  const [imgSize, setImgSize] = useState(null);

  const selectByAlbum = () => {
    let opt = {
        mediaType: 'photo',
        quality: 0.7,      
        maxHeight: 1080,
        maxWidth: 1080,
        includeBase64:false,
    }
    launchImageLibrary(opt, (res) => {                
        let imginfo = res.assets[0];
        console.log(imginfo);
        setImgUri(imginfo.uri);
        setImgSize({width:imginfo.width, height:imginfo.height});
    })
  }

  return (
    // <RotationExample paperBg={testpaper1}  />
    <View style={{flex:1,backgroundColor:'#888888'}} >
      <TouchableOpacity onPress={selectByAlbum}>
        <Text style={{ alignSelf: 'center', marginTop: 55, fontSize: 18 }}>选取相册</Text>
      </TouchableOpacity>  
      {/* <PanExample paperBg={testpaper1} w={300} h={500}  /> */}
      {imgUri &&
        <PanExample paperBg={{uri:imgUri}} w={300} h={500} imageSize={imgSize}  />
      }
    </View>    
  );
};

export default App;