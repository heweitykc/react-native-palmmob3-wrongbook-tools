import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, Image, StatusBar, UIManager } from 'react-native';

import Utils from "./Utils/Utils";

export default class SegmentSelector extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selIndex: -1,
            optionSelIndexs: Array(this.props.source?.length ?? 0).fill(-1),
            modalVisible: false,
            barPosi: null
        }
    }

    componentDidMount() {

    }

    barLayout = (e) => {
        this.getBarPosition()
    }

    getBarPosition = (update = true, callback) => {
        this.barRef && this.barRef.measure((x, y, w, h, left, top) => {
            console.log(x, y, w, h, left, top)
            if (update) {
                this.setState({
                    barPosi: [left, top, w, h]
                })
            }
            callback && callback([left, top, w, h])
        })
    }

    barSelect = (index) => {
        console.log('barSelect...')
        if (this.state.selIndex == index) {
            this.setState({
                selIndex: -1,
                modalVisible: false
            })
        } else {
            if (this.state.barPosi && this.state.barPosi.length >= 4) {
                this.setState({
                    selIndex: index,
                    modalVisible: true
                })
            } else {
                this.getBarPosition(false, (posi) => {
                    this.setState({
                        selIndex: index,
                        modalVisible: true,
                        barPosi: posi
                    })
                })
            }
        }
    }

    hdieOptions = () => {
        this.setState({
            modalVisible: false
        })
    }

    coverClick = (e) => {
        let loc_x = e?.nativeEvent?.locationX
        let loc_y = e?.nativeEvent?.locationY
        if (!loc_x || !loc_y) return
        let cItemIndex = this.checkCoverClickItem(loc_x, loc_y)
        let item_count = this.props.source?.length
        if (cItemIndex != null && cItemIndex >= 0 && cItemIndex < item_count) {
            this.barSelect(cItemIndex)
        }
    }

    checkCoverClickItem = (loc_x, loc_y) => {
        let barPosi = this.state.barPosi
        if (!barPosi || barPosi.length < 4) return null
        if (loc_y >= barPosi[1] && loc_y <= (barPosi[1] + barPosi[3]) && loc_x >= barPosi[0] && loc_x <= (barPosi[0] + barPosi[2])) {
            let item_count = this.props.source?.length
            if (!item_count) return null
            let item_w = barPosi[2] / item_count
            let click_index = parseInt(loc_x / item_w)
            return click_index
        }
        return null
    }

    //source eg:[ {title:'导入时间',options:['全部','近三天','近七天']} ... ]
    render() {
        const { barBgColor, barTitleColor, barSelTitleColor, itemBgColor, itemSelBgColor, itemTitleColor, itemSelTitleColor, source } = this.props
        if (!source || source.length < 1) return null

        let barPosi = this.state.barPosi
        let selIndex = this.state.selIndex

        //当前选项
        let currentOptions = (selIndex != null && selIndex != undefined && selIndex >= 0 && selIndex < source.length) ? source[selIndex].options : []
        let item_margin = Utils.size(20)
        let count_onerow = 4
        let oItem_w = (Utils.deviceWidth - item_margin * (count_onerow + 1)) / count_onerow
        let oItem_h = 40
        let rows = Math.ceil(currentOptions.length / count_onerow)
        let optionVH = item_margin * (rows + 1) + oItem_h * rows

        return (
            <View style={[styles.seg, { backgroundColor: barBgColor ? barBgColor : 'white' }, this.props.style]} >
                <View ref={e => { this.barRef = e }} style={styles.seg_bar} onLayout={this.barLayout}>
                    {
                        source.map((item, i) => {
                            return (
                                <TouchableHighlight key={i + ''} style={styles.seg_bar_item} underlayColor='transparent' activeOpacity={1} onPress={() => this.barSelect(i)}>
                                    <View style={styles.seg_bar_itemv}>
                                        <Text style={[styles.seg_bar_item_t, { color: selIndex == i ? (barSelTitleColor ? barSelTitleColor : '#fad369') : (barTitleColor ? barTitleColor : '#333333') }]}>{item.title}</Text>
                                        <Image style={[styles.seg_bar_item_img, { tintColor: selIndex == i ? (barSelTitleColor ? barSelTitleColor : '#fad369') : '#555555' }]} source={selIndex == i ? require('./Resources/lib_arrow_top.png') : require('./Resources/lib_arrow_bottom.png')} />
                                    </View>
                                </TouchableHighlight>
                            )
                        })
                    }
                </View>
                {
                    (barPosi && barPosi.length >= 4)
                        ?
                        <Modal
                            visible={this.state.modalVisible}
                            animationType='fade'
                            transparent
                            onRequestClose={this.hdieOptions}
                        >
                            <TouchableHighlight style={styles.seg_con} underlayColor='transparent' activeOpacity={1} onPress={this.coverClick}>
                                <View style={[styles.seg_con_v, { marginTop: barPosi[1] + barPosi[3] }]}>
                                    <View style={[styles.seg_con_itemv, { height: optionVH, backgroundColor: barBgColor ? barBgColor : 'white' }]}>
                                        {
                                            currentOptions.length > 0
                                                ?
                                                currentOptions.map((item, i) => {
                                                    let currentOptionSelIndex = this.state.optionSelIndexs[selIndex]
                                                    return (
                                                        < TouchableHighlight style={[styles.seg_con_itemv_item, { width: oItem_w, height: oItem_h, marginLeft: item_margin, marginTop: item_margin, backgroundColor: currentOptionSelIndex == i ? (itemSelBgColor ? itemSelBgColor : '#fad369') : (itemBgColor ? itemBgColor : '#f5f5f5') }]}>
                                                            <Text style={[styles.seg_con_itemv_item_t, { color: currentOptionSelIndex == i ? (itemSelTitleColor ? itemSelTitleColor : '#333333') : (itemTitleColor ? itemTitleColor : '#444444') }]}>{item}</Text>
                                                        </TouchableHighlight>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </Modal>
                        :
                        null
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    seg: {
        width: Utils.deviceWidth,
        height: Utils.size(50),
    },
    seg_bar: {
        width: Utils.deviceWidth,
        height: Utils.size(50),
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    seg_bar_item: {
        flex: 1,
    },
    seg_bar_itemv: {
        flex: 1,
        height: Utils.size(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    seg_bar_item_t: {
        fontSize: Utils.size(16),
        fontWeight: '500',
    },
    seg_bar_item_img: {
        marginLeft: Utils.size(2),
        width: Utils.size(14),
        height: Utils.size(14),
    },
    seg_con: {
        flex: 1,
    },
    seg_con_v: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    seg_con_itemv: {
        width: Utils.deviceWidth,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomLeftRadius: Utils.size(8),
        borderBottomRightRadius: Utils.size(8)
    },
    seg_con_itemv_item: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Utils.size(5)
    },
    seg_con_itemv_item_t: {
        fontSize: Utils.size(14),
        fontWeight: '500',
    },
    seg: {

    },

})