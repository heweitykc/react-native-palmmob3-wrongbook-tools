import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, Image, StatusBar } from 'react-native';

import Utils from "../../Utils";

export default class RotateUtil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rotation: 0
        }
    }

    componentDidMount() {

    }

    rotateTo = (rotation) => {
        console.log('旋转:', rotation)
        this.setState({
            rotation: rotation
        })
    }

    render() {
        const { imgUri, img_w, img_h, containerSize } = this.props
        let img_rect = Utils.computePaperLayout(this.state.rotation, { width: img_w, height: img_h }, containerSize)

        return (
            <View style={{ flex: 1 }} >
                <Image style={{ width: img_rect.w, height: img_rect.h, transform: [{ translateX: img_rect.x }, { translateY: img_rect.y }, { rotateZ: this.state.rotation + 'deg' }] }} source={{ uri: imgUri }} resizeMode={'stretch'} />
            </View>
        )
    }

}

const styles = StyleSheet.create({

})