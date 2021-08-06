import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, StatusBar } from 'react-native';

import Utils from "./Utils/Utils";
import NavBar from "./Views/NavBar";
import PhotoTakeTool from "./Views/PhotoTakeTool";
import Hud from "./Views/Hud";

import { RNCamera } from 'react-native-camera';
import { launchImageLibrary } from 'react-native-image-picker';

export default class PhotoSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            takeType: 1,      //0单题 1整页
            lightOn: false     //0关 1开
        }
    }


    componentDidMount() {
        StatusBar.setBarStyle('light-content')
    }

    componentWillUnmount() {
        console.log('PhotoSelect release...')
    }

    navBack = () => {
        this.props.navigation.pop()
    }

    navRightRender = () => {
        return (
            <TouchableHighlight style={styles.navRBtn}>
                <Text style={styles.navRBtn_t}>{'如何使用'}</Text>
            </TouchableHighlight>
        )
    }

    //0选择相册 2拍照
    takeToolAction = (index) => {
        switch (index) {
            case 0:
                this.selectFromAlbum()
                break;
            case 2:
                this.takePhoto()
                break;
            default:
                break;
        }
    }

    //0拍照模式:0单题 1整页   1闪光灯状态:false关 true开
    takeToolSetUpdate = (type, state) => {
        if (type == 0) {
            this.setState({
                takeType: state
            })
        }
        else if (type == 1) {
            this.setState({
                lightOn: state
            })
        }
    }

    //选择相册
    selectFromAlbum = () => {
        this.camera && this.camera.pausePreview()

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
                    this.didSelectPhoto(res.assets[0].uri, res.assets[0].width, res.assets[0].height)
                    return
                }

                this.hud && this.hud.showTip('无数据,请重新选择')
            }
            this.camera && this.camera.resumePreview()
        })
    }

    //拍照
    takePhoto = async () => {
        if (!this.camera) return
        this.camera.pausePreview()

        this.hud && this.hud.showLoading()

        let options = { quality: 0.5, base64: true }
        let data = await this.camera.takePictureAsync(options)

        this.hud && this.hud.hide()

        let pUri = data ? data.uri : null
        console.log('photo take:', data.width, data.height, data.uri)
        if (!pUri || pUri.length < 1) {

            this.hud && this.hud.showTip('未完成,请重新拍照')

            this.camera && this.camera.resumePreview()
            return
        }
        this.didSelectPhoto(pUri, data.width ? data.width / Utils.pixelRatio : 0, data.height ? data.height / Utils.pixelRatio : 0)
    }

    didSelectPhoto = (photoUri, width, height) => {
        console.log('did select:', photoUri, width, height)

        this.props.navigation.navigate('PhotoTailor', { imgUri: photoUri, img_w: width, img_h: height, isSingle: (this.state.takeType == 0), backBlock: () => { this.camera && this.camera.resumePreview() } })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <NavBar backAction={this.navBack} rightBtnRender={this.navRightRender} bgColor='transparent' isAbsolute={true} />
                <View style={{ flex: 1 }}>
                    <RNCamera
                        ref={e => { this.camera = e }}
                        style={styles.camera}
                        type={RNCamera.Constants.Type.back}
                        flashMode={this.state.lightOn ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                    >
                        <View style={styles.midTip}>
                            <Text style={styles.midTip_t}>{this.state.takeType == 0 ? '支持横屏拍照, 一次拍一题' : '仅可竖屏拍照, 一次拍一整页'}</Text>
                        </View>
                    </RNCamera>
                </View>
                <PhotoTakeTool actionBlock={this.takeToolAction} setUpdateBlock={this.takeToolSetUpdate} />
                <Hud ref={e => this.hud = e} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    navRBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: Utils.size(90),
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navRBtn_t: {
        fontSize: Utils.size(17),
        color: '#ffffff',
        fontWeight: '600',
    },
    camera: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    midTip: {
        width: Utils.size(190),
        height: Utils.size(32),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Utils.size(17),
        backgroundColor: 'rgba(0,0,0,0.35)'
    },
    midTip_t: {
        fontSize: Utils.size(14),
        color: '#ffffff',
        fontWeight: '400',
    }
})
