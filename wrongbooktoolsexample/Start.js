import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import SegmentSelector from "../src/Segment/SegmentSelector.js";
import PhotoEditor from "../src/PhotoEditor/PhotoEditor";
import { launchImageLibrary } from 'react-native-image-picker';
import Hud from "../src/Views/Hud";

const Stack = createStackNavigator();

export default class Start extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imgUri: null,
            img_w: null,
            img_h: null
        }
    }

    componentDidMount() {

    }

    optionSelectResult = (res) => {
        console.log('选择了:', res)
    }

    go = () => {
        // this.props.navigation.navigate('Recorder')
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
                    // this.props.navigation.navigate('Recorder', { screen: 'PhotoEditor', params: { imgUri: res.assets[0].uri, img_w: res.assets[0].width, img_h: res.assets[0].height } })

                    //ResultTest 
                    // let oriw = res.assets[0].width
                    // let orih = res.assets[0].height
                    // ImageResizer.createResizedImage(res.assets[0].uri, oriw, orih, 'JPEG', 100, 180, null, false, { mode: 'stretch', onlyScaleDown: false }).then(resizedImage => {
                    //     console.log('resizedImage:', resizedImage)
                    //     this.props.navigation.navigate('Recorder', { screen: 'ResultTest', params: { imgUri: resizedImage.uri } })
                    // })
                    //     .catch(err => {
                    //         console.log(err);
                    //     });

                    this.setState({
                        imgUri: res.assets[0].uri,
                        img_w: res.assets[0].width,
                        img_h: res.assets[0].height
                    }, () => {
                        this.photoEditor && this.photoEditor.show()
                    })

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
                <PhotoEditor ref={e => { this.photoEditor = e }} imgUri={this.state.imgUri} img_w={this.state.img_w} img_h={this.state.img_h} />
                <Hud ref={e => this.hud = e} />
            </View>
        )
    }

}