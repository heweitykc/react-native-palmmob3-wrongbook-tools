import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, Image, StatusBar } from 'react-native';

import RNSketchCanvas from '../../SketchLib/SketchIndex';
import Utils from "../../Utils";

export default class CleanUtil extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {

    }

    //0细 1中 2粗
    setPencilWidth = (type) => {
        let w = [4, 7, 10]
        this.sketchCanvas && this.sketchCanvas.setStrokeWidth(w[type])
    }

    rollback = () => {
        this.sketchCanvas && this.sketchCanvas.undo()
    }

    saveImg = () => {
        this.sketchCanvas && this.sketchCanvas.save()
    }

    onSaved = (success, path) => {
        console.log('clean save?', success, path)
        let res = (success && path && path.length > 0) ? path : null
        this.props.onSaveResult && this.props.onSaveResult(res)
    }

    render() {
        const { imgUri, img_w, img_h, containerSize } = this.props
        let true_imgUri = imgUri.replace('file://', '')
        let img_rect = Utils.computePaperLayout(0, { width: img_w, height: img_h }, containerSize)

        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <RNSketchCanvas
                        ref={e => { this.sketchCanvas = e }}
                        localSourceImage={{ filename: true_imgUri, directory: null, mode: 'AspectFit' }}
                        containerStyle={{ width: img_rect.w, height: img_rect.h, transform: [{ translateX: img_rect.x }, { translateY: img_rect.y }] }}
                        canvasStyle={{ backgroundColor: 'transparent', width: img_rect.w, height: img_rect.h }}
                        defaultStrokeIndex={0}
                        defaultStrokeWidth={4}
                        onSketchSaved={this.onSaved}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    strokeColorButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    strokeWidthButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#39579A'
    },
    functionButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        height: 30,
        width: 60,
        backgroundColor: '#39579A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    }
})