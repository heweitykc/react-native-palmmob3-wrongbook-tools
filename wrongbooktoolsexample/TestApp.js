import React, { Component, PureComponent, useState } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Start from "./src/MistakeRecoder/Start";
import PhotoSelect from "./src/MistakeRecoder/PhotoSelect";
import PhotoTailor from "./src/MistakeRecoder/PhotoTailor";
import TopicSelect from "./src/MistakeRecoder/TopicSelect";
import ManualSelect from "./src/MistakeRecoder/ManualSelect";

const Stack = createStackNavigator();

const RecordStack = createStackNavigator();
const RecordStackScreen = () => {
    return (
        <RecordStack.Navigator initialRouteName="PhotoSelect" headerMode='none' screenOptions={({ route, navigation }) => ({ gestureEnabled: false })}>
            <RecordStack.Screen name="PhotoSelect" component={PhotoSelect} />
            <RecordStack.Screen name="PhotoTailor" component={PhotoTailor} />
            <RecordStack.Screen name="TopicSelect" component={TopicSelect} />
            <RecordStack.Screen name="ManualSelect" component={ManualSelect} />
        </RecordStack.Navigator >
    )
}

export default class TestApp extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode='none' mode='modal' screenOptions={({ route, navigation }) => ({ gestureEnabled: false })}>
                    <Stack.Screen name="Start" component={Start} />
                    <Stack.Screen name="Recorder" component={RecordStackScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}