import React, { Component,PureComponent } from 'react';
import { Platform, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {  TestPaper,TestComponent } from 'react-native-palmmob3-wrongbook-tools';

import {  RotationExample, PanExample } from 'react-native-palmmob3-wrongbook-tools';

let testpaper1 = require('./paper1.jpeg');
// let testpaper1 = require('./testpaper1_zhai.jpg');
// let testpaper1 = require('./yiti.png');
// let testpaper1 = {uri:"http://3.palmmob.com/testres/paper1.jpeg"};

const App = () => {
  return (
    // <RotationExample paperBg={testpaper1}  />
    <PanExample paperBg={testpaper1} w={300} h={500}  />
  );
};

export default App;