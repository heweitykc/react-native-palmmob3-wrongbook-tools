import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, StatusBar, Image } from 'react-native';

import Utils from "../Utils";
import NavBar from "../Views/NavBar";
import { DragCutBlock } from '../Dragable/DragCutBlock'

import RotateUtil from "./Utils/RotateUtil";
import CleanUtil from "./Utils/CleanUtil";
import AddTextUtil from "./Utils/AddTextUtil";

export default class PhotoEditor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            imgUri: this.props.imgUri,
            img_w: this.props.img_w,
            img_h: this.props.img_h,
            barType: -1,              //barType: -1 toolbar  0 text  1 crop  2 rotate  3 clean
            cleanPencilType: 0           //0/1/2
        }

        this.midConH = 0

        //旋转到 0/90/180...
        this.toRotation = 0
        //裁剪结果
        this.cropResultPoints = null
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content')

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            imgUri: nextProps.imgUri,
            img_w: nextProps.img_w,
            img_h: nextProps.img_h,
        })
    }

    componentWillUnmount() {
        console.log('PhotoEditor release..')
    }

    show = () => {
        this.setState({
            visible: true
        })
    }

    dismiss = () => {
        this.setState({
            visible: false
        })
    }

    tBarClick = (selBarType, type) => {
        switch (selBarType) {
            case -1:     //功能bar
                {
                    switch (type) {
                        case 0:
                            this.setState({
                                barType: 0
                            })
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
            case 0:     //文字
                switch (type) {
                    case 0:                 //取消
                        this.addTextCancel()
                        break;
                    case 1:                 //确认
                        this.addTextSure()
                        break;
                    default:
                        break;
                }
                break;
            case 1:     //裁剪
                switch (type) {
                    case 0:                 //取消
                        this.cancelCrop()
                        break;
                    case 1:                 //确认
                        this.sureCrop()
                        break;
                    default:
                        break;
                }
                break;
            case 2:     //旋转
                switch (type) {
                    case 0:
                        this.startRotate()
                        break;
                    case 1:
                        this.cancelRotate()
                        break;
                    case 2:
                        this.sureRotate()
                        break;
                    default:
                        break;
                }
                break;
            case 3:     //擦除
                switch (type) {
                    case 0:
                        this.cleanRollback()
                        break;
                    case 1:
                        this.cleanCancel()
                        break;
                    case 2:
                        this.cleanSure()
                        break;
                    case 3:
                        this.cleanSetPencil(0)
                        break;
                    case 4:
                        this.cleanSetPencil(1)
                        break;
                    case 5:
                        this.cleanSetPencil(2)
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    //添加文字
    addTextCancel = () => {
        this.setState({
            barType: -1
        })
    }
    addTextSure = () => {
        this.addTextUtil && this.addTextUtil.saveImg()
    }
    addTextSaveResult = (res) => {
        if (res) {
            this.setState({
                barType: -1,
                imgUri: res
            })
            return
        }
        this.setState({
            barType: -1,
        })
    }

    //裁剪
    onMove = (posdata) => {
        this.cropResultPoints = posdata
    }
    cancelCrop = () => {
        this.setState({
            barType: -1
        })
        this.cropResultPoints = null
    }
    sureCrop = async () => {
        if (!this.cropResultPoints || this.cropResultPoints.length < 4) return
        let cropResult = await Utils.imgCrop(this.state.imgUri, [this.cropResultPoints])
        console.log('cropResult:', cropResult)
        if (cropResult && cropResult.length > 0) {
            let img_w = this.cropResultPoints[1].x - this.cropResultPoints[0].x
            let img_h = this.cropResultPoints[2].y - this.cropResultPoints[0].y
            this.setState({
                imgUri: cropResult[0],
                img_w: img_w,
                img_h: img_h,
                barType: -1
            }, () => {
                this.resultUpdate()
            })
            this.cropResultPoints = null
        }
    }


    //旋转
    startRotate = () => {
        if (this.rotateUtil) {
            this.toRotation += 90
            this.rotateUtil.rotateTo(this.toRotation)
        }
    }
    cancelRotate = () => {
        this.setState({
            barType: -1
        })
        this.toRotation = 0
    }
    sureRotate = () => {
        let rotation = this.toRotation % 360
        if (rotation == 0) {
            this.setState({
                barType: -1
            })
            this.toRotation = 0
            return
        }
        let max = Math.max(this.state.img_w, this.state.img_h)
        Utils.imgResize(this.state.imgUri, max, max, rotation, (res) => {
            if (res) {
                this.setState({
                    imgUri: res[0],
                    img_w: res[1],
                    img_h: res[2],
                    barType: -1
                }, () => {
                    this.resultUpdate()
                })
                this.toRotation = 0
            }
        })
    }

    //擦除
    cleanRollback = () => {
        this.cleanUtil && this.cleanUtil.rollback()
    }
    cleanCancel = () => {
        this.setState({
            barType: -1,
            cleanPencilType: 0
        })
    }
    cleanSure = () => {
        this.cleanUtil && this.cleanUtil.saveImg()
    }
    onSaveResult = (res) => {
        if (res) {
            this.setState({
                barType: -1,
                cleanPencilType: 0,
                imgUri: res
            }, () => {
                this.resultUpdate()
            })
            return
        }
        this.setState({
            barType: -1,
            cleanPencilType: 0,
        })
    }
    cleanSetPencil = (type) => {
        this.setState({
            cleanPencilType: type
        })
        this.cleanUtil && this.cleanUtil.setPencilWidth(type)
    }

    //result back
    resultUpdate = () => {
        this.props.resultCallback && this.props.resultCallback(this.state.imgUri, this.state.img_w, this.state.img_h)
    }

    //bar render

    bottomBarRender = (barType) => {
        switch (barType) {
            case -1:
                return this.toolBarRender()
            case 0:
                return this.addTextBarRender()
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
                        // ['文字', require('../Assets/lib_edit_text.png')],
                        ['裁剪', require('../Assets/lib_edit_crop.png')],
                        ['旋转', require('../Assets/lib_edit_rotate.png')],
                        ['擦除', require('../Assets/lib_edit_clean.png')]
                    ].map((item, i) => {
                        return (
                            <TouchableHighlight key={i + ''} style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(-1, i + 1) }}>
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

    addTextBarRender = () => {
        let botHeight = this.getBotVH(0, true)
        return (
            <View style={[styles.toolbar, { height: botHeight }]}>
                <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(0, 0) }}>
                    <View style={styles.toolbar_itemv}>
                        <Image style={styles.toolbar_itemv_img2} source={require('../Assets/lib_close.png')} />
                    </View>
                </TouchableHighlight>
                <View style={styles.toolbar_itemv}>
                    <Text style={styles.toolbar_itemv_des}>{'添加文字'}</Text>
                </View>
                <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(0, 1) }}>
                    <View style={styles.toolbar_itemv}>
                        <Image style={styles.toolbar_itemv_img2} source={require('../Assets/lib_gou.png')} />
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    cropBarRender = () => {
        let botHeight = this.getBotVH(1, true)
        return (
            <View style={[styles.toolbar, { height: botHeight }]}>
                <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(1, 0) }}>
                    <View style={styles.toolbar_itemv}>
                        <Image style={styles.toolbar_itemv_img2} source={require('../Assets/lib_close.png')} />
                    </View>
                </TouchableHighlight>
                <View style={styles.toolbar_itemv}>
                    <Text style={styles.toolbar_itemv_des}>{'裁剪'}</Text>
                </View>
                <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(1, 1) }}>
                    <View style={styles.toolbar_itemv}>
                        <Image style={styles.toolbar_itemv_img2} source={require('../Assets/lib_gou.png')} />
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
                    <Image style={styles.toolbar_rotatebtn_img} source={require('../Assets/lib_rotate.png')} />
                </TouchableHighlight>
                <View style={styles.toolbar_con}>
                    <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(2, 1) }}>
                        <View style={styles.toolbar_itemv}>
                            <Image style={styles.toolbar_itemv_img2} source={require('../Assets/lib_close.png')} />
                        </View>
                    </TouchableHighlight>
                    <View style={styles.toolbar_itemv}>
                        <Text style={styles.toolbar_itemv_des}>{'旋转'}</Text>
                    </View>
                    <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(2, 2) }}>
                        <View style={styles.toolbar_itemv}>
                            <Image style={styles.toolbar_itemv_img2} source={require('../Assets/lib_gou.png')} />
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
                    <Image style={styles.toolbar_rotatebtn_img} source={require('../Assets/lib_rollback.png')} />
                </TouchableHighlight>
                <View style={{ height: Utils.size(40), flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' }}>
                    <TouchableHighlight style={[styles.toolbar_clean_pencil_v, { marginLeft: 0, borderColor: (this.state.cleanPencilType == 0 ? '#FFE600' : 'transparent'), borderStyle: 'solid', borderWidth: 1 }]} underlayColor='transparent' activeOpacity={1} onPress={() => { this.tBarClick(3, 3) }}>
                        <View style={[styles.toolbar_clean_pencil_0]} />
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.toolbar_clean_pencil_v, { marginLeft: 10, borderColor: (this.state.cleanPencilType == 1 ? '#FFE600' : 'transparent'), borderStyle: 'solid', borderWidth: 1 }]} underlayColor='transparent' activeOpacity={1} onPress={() => { this.tBarClick(3, 4) }}>
                        <View style={[styles.toolbar_clean_pencil_1]} />
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.toolbar_clean_pencil_v, { marginLeft: 10, borderColor: (this.state.cleanPencilType == 2 ? '#FFE600' : 'transparent'), borderStyle: 'solid', borderWidth: 1 }]} underlayColor='transparent' activeOpacity={1} onPress={() => { this.tBarClick(3, 5) }}>
                        <View style={[styles.toolbar_clean_pencil_2]} />
                    </TouchableHighlight>
                </View>
                <View style={styles.toolbar_con}>
                    <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(3, 1) }}>
                        <View style={styles.toolbar_itemv}>
                            <Image style={styles.toolbar_itemv_img2} source={require('../Assets/lib_close.png')} />
                        </View>
                    </TouchableHighlight>
                    <View style={styles.toolbar_itemv}>
                        <Text style={styles.toolbar_itemv_des}>{'擦除'}</Text>
                    </View>
                    <TouchableHighlight style={styles.toolbar_item} underlayColor='transparent' activeOpacity={0.7} onPress={() => { this.tBarClick(3, 2) }}>
                        <View style={styles.toolbar_itemv}>
                            <Image style={styles.toolbar_itemv_img2} source={require('../Assets/lib_gou.png')} />
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
        let imgUri = this.state.imgUri
        let img_w = this.state.img_w
        let img_h = this.state.img_h

        let botHeight = this.getBotVH(3)
        //
        let navHeight = Platform.OS === 'ios' ? (Utils.isIPhonex() ? 88 : 64) : (44 + Utils.statusBarHeight)
        let midHeight = Utils.deviceHeight - navHeight - botHeight

        this.midConH = midHeight

        let img_rect = Utils.computePaperLayout(0, { width: img_w, height: img_h }, { w: Utils.deviceWidth, h: midHeight })

        return (
            <Modal
                visible={this.state.visible}
                animationType='slide'
                transparent
                onRequestClose={this.dismiss}
            >
                <View style={styles.edi} >
                    <NavBar title='错题编辑' titleColor='white' bgColor='transparent' backAction={this.dismiss} backImg={require('../Assets/lib_close_white.png')} />
                    <View style={styles.con}>
                        <Image source={{ uri: imgUri }} resizeMode={'stretch'} style={[{ width: img_rect.w, height: img_rect.h, transform: [{ translateX: img_rect.x }, { translateY: img_rect.y }] }]} />
                        {
                            this.state.barType === -1
                                ?
                                null
                                :
                                <View style={[styles.con_editor, {}]}>
                                    {
                                        this.state.barType === 0
                                        && <AddTextUtil ref={e => { this.addTextUtil = e }} imgUri={imgUri} img_w={img_w} img_h={img_h} containerSize={{ w: Utils.deviceWidth, h: midHeight }} onSaveResult={this.addTextSaveResult} />
                                    }
                                    {
                                        this.state.barType === 1
                                        && <DragCutBlock
                                            dragsize={[150, 50]}
                                            regular={true}
                                            paperBg={{ uri: imgUri }}
                                            onMove={this.onMove}
                                            imageSize={{ width: img_w, height: img_h }}
                                            imageRect={img_rect}
                                            imageRotation={0}
                                            inUse={true}
                                        />
                                    }
                                    {
                                        this.state.barType === 2
                                        && <RotateUtil ref={e => { this.rotateUtil = e }} imgUri={imgUri} img_w={img_w} img_h={img_h} containerSize={{ w: Utils.deviceWidth, h: midHeight }} />
                                    }
                                    {
                                        this.state.barType === 3
                                        && <CleanUtil ref={e => { this.cleanUtil = e }} imgUri={imgUri} img_w={img_w} img_h={img_h} containerSize={{ w: Utils.deviceWidth, h: midHeight }} onSaveResult={this.onSaveResult} />
                                    }
                                </View>
                        }
                    </View>
                    <View style={[styles.bot, { height: botHeight }]}>
                        <View style={[styles.bot_con, { height: this.getBotVH(this.state.barType, true), marginBottom: Utils.isIPhonex() ? Utils.size(20) : 0 }]}>
                            {
                                this.bottomBarRender(this.state.barType)
                            }
                        </View>
                    </View>
                </View>
            </Modal>
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
    con_editor: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black'
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