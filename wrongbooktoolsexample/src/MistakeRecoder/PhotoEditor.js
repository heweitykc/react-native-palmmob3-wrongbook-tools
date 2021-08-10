import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, StatusBar, Image } from 'react-native';

import Utils from "./Utils/Utils";
import * as LIBUtils from "../../libs/Utils";
import NavBar from "./Views/NavBar";

export default class PhotoEditor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            barType: -1              //barType: -1 toolbar  0 text  1 crop  2 rotate  3 clean
        }
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content')

    }

    navBack = () => {
        this.props.navigation.pop()
    }

    tBarClick = (selBarType, type) => {
        switch (selBarType) {
            case -1:
                {
                    switch (type) {
                        case 0:

                            break;
                        case 1:
                            this.setState({
                                barType: 1
                            })
                            break;
                        case 2:
                            this.setState({
                                barType: 2
                            })
                            break;
                        case 3:
                            this.setState({
                                barType: 3
                            })
                            break;
                        default:
                            break;
                    }
                }
                break;
            case 0:

            case 1:
                switch (type) {
                    case 0:
                        this.setState({
                            barType: -1
                        })
                        break;
                    case 1:
                        this.setState({
                            barType: -1
                        })
                        break;
                    default:
                        break;
                }
                break;
            case 2:
                switch (type) {
                    case 0:

                        break;
                    case 1:
                        this.setState({
                            barType: -1
                        })
                        break;
                    case 2:
                        this.setState({
                            barType: -1
                        })
                        break;
                    default:
                        break;
                }
                break;
            case 3:
                switch (type) {
                    case 0:

                        break;
                    case 1:
                        this.setState({
                            barType: -1
                        })
                        break;
                    case 2:
                        this.setState({
                            barType: -1
                        })
                        break;
                    case 3:

                        break;
                    case 4:

                        break;
                    case 5:

                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    bottomBarRender = (barType) => {
        switch (barType) {
            case -1:
                return this.toolBarRender()
            case 0:
                return this.toolBarRender()
            case 1:
                return this.cropBarRender()
            case 2:
                return this.rotateBarRender()
            case 3:
                return this.cleanBarRender()
            default:
                return null
        }
    }

    toolBarRender = () => {
        let botHeight = this.getBotVH(-1, true)
        return (
            <View style={[styles.toolbar, { height: botHeight }]}>
                {
                    [
                        ['文字', require('./Resources/lib_edit_text.png')],
                        ['裁剪', require('./Resources/lib_edit_crop.png')],
                        ['旋转', require('./Resources/lib_edit_rotate.png')],
                        ['擦除', require('./Resources/lib_edit_clean.png')]
                    ].map((item, i) => {
                        return (
                            <TouchableHighlight key={i + ''} style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(-1, i) }}>
                                <View style={styles.toolbar_itemv}>
                                    <Image style={styles.toolbar_itemv_img} source={item[1]} />
                                    <Text style={styles.toolbar_itemv_t}>{item[0]}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    })
                }
            </View>
        )
    }

    cropBarRender = () => {
        let botHeight = this.getBotVH(1, true)
        return (
            <View style={[styles.toolbar, { height: botHeight }]}>
                <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(1, 0) }}>
                    <View style={styles.toolbar_itemv}>
                        <Image style={styles.toolbar_itemv_img2} source={require('./Resources/lib_close.png')} />
                    </View>
                </TouchableHighlight>
                <View style={styles.toolbar_itemv}>
                    <Text style={styles.toolbar_itemv_des}>{'裁剪'}</Text>
                </View>
                <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(1, 1) }}>
                    <View style={styles.toolbar_itemv}>
                        <Image style={styles.toolbar_itemv_img2} source={require('./Resources/lib_gou.png')} />
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    rotateBarRender = () => {
        let botHeight = this.getBotVH(2, true)
        return (
            <View style={[styles.toolbar, { height: botHeight, flexDirection: 'column' }]}>
                <TouchableHighlight style={[styles.toolbar_rotatebtn, { height: Utils.size(40), width: Utils.size(40) }]} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(2, 0) }}>
                    <Image style={styles.toolbar_rotatebtn_img} source={require('./Resources/lib_rotate.png')} />
                </TouchableHighlight>
                <View style={styles.toolbar_con}>
                    <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(2, 1) }}>
                        <View style={styles.toolbar_itemv}>
                            <Image style={styles.toolbar_itemv_img2} source={require('./Resources/lib_close.png')} />
                        </View>
                    </TouchableHighlight>
                    <View style={styles.toolbar_itemv}>
                        <Text style={styles.toolbar_itemv_des}>{'旋转'}</Text>
                    </View>
                    <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(2, 2) }}>
                        <View style={styles.toolbar_itemv}>
                            <Image style={styles.toolbar_itemv_img2} source={require('./Resources/lib_gou.png')} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    cleanBarRender = () => {
        let botHeight = this.getBotVH(3, true)
        return (
            <View style={[styles.toolbar, { height: botHeight, flexDirection: 'column' }]}>
                <TouchableHighlight style={[styles.toolbar_rotatebtn, { height: Utils.size(40), width: Utils.size(40), justifyContent: 'flex-start' }]} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(3, 0) }}>
                    <Image style={styles.toolbar_rotatebtn_img} source={require('./Resources/lib_rollback.png')} />
                </TouchableHighlight>
                <View style={{ height: Utils.size(40), flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' }}>
                    <TouchableHighlight style={[styles.toolbar_clean_pencil_v, { marginLeft: 0, borderColor: '#FFE600', borderStyle: 'solid', borderWidth: 1 }]} underlayColor='transparent' activeOpacity={1} onPress={() => { this.tBarClick(3, 3) }}>
                        <View style={[styles.toolbar_clean_pencil_0]} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.toolbar_clean_pencil_v} underlayColor='transparent' activeOpacity={1} onPress={() => { this.tBarClick(3, 4) }}>
                        <View style={[styles.toolbar_clean_pencil_1]} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.toolbar_clean_pencil_v} underlayColor='transparent' activeOpacity={1} onPress={() => { this.tBarClick(3, 5) }}>
                        <View style={[styles.toolbar_clean_pencil_2]} />
                    </TouchableHighlight>
                </View>
                <View style={styles.toolbar_con}>
                    <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(3, 1) }}>
                        <View style={styles.toolbar_itemv}>
                            <Image style={styles.toolbar_itemv_img2} source={require('./Resources/lib_close.png')} />
                        </View>
                    </TouchableHighlight>
                    <View style={styles.toolbar_itemv}>
                        <Text style={styles.toolbar_itemv_des}>{'擦除'}</Text>
                    </View>
                    <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(3, 2) }}>
                        <View style={styles.toolbar_itemv}>
                            <Image style={styles.toolbar_itemv_img2} source={require('./Resources/lib_gou.png')} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    getBotVH = (barType, ignoreBotSpace = false) => {
        let x_space = Utils.size(20)
        let vh = 0
        switch (barType) {
            case -1:
                vh = Utils.size(80)
                break;
            case 0:
                vh = Utils.size(80)
                break;
            case 1:
                vh = Utils.size(80)
                break;
            case 2:
                vh = Utils.size(120)
                break;
            case 3:
                vh = Utils.size(160)
                break;
            default:
                break;
        }
        return ignoreBotSpace ? vh : (Utils.isIPhonex() ? vh + x_space : vh)
    }

    render() {
        const { imgUri, img_w, img_h } = this.props.route?.params
        let botHeight = this.getBotVH(3)
        //
        let navHeight = Platform.OS === 'ios' ? (Utils.isIPhonex() ? 88 : 64) : (44 + Utils.statusBarHeight)
        let midHeight = Utils.deviceHeight - navHeight - botHeight

        let img_rect = LIBUtils.Utils.computePaperLayout(0, { width: img_w, height: img_h }, { w: Utils.deviceWidth, h: midHeight })

        return (
            <View style={styles.edi} >
                <NavBar title='错题编辑' titleColor='white' bgColor='transparent' backAction={this.navBack} backImg={require('./Resources/close_white.png')} />
                <View style={styles.con}>
                    <Image source={{ uri: imgUri }} resizeMode={'stretch'} style={[{ width: img_rect.w, height: img_rect.h, transform: [{ translateX: img_rect.x }, { translateY: img_rect.y }] }]} />
                </View>
                <View style={[styles.bot, { height: botHeight }]}>
                    <View style={[styles.bot_con, { height: this.getBotVH(this.state.barType, true), marginBottom: Utils.isIPhonex() ? Utils.size(20) : 0 }]}>
                        {
                            this.bottomBarRender(this.state.barType)
                        }
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    edi: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'black'
    },
    con: {
        flex: 1,
    },
    bot: {
        backgroundColor: 'transparent',
        alignItems: 'stretch',
        justifyContent: 'flex-end'
    },
    bot_con: {

    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    toolbar_rotatebtn: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    toolbar_rotatebtn_img: {
        width: Utils.size(25),
        height: Utils.size(25),
    },
    toolbar_con: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    toolbar_item: {
        flex: 1
    },
    toolbar_itemv: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    toolbar_itemv_img: {
        width: Utils.size(25),
        height: Utils.size(25),
    },
    toolbar_itemv_img2: {
        width: Utils.size(20),
        height: Utils.size(20),
    },
    toolbar_itemv_t: {
        marginTop: Utils.size(11),
        fontSize: Utils.size(12),
        color: '#ffffff',
        fontWeight: '500',
    },
    toolbar_itemv_des: {
        fontSize: Utils.size(17),
        color: '#ffffff',
        fontWeight: '500',
    },
    toolbar_clean_pencil_v: {
        width: Utils.size(40),
        justifyContent: 'center', alignItems: 'center',
        marginLeft: Utils.size(10),
        borderRadius: Utils.size(21)
    },
    toolbar_clean_pencil_0: {
        backgroundColor: 'white',
        width: 8,
        height: 8,
        borderRadius: 4
    },
    toolbar_clean_pencil_1: {
        backgroundColor: 'white',
        width: 11,
        height: 11,
        borderRadius: 5.5
    },
    toolbar_clean_pencil_2: {
        backgroundColor: 'white',
        width: 14,
        height: 14,
        borderRadius: 7
    },
    sss: {

    },
    sss: {

    },
    sss: {

    },
    sss: {

    },
    sss: {

    },


})