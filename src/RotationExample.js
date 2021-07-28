/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component,useState,useEffect } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Alert,
   TouchableOpacity,
   ScrollView,
   Image,
   ImageBackground,
   Platform,
   Dimensions
 } from 'react-native';

import { DragResizeBlock } from './dragable/DragResizeBlock'
import { DragCutBlock } from './dragable/DragCutBlock'

import { 
  CONNECTOR_TOP_LEFT,
  CONNECTOR_TOP_MIDDLE,
  CONNECTOR_TOP_RIGHT,
  CONNECTOR_MIDDLE_RIGHT,
  CONNECTOR_BOTTOM_RIGHT,
  CONNECTOR_BOTTOM_MIDDLE,
  CONNECTOR_BOTTOM_LEFT,
  CONNECTOR_MIDDLE_LEFT,
  CONNECTOR_CENTER,
} from './dragable/Connector'

const CONNECTOR_SIZE = 30;

 const containerInfo = {
   w:300,
   h:500,
 };

 const connectors = [
  CONNECTOR_TOP_LEFT,
  CONNECTOR_TOP_RIGHT,
  CONNECTOR_BOTTOM_LEFT,
  CONNECTOR_BOTTOM_RIGHT,
  CONNECTOR_CENTER
];

const cut_connectors = [
  CONNECTOR_TOP_LEFT,
  // CONNECTOR_TOP_RIGHT,
  // CONNECTOR_BOTTOM_LEFT,
  // CONNECTOR_BOTTOM_RIGHT
];

 const computePaperLayout = (zRotation, imgres, containerInfo) => {
  let imgInfo = Image.resolveAssetSource(imgres);
  let layout = {w:0,h:0,x:0,y:0};

  let container_ratio = containerInfo.w / containerInfo.h;

  if(zRotation % 180 === 0){  //竖排
      let img_ratio = imgInfo.width / imgInfo.height;
      if(container_ratio >= img_ratio){
          console.log('1');
          layout.h = containerInfo.h;
          layout.w = layout.h * img_ratio;              
      } else {
          console.log('2');
          layout.w = containerInfo.w;
          layout.h = layout.w / img_ratio; 
      }
  } else {                        //横排      
      let img_ratio = imgInfo.height / imgInfo.width;  
      if(container_ratio < img_ratio){
          console.log('3');
          layout.h = containerInfo.w;
          layout.w = layout.h / img_ratio;               
      } else {
          console.log('4');
          layout.w = containerInfo.h;
          layout.h = layout.w * img_ratio;
      }
  }
  layout.w = parseInt(layout.w);
  layout.h = parseInt(layout.h);
  layout.x = parseInt((containerInfo.w - layout.w)*0.5);
  layout.y = parseInt((containerInfo.h - layout.h)*0.5);  
  return layout;
 }

 const RotationExample = (props) => {
  
  const [pRotation, setpRotation] = useState(0);

  const onDragEnd = (evt) => {
      console.log(evt);
      // if(props.onDragEnd !== null) {
      //     props.onDragEnd(evt);
      // }
  };

  const onResizeEnd = (info) => {
      console.log(info);
      // if(props.onResizeEnd !== null) {
      //     props.onResizeEnd(info);
      // }
  };

  const onRotatePress = () => {
    console.log('onRotatePress');
    setpRotation((pRotation + 90) % 360);
  };
  
  let rotateStr = pRotation + 'deg';
  let img_rect = computePaperLayout(pRotation, props.paperBg, containerInfo);
  let img_x = img_rect.x;
  let img_y = img_rect.y;

  let limitation1 = {x:0, y:0, w:img_rect.w, h:img_rect.h};

  return (
    <View style={Styles.bg} >
        <View style={Styles.imgcontainer} >
          <ImageBackground source={props.paperBg} resizeMode={'stretch'}
            style={[Styles.imgbg, {width:img_rect.w, height:img_rect.h,  transform: [ {translateX:img_x}, {translateY:img_y}, { rotateZ: rotateStr }] }]}
          >

          <DragCutBlock
              x={0}
              y={0}
              w={img_rect.w}
              h={100}
              limitation={limitation1}
              connectors={cut_connectors}
              // onDragEnd={onDragEnd}
              // onResizeEnd={onResizeEnd}
              connector_size={CONNECTOR_SIZE}
          >
          </DragCutBlock>

          </ImageBackground>
        </View>
        <View style={Styles.toolbar} >
            <TouchableOpacity onPress={onRotatePress} >
                <View  style={Styles.toolbar_rotate}>
                  <Text>旋转</Text>
                </View>
            </TouchableOpacity>
        </View>        
    </View>
  );
};

const Styles = StyleSheet.create({
  bg: {
    flex:1,
    backgroundColor:'#AAAAAA',
    justifyContent:"center",
    alignItems:"center",     
  },
  imgcontainer: {
    backgroundColor:'#FFFFFF',
    justifyContent:"center",
    alignItems:"center",     
    height: containerInfo.h,
    width: containerInfo.w,    
  },  
  imgbg: {
    position:'absolute',
    zIndex: -100,
    top:0,
    left:0,
    borderWidth:1,    
    borderColor:"#00FF00"
  },
  toolbar : {    
    height: 100,
    width: 150,    
    justifyContent:"center",
    alignItems:"center",        
  },
  toolbar_rotate: {
      fontSize:50,
      width:150,
      height:50,
      backgroundColor:"#FFFFFF"
  },   
});

export default RotationExample;