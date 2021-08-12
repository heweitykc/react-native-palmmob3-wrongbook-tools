import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, Image, StatusBar, TextInput, Keyboard, PanResponder, Animated } from 'react-native';

import Utils from "../../Utils";
import RNSketchCanvas from '../../SketchLib/SketchIndex';

export default class AddTextUtil extends Component {

    pan = new Animated.ValueXY();

    panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => { console.log("onMoveShouldSetPanResponder"); return true; },
        onStartShouldSetPanResponder: (evt, gestureState) => { console.log("onStartShouldSetPanResponder"); return true; },
        onStartShouldSetPanResponderCapture: (evt, gestureState) => { console.log("onStartShouldSetPanResponderCapture"); return true; },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => { console.log("onMoveShouldSetPanResponderCapture"); return true; },

        onPanResponderGrant: () => {
            console.log("onPanResponderGrant");
            this.pan.setOffset({
                x: this.pan.x._value,
                y: this.pan.y._value
            });
        },

        onPanResponderMove: (evt, gestureState) => {
            console.log("onPanResponderMove=", gestureState);




            let newPos = { x: gestureState.dx, y: gestureState.dy };
            this.pan.setValue(newPos);

            // let minx = 0
            // let miny = 0
            // if (gestureState.dx < minx) {
            //     this.pan.setValue({ x: 0, y: gestureState.dy });
            // }
            // if (gestureState.dy < miny) {
            //     this.pan.setValue({ x: gestureState.dx, y: 0 });
            // }
        },

        onPanResponderRelease: () => {
            this.pan.flattenOffset();
        }
    });

    constructor(props) {
        super(props)

        this.state = {
        }

        this.pan.setValue({ x: 0, y: 0 });

        this.pan.addListener((ret) => {
            console.log('listener:', ret)
            // if (ret.x < 0) {
            //     this.pan.setValue({ x: 0, y: ret.y })
            // }
        });

        this.img_rect = null
        this.inputVBounds = null
    }

    componentDidMount() {

    }

    saveImg = () => {
        this.sketchCanvas && this.sketchCanvas.save()
    }

    onSaved = (success, path) => {
        console.log('save?', success, path)
        let res = (success && path && path.length > 0) ? path : null
        this.props.onSaveResult && this.props.onSaveResult(res)
    }

    onConvTouch = () => {
        Keyboard.dismiss()
    }

    inputVLayout = (e) => {
        console.log('layout?', e.nativeEvent.layout)
        if (e.nativeEvent?.layout) {
            this.inputVBounds = { width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height }
        }
    }

    render() {
        const { imgUri, img_w, img_h, containerSize } = this.props
        let true_imgUri = imgUri.replace('file://', '')
        let img_rect = Utils.computePaperLayout(0, { width: img_w, height: img_h }, containerSize)

        this.img_rect = img_rect

        let con_w = img_rect.w
        let con_h = img_rect.h

        let inputv_w = con_w >= 100 ? 100 : con_w
        let inputv_h = con_h >= 25 ? 25 : con_h

        this.pan.setValue({ x: (con_w - inputv_w) / 2, y: (con_h - inputv_h) / 2 });

        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <RNSketchCanvas
                        ref={e => { this.sketchCanvas = e }}
                        localSourceImage={{ filename: true_imgUri, directory: null, mode: 'AspectFit' }}
                        containerStyle={{ width: con_w, height: con_h, transform: [{ translateX: img_rect.x }, { translateY: img_rect.y }] }}
                        canvasStyle={{ backgroundColor: 'transparent', width: con_w, height: con_h }}
                        defaultStrokeIndex={0}
                        defaultStrokeWidth={4}
                        onSketchSaved={this.onSaved}
                        touchEnabled={false}
                    />
                    <View style={[styles.con, { left: img_rect.x, top: img_rect.y, width: con_w, height: con_h }]} onTouchStart={this.onConvTouch}>
                        <Animated.View
                            style={[styles.inputv, { minWidth: inputv_w, minHeight: inputv_h }, {
                                transform: this.pan.getTranslateTransform()
                            }]}
                            {...this.panResponder.panHandlers}
                            onLayout={this.inputVLayout}
                        >
                            <TextInput style={[styles.inputv_input, { maxWidth: con_w }]} multiline />
                            <TouchableHighlight style={styles.inputv_close}>
                                <Image style={styles.inputv_close_img} source={require('../../Assets/lib_close.png')} />
                            </TouchableHighlight>
                        </Animated.View>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    con: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,240,0.5)',
    },
    inputv: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    inputv_input: {
        flex: 1,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginTop: 8,
        backgroundColor: 'rgba(255,255,255,0.35)',
        fontSize: 13,
        color: 'black',
        borderRadius: 2
    },
    inputv_close: {
        marginLeft: -8,
        width: 16,
        height: 16,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    inputv_close_img: {
        width: 9,
        height: 9,
        tintColor: '#333333'
    }
})