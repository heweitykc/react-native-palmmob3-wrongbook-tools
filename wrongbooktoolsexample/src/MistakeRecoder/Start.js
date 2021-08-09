import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PhotoSelect from "./PhotoSelect";
import PhotoTailor from "./PhotoTailor";

import SegmentSelector from "./SegmentSelector";

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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange' }} >
                <SegmentSelector source={[{ title: '导入时间', options: ['全部', '近三天', '近七天', '近一个月'] }, { title: '科目', options: ['全部', '语文', '数学', '英语'] }, { title: '熟练程度', options: ['全部', '熟练', '生疏', '不懂'] }]} />
                <TouchableOpacity style={{ marginTop: 50, width: 100, height: 100, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }} onPress={this.go}>
                    <Text style={{ fontSize: 25, color: 'white' }}>{'GO'}</Text>
                </TouchableOpacity>
            </View>
        )
    }

}