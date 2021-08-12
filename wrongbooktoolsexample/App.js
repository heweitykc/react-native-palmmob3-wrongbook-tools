import React, { Component, PureComponent, useState } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Start from "./Start";

const Stack = createStackNavigator();

export default class TestApp extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode='none' mode='modal' screenOptions={({ route, navigation }) => ({ gestureEnabled: false })}>
                    <Stack.Screen name="Start" component={Start} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}