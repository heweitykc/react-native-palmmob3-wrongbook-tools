import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import SegmentSelector from "./SegmentSelector";

import { launchImageLibrary } from 'react-native-image-picker';
import Hud from "./Views/Hud";

const Stack = createStackNavigator();

export default class Start extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {

    }

    optionSelectResult = (res) => {
        console.log('选择了:', res)
    }

    go = () => {
        this.props.navigation.navigate('Recorder')
    }

    goEdit = () => {
        let opt = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
            maxHeight: 900,
            maxWidth: 900,
        }
        launchImageLibrary(opt, (res) => {
            console.log('res:', res)
            if (res && !res.didCancel) {
                if (res.assets && res.assets[0] && res.assets[0].uri && res.assets[0].uri.length > 0) {
                    this.props.navigation.navigate('Recorder', { screen: 'PhotoEditor', params: { imgUri: res.assets[0].uri, img_w: res.assets[0].width, img_h: res.assets[0].height } })
                    return
                }
                this.hud && this.hud.showTip('无数据,请重新选择')
            }
        })


    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange' }} >
                <SegmentSelector source={[{ title: '导入时间', options: ['全部', '近三天', '近七天', '近一个月'] }, { title: '科目', options: ['全部', '语文', '数学', '英语', '物理', '化学'] }, { title: '熟练程度', options: ['全部', '熟练', '生疏', '不懂'] }]} optionSelect={this.optionSelectResult} />
                <TouchableOpacity style={{ marginTop: 50, width: 100, height: 100, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }} onPress={this.go}>
                    <Text style={{ fontSize: 25, color: 'white' }}>{'GO'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 50, width: 100, height: 100, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }} onPress={this.goEdit}>
                    <Text style={{ fontSize: 25, color: 'white' }}>{'GO EDIT'}</Text>
                </TouchableOpacity>
                <Hud ref={e => this.hud = e} />
            </View>
        )
    }

}