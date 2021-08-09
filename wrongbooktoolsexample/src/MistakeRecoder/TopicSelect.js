import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, Image, StatusBar } from 'react-native';

import Utils from "./Utils/Utils";
import NavBar from "./Views/NavBar";
import TopicMarker from "../../libs/TopicMarker";
import * as LIBUtils from "../../libs/Utils";

export default class TopicSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            markers: [],
            selMarkerIndexs: []
        }
    }

    componentDidMount() {
        StatusBar.setBarStyle('dark-content')

    }

    navBack = () => {
        this.props.navigation.pop()
    }

    //手动框选
    manual = () => {
        this.props.navigation.navigate('ManualSelect', { imgUri: this.props.route?.params?.imgUri, img_w: this.props.route?.params?.img_w, img_h: this.props.route?.params?.img_h, addMark: (pdata) => { this.addMark(pdata) } })
    }

    //长按
    markLongClick = (i, points, img_size, img_rect) => {
        let ratio_w = img_size.width / img_rect.w
        let ratio_h = img_size.height / img_rect.h
        let eidtPs = [{ x: points[0].x / ratio_w, y: points[0].y / ratio_h }, { x: points[1].x / ratio_w, y: points[1].y / ratio_h }, { x: points[2].x / ratio_w, y: points[2].y / ratio_h }, { x: points[3].x / ratio_w, y: points[3].y / ratio_h }]
        this.props.navigation.navigate('ManualSelect', { imgUri: this.props.route?.params?.imgUri, img_w: this.props.route?.params?.img_w, img_h: this.props.route?.params?.img_h, isEdit: true, editPoints: eidtPs, updateMark: (pdata) => { this.updateMark(i, pdata) }, deleteMark: () => { this.deleteMark(i) } })
    }

    //勾选单题
    markStateChange = (i, selected) => {
        let mks = this.state.markers
        if (!mks || mks.length < i + 1) return
        mks[i].isselected = selected
        this.setState({
            markers: mks,
            selMarkerIndexs: this.getSelMarkers(mks)
        })
    }

    addMark = (pdata) => {
        if (!pdata || pdata.length < 4) return
        let mks = this.state.markers.concat({ points: pdata, isselected: true })
        this.setState({
            markers: mks,
            selMarkerIndexs: this.getSelMarkers(mks)
        })
    }

    updateMark = (i, pdata) => {
        let mks = this.state.markers
        if (!mks || mks.length < i + 1) return
        mks[i].points = pdata
        this.setState({
            markers: mks,
            selMarkerIndexs: this.getSelMarkers(mks)
        })
    }

    deleteMark = (i) => {
        let mks = this.state.markers
        if (!mks || mks.length < i + 1) return
        mks.splice(i, 1)
        this.setState({
            markers: mks,
            selMarkerIndexs: this.getSelMarkers(mks)
        })
    }

    //
    getSelMarkers = (markers) => {
        let mks = markers ? markers : this.state.markers
        if (!mks || mks.length < 1) return
        let sels = []
        for (let i = 0; i < mks.length; i++) {
            const mk = mks[i]
            if (mk.isselected) {
                sels.push(i)
            }
        }
        return sels
    }

    sure = async () => {
        let selMarkers = []
        for (let index in this.state.selMarkerIndexs) {
            selMarkers.push(this.state.markers[index].points)
        }

        let cropResult = await LIBUtils.Utils.imgCrop(this.props.route?.params?.imgUri, selMarkers)

        console.log('cropResult:', cropResult)

        this.props.navigation.navigate('ResultTest', { imgUri: cropResult[0] })
    }

    rightBtnRender = () => {
        return (
            <TouchableHighlight style={styles.rb}>
                <Text style={styles.rb_t}>{'去除手写'}</Text>
            </TouchableHighlight>
        )
    }

    render() {
        const { imgUri, img_w, img_h } = this.props.route.params

        let botHeight = Utils.isIPhonex() ? Utils.size(105) + Utils.size(20) : Utils.size(105)
        //
        let navHeight = Platform.OS === 'ios' ? (Utils.isIPhonex() ? 88 : 64) : (44 + Utils.statusBarHeight)
        let midHeight = Utils.deviceHeight - navHeight - botHeight

        let sels = this.state.selMarkerIndexs ? this.state.selMarkerIndexs : []

        return (
            <View style={styles.topic}>
                <NavBar title='选择题干' titleColor='black' bgColor='white' backAction={this.navBack} backImg={require('./Resources/back_black.png')} rightBtnRender={this.rightBtnRender} />
                <View style={{ flex: 1 }}>
                    <TopicMarker ref={e => { this.marker = e }} img={{ uri: imgUri }} imgSize={{ width: img_w, height: img_h }} containerSize={{ w: Utils.deviceWidth, h: midHeight }} markers={this.state.markers} markLongClick={this.markLongClick} markStateChange={this.markStateChange} />
                </View>
                <View style={[styles.bot, { height: botHeight }]}>
                    <Text style={styles.bot_t}>{'点击批量选择错题, 长按可编辑错题区域'}</Text>
                    <View style={styles.bot_btns}>
                        <TouchableHighlight style={styles.bot_btns_lb} underlayColor='transparent' activeOpacity={1} onPress={this.navBack}>
                            <View style={styles.bot_btns_lb_v}>
                                <Image style={styles.bot_btns_lb_img} source={require('./Resources/to_xiangji.png')} />
                                <Text style={styles.bot_btns_lb_t}>{'重拍'}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.bot_btns_lb} underlayColor='transparent' activeOpacity={1} onPress={this.manual}>
                            <View style={styles.bot_btns_lb_v}>
                                <Image style={styles.bot_btns_lb_img} source={require('./Resources/to_shouzhi.png')} />
                                <Text style={styles.bot_btns_lb_t}>{'手动框题'}</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={styles.bot_btns_rbv}>
                            <TouchableHighlight style={[styles.bot_btns_rb, { backgroundColor: sels.length > 0 ? '#FFE600' : '#eeeeee' }]} underlayColor={sels.length > 0 ? '#FFE600' : '#eeeeee'} activeOpacity={0.7} onPress={this.sure} disabled={sels.length < 1}>
                                <Text style={styles.bot_btns_rb_t}>{sels.length > 0 ? '加入错题本(' + sels.length + ')' : '加入错题本'}</Text>
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
        width: Utils.size(75),
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
        width: Utils.size(124),
        height: Utils.size(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Utils.size(20),
    },
    bot_btns_rb_t: {
        fontSize: Utils.size(15),
        color: '#333333',
        fontWeight: '400',
    }

})
