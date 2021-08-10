import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';

import Utils from "../Utils/Utils";

export default class Marker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            points: this.props.points,
            isSelected: this.props.isSelected,
        }
    }

    componentDidMount() {
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            points: nextProps.points,
            isSelected: nextProps.isSelected,
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.points !== this.state.points || nextState.isSelected !== this.state.isSelected) return true

        return false
    }

    didClick = () => {
        this.props.stateChange && this.props.stateChange(!this.state.isSelected)
    }

    didLongClick = () => {
        this.props.longClick && this.props.longClick()
    }

    //[]
    updatePosition = (points) => {
        if (!points || points.length < 4) return
        this.setState({
            points: points
        })
    }

    render() {
        let points = this.state.points
        console.log('point????', points)
        if (!points || points.length < 4) return null
        const { img_size, img_rect } = this.props
        let ratio_w = img_size.width / img_rect.w
        let ratio_h = img_size.height / img_rect.h
        let toLeft = points[0].x / ratio_w
        let toTop = points[0].y / ratio_h
        let width = points[1].x / ratio_w - points[0].x / ratio_w
        let height = points[2].y / ratio_h - points[0].y / ratio_h
        let isSelected = this.state.isSelected
        return (
            <TouchableHighlight style={[styles.mk, { top: toTop, left: toLeft, width, height }]} underlayColor='transparent' activeOpacity={1} onPress={this.didClick} onLongPress={this.didLongClick}>
                <View style={[styles.mk_v, { width, height, backgroundColor: isSelected ? 'rgba(255, 229, 0, 0.1)' : 'transparent', borderColor: isSelected ? 'rgba(255, 230, 0, 1)' : 'rgba(255,255,255,0.7)' }]}>
                    <Image style={styles.mk_img} source={isSelected ? require('../Resources/lib_kuang_xz.png') : require('../Resources/lib_kuang.png')} />
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    mk: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mk_v: {
        borderWidth: 1,
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mk_img: {
        height: Utils.size(21),
        width: Utils.size(21),
    }
})
