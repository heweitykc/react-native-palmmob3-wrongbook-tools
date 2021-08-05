import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, Image, StatusBar } from 'react-native';

import Utils from "./Utils/Utils";
import NavBar from "./Views/NavBar";

export default class TopicSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {
        StatusBar.setBarStyle('dark-content')

    }

    navBack = () => {
        this.props.navigation.pop()
    }

    rightBtnRender = () => {
        return (
            <TouchableHighlight style={styles.rb}>
                <Text style={styles.rb_t}>{'去除手写'}</Text>
            </TouchableHighlight>
        )
    }

    render() {
        let botHeight = Utils.isIPhonex() ? Utils.size(105) + Utils.size(20) : Utils.size(105)
        return (
            <View style={styles.topic}>
                <NavBar title='选择题干' titleColor='black' bgColor='white' backAction={this.navBack} backImg={require('./Resources/back_black.png')} rightBtnRender={this.rightBtnRender} />
                <View style={{ flex: 1 }}>

                </View>
                <View style={[styles.bot, { height: botHeight }]}>
                    <Text style={styles.bot_t}>{'点击批量选择错题, 长按可编辑错题区域'}</Text>
                    <View style={styles.bot_btns}>
                        <TouchableHighlight style={styles.bot_btns_lb}>
                            <View style={styles.bot_btns_lb_v}>
                                <Image style={styles.bot_btns_lb_img} source={require('./Resources/to_xiangji.png')} />
                                <Text style={styles.bot_btns_lb_t}>{'重拍'}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.bot_btns_lb}>
                            <View style={styles.bot_btns_lb_v}>
                                <Image style={styles.bot_btns_lb_img} source={require('./Resources/to_shouzhi.png')} />
                                <Text style={styles.bot_btns_lb_t}>{'重拍'}</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={styles.bot_btns_rbv}>
                            <TouchableHighlight style={styles.bot_btns_rb}>
                                <Text style={styles.bot_btns_rb_t}>{'选择题干'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


}


const styles = StyleSheet.create({
    topic: {
        flex: 1,
        alignItems: 'stretch'
    },
    rb: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: Utils.size(100),
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rb_t: {
        fontSize: Utils.size(15),
        color: '#333333',
        fontWeight: '600',
    },
    bot: {
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    bot_t: {
        alignSelf: 'flex-start',
        marginTop: Utils.size(15),
        marginLeft: Utils.size(30),
        fontSize: Utils.size(13),
        color: '#666666',
        fontWeight: '400',
    },
    bot_btns: {
        height: Utils.size(75),
        flexDirection: 'row',
        alignItems: 'center'
    },
    bot_btns_lb: {
        width: Utils.size(95),
        height: Utils.size(75),
    },
    bot_btns_lb_v: {
        width: Utils.size(95),
        height: Utils.size(75),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bot_btns_lb_img: {
        width: Utils.size(25),
        height: Utils.size(25),
    },
    bot_btns_lb_t: {
        marginTop: Utils.size(5),
        fontSize: Utils.size(13),
        color: '#333333',
        fontWeight: '600',
    },
    bot_btns_rbv: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    bot_btns_rb: {
        marginRight: Utils.size(20),
        width: Utils.size(105),
        height: Utils.size(38),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        borderRadius: Utils.size(20),
    },
    bot_btns_rb_t: {
        fontSize: Utils.size(15),
        color: '#333333',
        fontWeight: '400',
    }

})
