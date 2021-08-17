import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    Modal,
    ActivityIndicator
} from 'react-native';

import Utils from "../Utils";

export default class Hud extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            title: "",
            showType: 0              //0loading 1tip
        }

        this.waiter = null
    }

    componentDidMount() {
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

    }

    cancel = () => {
        this.hide()
    }

    showLoading = (text) => {
        this.setState({
            visible: true,
            showType: 0,
            title: text
        })
    }

    showTip = (text) => {
        this.setState({
            visible: true,
            showType: 1,
            title: text
        })
        this.waiter && clearTimeout(this.waiter)
        this.waiter = null
        this.waiter = setTimeout(() => {
            this.hide()
        }, 1500);
    }

    updateTitle = (text) => {
        this.setState({
            title: text
        })
    }

    hide = () => {
        this.setState({
            visible: false,
            title: ''
        })
    }

    render() {
        let title = this.state.title
        let showType = this.state.showType
        return (
            <Modal
                visible={this.state.visible}
                animationType='fade'
                transparent
                onRequestClose={this.cancel}
            >
                <View style={styles.showbg}>
                    {
                        showType == 0
                            ?
                            <View style={styles.loadcon}>
                                <ActivityIndicator size='large' color='#ffffff' />
                                {
                                    (title && title.length > 0)
                                        ?
                                        <Text style={styles.loadcon_t} numberOfLines={1}>{title}</Text>
                                        :
                                        null
                                }
                            </View>
                            :
                            <View style={styles.tipcon}>
                                <Text style={styles.tipcon_t} numberOfLines={1}>{title}</Text>
                            </View>
                    }
                </View>
            </Modal>

        )
    }
}

const styles = StyleSheet.create({
    showbg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadcon: {
        backgroundColor: '#333333',
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Utils.size(8),
        marginTop: Utils.size(10)
    },
    loadcon_t: {
        marginTop: Utils.size(13),
        fontSize: Utils.size(15),
        color: '#ffffff',
        fontWeight: '600',
    },
    tipcon: {
        height: Utils.size(55),
        // width: Utils.deviceWidth - Utils.size(100),
        justifyContent: 'center',
        borderRadius: Utils.size(5),
        backgroundColor: '#333333'
    },
    tipcon_t: {
        paddingHorizontal: Utils.size(15),
        maxWidth: Utils.deviceWidth - Utils.size(80),
        fontSize: Utils.size(17),
        color: '#ffffff',
        fontWeight: '600',
    }
})
