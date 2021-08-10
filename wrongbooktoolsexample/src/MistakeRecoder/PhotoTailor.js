import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, Image, StatusBar } from 'react-native';

import Utils from "./Utils/Utils";
import NavBar from "./Views/NavBar";
import WarpPerspective from "../../libs/WarpPerspective"

export default class PhotoTailor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imgRotation: 0
        }
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content')

    }

    navBack = () => {
        this.props.navigation.pop()
        this.props.route?.params?.backBlock && this.props.route.params.backBlock()
    }

    rotate = () => {
        this.setState({
            imgRotation: this.state.imgRotation + 90
        })
    }

    sure = () => {
        this.props.navigation.navigate('TopicSelect', { imgUri: this.props.route?.params?.imgUri, img_w: this.props.route?.params?.img_w, img_h: this.props.route?.params?.img_h })
    }

    render() {
        const { imgUri, img_w, img_h, isSingle } = this.props.route.params
        let botHeight = Utils.isIPhonex() ? Utils.size(130) + Utils.size(20) : Utils.size(130)
        //
        let navHeight = Platform.OS === 'ios' ? (Utils.isIPhonex() ? 88 : 64) : (44 + Utils.statusBarHeight)
        let midHeight = Utils.deviceHeight - navHeight - botHeight

        return (
            <View style={styles.tailor}>
                <NavBar title={isSingle ? '单题框选' : '选择错题区域'} titleColor='white' hideback bgColor='black' />
                <View style={{ flex: 1 }}>
                    <WarpPerspective dragsize={[150, 50]} regular={isSingle} imgRotation={0} paperBg={{ uri: imgUri }} w={Utils.deviceWidth} h={midHeight} imageSize={{ width: img_w, height: img_h }} style={{ zIndex: (this.state.imgRotation % 360 === 0) ? 1 : 0 }} inUse={(this.state.imgRotation % 360 === 0)} />
                    <WarpPerspective dragsize={[150, 50]} regular={isSingle} imgRotation={90} paperBg={{ uri: imgUri }} w={Utils.deviceWidth} h={midHeight} imageSize={{ width: img_w, height: img_h }} style={{ zIndex: (this.state.imgRotation % 360 === 90) ? 1 : 0 }} inUse={(this.state.imgRotation % 360 === 90)} />
                    <WarpPerspective dragsize={[150, 50]} regular={isSingle} imgRotation={180} paperBg={{ uri: imgUri }} w={Utils.deviceWidth} h={midHeight} imageSize={{ width: img_w, height: img_h }} style={{ zIndex: (this.state.imgRotation % 360 === 180) ? 1 : 0 }} inUse={(this.state.imgRotation % 360 === 180)} />
                    <WarpPerspective dragsize={[150, 50]} regular={isSingle} imgRotation={270} paperBg={{ uri: imgUri }} w={Utils.deviceWidth} h={midHeight} imageSize={{ width: img_w, height: img_h }} style={{ zIndex: (this.state.imgRotation % 360 === 270) ? 1 : 0 }} inUse={(this.state.imgRotation % 360 === 270)} />
                </View>
                <View style={[styles.tailor_bot, { height: botHeight }]}>
                    <Text style={styles.tailor_bot_t}>{isSingle ? '一次仅录入一道题' : '请将黄色边框对准试卷边缘'}</Text>
                    <View style={styles.tailor_bot_btns}>
                        <View style={styles.tailor_bot_btns_item}>
                            <TouchableHighlight style={styles.tailor_bot_btns_item_btn} underlayColor='transparent' activeOpacity={1} onPress={this.navBack}>
                                <Image style={{ width: Utils.size(25), height: Utils.size(25), tintColor: 'white' }} source={require('./Resources/close_black.png')} />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.tailor_bot_btns_item}>
                            <TouchableHighlight style={styles.tailor_bot_btns_item_btn} underlayColor='transparent' activeOpacity={1} onPress={this.sure}>
                                <Image style={{ width: Utils.size(55), height: Utils.size(55) }} source={require('./Resources/xuanzhong_yel.png')} />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.tailor_bot_btns_item}>
                            <TouchableHighlight style={styles.tailor_bot_btns_item_btn} underlayColor='transparent' activeOpacity={1} onPress={this.rotate}>
                                <View style={styles.tailor_bot_btns_item_btn_v}>
                                    <Image style={{ width: Utils.size(25), height: Utils.size(25), tintColor: 'white' }} source={require('./Resources/xuanzhuan.png')} />
                                    {/* <Text style={styles.tailor_bot_btns_item_btn_t}>{'旋转'}</Text> */}
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    tailor: {
        flex: 1,
        alignItems: 'stretch'
    },
    tailor_bot: {
        backgroundColor: 'black',
        alignItems: 'stretch'
    },
    tailor_bot_t: {
        alignSelf: 'center',
        marginTop: Utils.size(15),
        fontSize: Utils.size(15),
        color: '#ffffff',
        fontWeight: '600',
    },
    tailor_bot_btns: {
        marginTop: Utils.size(25),
        height: Utils.size(55),
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    tailor_bot_btns_item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tailor_bot_btns_item_btn: {
        height: Utils.size(55),
        width: Utils.size(55),
        justifyContent: 'center',
        alignItems: 'center'
    },
    tailor_bot_btns_item_btn_v: {
        height: Utils.size(55),
        width: Utils.size(55),
        justifyContent: 'center',
        alignItems: 'center'
    },
    tailor_bot_btns_item_btn_t: {
        marginTop: Utils.size(10),
        fontSize: Utils.size(13),
        color: '#333333',
        fontWeight: '400',
    }
})
