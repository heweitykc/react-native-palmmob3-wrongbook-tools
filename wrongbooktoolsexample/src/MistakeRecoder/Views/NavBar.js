import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

import Utils from "../Utils/Utils";

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title
        }
    }

    componentDidMount() {
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.setState({ title: nextProps.title })
        }
    }

    render() {
        const { backBtnRender, backAction, titleColor, backImg, hideback, rightBtnRender, bgColor, isAbsolute } = this.props
        let height = Platform.OS === 'ios' ? (Utils.isIPhonex() ? 88 : 64) : (44 + Utils.statusBarHeight)
        let backBtn =
            backBtnRender
                ?
                backBtnRender
                :
                <TouchableHighlight style={styles.navh_con_back} underlayColor='transparent' activeOpacity={1} onPress={backAction}>
                    <Image style={[styles.navh_con_back_img, {}]} source={backImg ? backImg : require('../Resources/close_white.png')} />
                </TouchableHighlight>
        return (
            <View style={[isAbsolute ? styles.navh_absolute : styles.navh, { height, backgroundColor: bgColor ? bgColor : 'white' }]}>
                <View style={styles.navh_con}>
                    {
                        hideback
                            ?
                            null
                            :
                            backBtn
                    }
                    <Text style={[styles.navh_con_title, { color: titleColor ? titleColor : 'white' }]}>{this.state.title}</Text>
                    {
                        rightBtnRender
                            ?
                            rightBtnRender()
                            :
                            null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navh: {
        width: Utils.deviceWidth,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    },
    navh_absolute: {
        position: 'absolute',
        zIndex: 999,
        top: 0,
        left: 0,
        width: Utils.deviceWidth,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    },
    navh_con: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navh_con_back: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navh_con_back_img: {
        width: Utils.size(20),
        height: Utils.size(20),
    },
    navh_con_title: {
        fontSize: Utils.size(18),
        fontWeight: '600',
    }
})
