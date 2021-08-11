import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, Image, StatusBar } from 'react-native';

import * as LIBUtils from "../../../libs/Utils";
import Utils from "../Utils/Utils";
import RNSketchCanvas from '../../../../src/SketchIndex';
import { SketchCanvas } from '../../../../src/SketchIndex';

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
        console.log('save?', success, path)
        let res = (success && path && path.length > 0) ? path : null
        this.props.onSaveResult && this.props.onSaveResult(res)
    }

    render() {
        const { imgUri, img_w, img_h, containerSize } = this.props
        let true_imgUri = imgUri.replace('file://', '')
        let img_rect = LIBUtils.Utils.computePaperLayout(0, { width: img_w, height: img_h }, containerSize)

        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <RNSketchCanvas
                        ref={e => { this.sketchCanvas = e }}
                        localSourceImage={{ filename: true_imgUri, directory: null, mode: 'AspectFit' }}
                        containerStyle={{ width: img_rect.w, height: img_rect.h, transform: [{ translateX: img_rect.x }, { translateY: img_rect.y }] }}
                        canvasStyle={{ backgroundColor: 'transparent', width: img_rect.w, height: img_rect.h }}
                        onStrokeEnd={data => {
                        }}
                        closeComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Close</Text></View>}
                        onClosePressed={() => {

                        }}
                        undoComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Undo</Text></View>}
                        onUndoPressed={(id) => {
                            // Alert.alert('do something')
                        }}
                        clearComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Clear</Text></View>}
                        onClearPressed={() => {
                            // Alert.alert('do something')
                        }}
                        eraseComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Eraser</Text></View>}
                        strokeComponent={color => (
                            <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
                        )}
                        strokeSelectedComponent={(color, index, changed) => {
                            return (
                                <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                            )
                        }}
                        strokeWidthComponent={(w) => {
                            return (<View style={styles.strokeWidthButton}>
                                <View style={{
                                    backgroundColor: 'white', marginHorizontal: 2.5,
                                    width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                                }} />
                            </View>
                            )
                        }}
                        defaultStrokeIndex={0}
                        defaultStrokeWidth={4}
                        saveComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Save</Text></View>}
                        // savePreference={() => {
                        //     return {
                        //         folder: 'RNSketchCanvas',
                        //         filename: String(Math.ceil(Math.random() * 100000000)),
                        //         transparent: false,
                        //         imageType: 'png'
                        //     }
                        // }}
                        onSketchSaved={this.onSaved}
                        onPathsChange={(pathsCount) => {
                            console.log('pathsCount', pathsCount)
                        }}
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