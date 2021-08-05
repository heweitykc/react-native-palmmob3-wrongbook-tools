import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    Animated
} from 'react-native';

import Utils from "../Utils/Utils";

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            takeType: 1,      //0单题 1整页
            lightOn: false     //0关 1开
        }

        this.trans_x = new Animated.Value(0)
    }

    componentDidMount() {
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
    }

    takeTypeClick = (type) => {
        if (this.state.takeType == type) return
        let tov = type == 0 ? 1 : 0
        Animated.timing(this.trans_x, {
            toValue: tov,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                takeType: type
            })
        })
        this.setUpdateBlock(0, type)
    }

    //0选择相册 1闪光灯 2拍照
    actionBlock = (index) => {
        if (index == 1) {
            this.setState({
                lightOn: !this.state.lightOn
            }, () => {
                this.setUpdateBlock(1, this.state.lightOn)
            })
            return
        }
        this.props.actionBlock && this.props.actionBlock(index)
    }

    //0拍照模式:0单题 1整页   1闪光灯状态:false关 true开
    setUpdateBlock = (type, state) => {
        this.props.setUpdateBlock && this.props.setUpdateBlock(type, state)
    }

    render() {
        let height = Utils.isIPhonex() ? Utils.size(110 + 20) : Utils.size(110)
        let takeType = this.state.takeType
        let lightOn = this.state.lightOn

        let seg_item_w = Utils.size(60)
        const translateX = this.trans_x.interpolate({
            inputRange: [0, 1],
            outputRange: [0, seg_item_w],
        });

        return (
            <View style={[styles.tool, { height }, this.props.style]}>
                <Animated.View style={[styles.tool_seg, { transform: [{ translateX }] }]}>
                    <TouchableHighlight style={styles.tool_seg_item} underlayColor='transparent' activeOpacity={1} onPress={() => { this.takeTypeClick(0) }}>
                        <Text style={[styles.tool_seg_item_t, { color: takeType == 0 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)' }]}>{'排单题'}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.tool_seg_item} underlayColor='transparent' activeOpacity={1} onPress={() => { this.takeTypeClick(1) }}>
                        <Text style={[styles.tool_seg_item_t, { color: takeType == 1 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)' }]}>{'排整页'}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.tool_seg_item}>
                        <Text style={styles.tool_seg_item_t}>{''}</Text>
                    </TouchableHighlight>
                </Animated.View>
                <View style={styles.tool_btns}>
                    <View style={styles.tool_btns_item}>
                        <TouchableHighlight style={styles.tool_btns_item_btn} underlayColor='transparent' activeOpacity={1} onPress={() => { this.actionBlock(0) }}>
                            <Image style={{ width: Utils.size(25), height: Utils.size(25) }} source={require('../Resources/album.png')} />
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight style={styles.tool_btns_item} underlayColor='transparent' activeOpacity={1} onPress={() => { this.actionBlock(2) }}>
                        <View style={styles.tool_btns_item_takev} />
                    </TouchableHighlight>
                    <View style={styles.tool_btns_item}>
                        <TouchableHighlight style={styles.tool_btns_item_btn} underlayColor='transparent' activeOpacity={1} onPress={() => { this.actionBlock(1) }}>
                            <Image style={{ width: Utils.size(30), height: Utils.size(30) }} source={lightOn ? require('../Resources/light_on.png') : require('../Resources/light_off.png')} />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tool: {
        width: Utils.deviceWidth,
        backgroundColor: 'black',
        alignItems: 'stretch'
    },
    tool_seg: {
        height: Utils.size(33),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    tool_seg_item: {
        width: Utils.size(60),
        justifyContent: 'center',
        alignItems: 'center'
    },
    tool_seg_item_t: {
        fontSize: Utils.size(14),
        fontWeight: '600',
        color: '#ffffff'
    },
    tool_btns: {
        marginTop: Utils.size(13),
        height: Utils.size(51),
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    tool_btns_item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tool_btns_item_btn: {
        width: Utils.size(40),
        height: Utils.size(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    tool_btns_item_takev: {
        width: Utils.size(50),
        height: Utils.size(50),
        borderRadius: Utils.size(30),
        borderWidth: 3,
        borderColor: '#ffe600',
        borderStyle: 'solid'
    }
})
