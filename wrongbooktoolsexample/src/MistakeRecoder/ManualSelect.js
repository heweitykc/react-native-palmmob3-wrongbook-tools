import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, Image, StatusBar } from 'react-native';

import Utils from "./Utils/Utils";
import * as LIBUtils from "../../libs/Utils";
import NavBar from "./Views/NavBar";
import TopicMarker from "../../libs/TopicMarker";
import { DragCutBlock } from '../../libs/dragable/DragCutBlock'

//手动框单题

export default class ManualSelect extends Component {
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

    onMove = (posdata) => {
        console.log('post:', posdata)
        this.posdata = posdata
    }

    sure = () => {
        this.props.route.params.addMark && this.props.route.params.addMark(this.posdata)
        this.navBack()
    }

    render() {
        const { imgUri, img_w, img_h } = this.props.route.params

        let botHeight = Utils.isIPhonex() ? Utils.size(105) + Utils.size(20) : Utils.size(105)
        //
        let navHeight = Platform.OS === 'ios' ? (Utils.isIPhonex() ? 88 : 64) : (44 + Utils.statusBarHeight)
        let midHeight = Utils.deviceHeight - navHeight - botHeight
        let img_rect = LIBUtils.Utils.computePaperLayout(0, { width: img_w, height: img_h }, { w: Utils.deviceWidth, h: midHeight }, false);

        return (
            <View style={styles.man}>
                <NavBar title='编辑错题区域' titleColor='black' bgColor='white' backAction={this.navBack} backImg={require('./Resources/back_black.png')} />
                <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
                    <DragCutBlock
                        dragsize={[150, 50]}
                        regular={true}
                        paperBg={{ uri: imgUri }}
                        onMove={this.onMove}
                        imageSize={{ width: img_w, height: img_h }}
                        imageRect={img_rect}
                        imageRotation={0}
                        inUse={true}
                    />
                </View>
                <View style={[styles.man_bot, { height: botHeight }]}>
                    <View style={[styles.man_bot_v, { height: Utils.size(105) }]}>
                        <TouchableHighlight style={styles.man_bot_btn} underlayColor='transparent' activeOpacity={1} onPress={this.sure}>
                            <Image style={styles.man_bot_btn_img} source={require('./Resources/xuanzhong_yel.png')} />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }


}


const styles = StyleSheet.create({
    man: {
        flex: 1,
        alignItems: 'stretch'
    },
    man_bot: {
        alignItems: 'stretch'
    },
    man_bot_v: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    man_bot_btn: {
        width: Utils.size(65),
        height: Utils.size(65),
        justifyContent: 'center',
        alignItems: 'center'
    },
    man_bot_btn_img: {
        width: Utils.size(55),
        height: Utils.size(55)
    }
})
