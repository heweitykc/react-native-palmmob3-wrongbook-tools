import React, { Component,PureComponent } from 'react';
import { Platform, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {  TestPaper } from 'react-native-palmmob3-wrongbook-tools';

let testpaper1 = require('./paper1.jpeg');
// let testpaper1 = require('./testpaper1_zhai.jpg');
// let testpaper1 = require('./yiti.png');



export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      paperRotation:0
    };
  }

  componentDidMount() {

  }

  onRotate(evt) { console.log(evt) }
  onDragEnd(evt) { console.log(evt) }
  onResizeEnd(evt) { console.log(evt) }

  onRotatePress() {
      // console.log('onRotate',paperLayout);
      // paperLayout.r = (paperLayout.r + 90) % 360;      
      // relayoutPaper();
      // if(props.onRotate !== null) {
      //     props.onRotate(evt);
      // }
      console.log('onRotatePress');
      this.setState((prevState) => ({
          paperRotation: (prevState.paperRotation + 90)%360
      }));          
  };

  render() {
    return (
      <View style={styles.bg} >
        <View style={styles.paper} ><TestPaper paperSrc={testpaper1} paperRotation={this.state.paperRotation} onRotate={this.onRotate} onDragEnd={this.onDragEnd} onResizeEnd={this.onResizeEnd} /></View>
        <View style={styles.toolbar} >
                <TouchableOpacity onPress={this.onRotatePress.bind(this)} >
                    <View  style={styles.toolbar_rotate}><Text>旋转</Text></View>
                </TouchableOpacity>                
            </View>        
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  paper: {    
    backgroundColor: '#000000',
    width: 300,
    height: 500,
    borderWidth: 1,
    borderColor:'#FF00FF',
    alignItems:'center',
  },
  bg: {
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFF00',      
      borderWidth: 1,
      borderColor:'#0000FF'
  },  
  toolbar : {
    height: 100,
    width: '90%',
    // backgroundColor: '#00FFFF',
    justifyContent:"center",
    alignItems:"center",        
  },
  toolbar_rotate: {
      fontSize:50,
      width:150,
      height:50,
      backgroundColor:"#00F0FF"
  },  
});
