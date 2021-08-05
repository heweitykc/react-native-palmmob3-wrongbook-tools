import React, { Component, PureComponent, useState } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// import {  RotationExample, PanExample } from 'react-native-palmmob3-wrongbook-tools';
import PanExample from "./libs/PanExample"
// import RotationExample from "./libs/RotationExample"
import { launchImageLibrary } from 'react-native-image-picker';

let testpaper1 = require('./demo1.jpg');
// let testpaper1 = require('./paper1.jpeg');
// let testpaper1 = require('./testpaper1_zhai.jpg');
// let testpaper1 = require('./yiti.png');
// let testpaper1 = {uri:"http://3.palmmob.com/testres/paper1.jpeg"};

import Start from "./src/MistakeRecoder/Start";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PhotoSelect from "./src/MistakeRecoder/PhotoSelect";
import PhotoTailor from "./src/MistakeRecoder/PhotoTailor";

const Stack = createStackNavigator();

const RecordStack = createStackNavigator();
const RecordStackScreen = () => {
  return (
    <RecordStack.Navigator
      initialRouteName="PhotoSelect"
      headerMode='none'
      mode='card'
    >
      <Stack.Screen name="PhotoSelect" component={PhotoSelect} />
      <Stack.Screen name="PhotoTailor" component={PhotoTailor} />
    </RecordStack.Navigator >
  )
}

export default class App extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode='none' mode='modal'>
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Recorder" component={RecordStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}