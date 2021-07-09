import React, { Component,PureComponent } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {  TestPaper } from 'react-native-palmmob3-wrongbook-tools';

let testpaper1 = require('./testpaper1.jpg');
// let testpaper1 = require('./yiti.png');

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.bg} >
        <View style={styles.paper} ><TestPaper paperSrc={testpaper1}  /></View>
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
});
