import React, { Component,PureComponent } from 'react';
import { Platform, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {  TestPaper,TestComponent } from 'react-native-palmmob3-wrongbook-tools';

import {  RotationExample } from 'react-native-palmmob3-wrongbook-tools';

let testpaper1 = require('./paper1.jpeg');
// let testpaper1 = require('./testpaper1_zhai.jpg');
// let testpaper1 = require('./yiti.png');

const App = () => {
  return (
    <RotationExample paperBg={testpaper1}  />
  );
};

export default App;