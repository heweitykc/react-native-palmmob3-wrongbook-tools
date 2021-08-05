import React, { Component,PureComponent,useState } from 'react';
import { Platform, StyleSheet, Text, View,TouchableOpacity } from 'react-native';

// import {  RotationExample, PanExample } from 'react-native-palmmob3-wrongbook-tools';
import WarpPerspective from "./libs/WarpPerspective"
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
  const [imgRotation, setImgRotation] = useState(0);

  const DragSize = [150,50];

  const rotateImg = () => {
    setImgRotation((imgRotation+90)%360);
  }

  const selectByAlbum = () => {
    let opt = {
        mediaType: 'photo',
        quality: 0.7,      
        maxHeight: 1080,
        maxWidth: 1080,
        includeBase64:false,
    }
    
    launchImageLibrary(opt, (res) => {
        if(!res.assets) {
          return;
        }         
        let imginfo = res.assets[0];
        console.log(imginfo);
        setImgSize({width:imginfo.width, height:imginfo.height});
        setImgUri(imginfo.uri);
    })
  }

  return (    
    <View style={{flex:1,alignItems:"center", justifyContent:"center",backgroundColor:'#888888'}} >
      <TouchableOpacity onPress={selectByAlbum}>
        <Text style={{ alignSelf: 'center', marginTop: 55, fontSize: 18 }}>选取相册</Text>
      </TouchableOpacity>  
      {imgUri &&
        <WarpPerspective dragsize={DragSize} regular={false} imgRotation={imgRotation} paperBg={{uri:imgUri}} w={300} h={500} imageSize={imgSize}  />
      }
      <TouchableOpacity onPress={rotateImg}>
        <Text style={{ alignSelf: 'center', marginTop: 55, fontSize: 18 }}>旋转图片</Text>
      </TouchableOpacity>        
    </View>    
  );
};

export default App;