import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PhotoSelect from "./PhotoSelect";
import PhotoTailor from "./PhotoTailor";

const Stack = createStackNavigator();

export default class Start extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {

    }



    go = () => {
        this.props.navigation.navigate('Recorder')
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <TouchableOpacity style={{ width: 100, height: 100, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }} onPress={this.go}>
                    <Text style={{ fontSize: 25, color: 'white' }}>{'GO'}</Text>
                </TouchableOpacity>
            </View>
        )
    }

}