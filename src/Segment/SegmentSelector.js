import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, Image, StatusBar, UIManager } from 'react-native';

import Utils from "../Utils";

export default class SegmentSelector extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selIndex: -1,
            optionSelIndexs: Array(this.props.source?.length ?? 0).fill(0),
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
            console.log('getBarPosition:', x, y, w, h, left, top)
            if (x == undefined || x == null ||
                y == undefined || y == null ||
                w == undefined || w == null ||
                h == undefined || h == null ||
                left == undefined || left == null ||
                top == undefined || top == null
            ) return
            if (update) {
                this.setState({
                    barPosi: [left, top, w, h]
                })
            }
            callback && callback([left, top, w, h])
        })
    }

    barSelect = (index) => {
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
            selIndex: -1,
            modalVisible: false
        })
    }

    coverClick = (e) => {
        let loc_x = e?.nativeEvent?.pageX
        let loc_y = e?.nativeEvent?.pageY
        if (!loc_x || !loc_y) return
        let cItemIndex = this.checkCoverClickItem(loc_x, loc_y)
        if (cItemIndex != null) {
            this.barSelect(cItemIndex)
        }
    }

    checkCoverClickItem = (loc_x, loc_y) => {
        let barPosi = this.state.barPosi
        if (!barPosi || barPosi.length < 4) return null
        if (loc_y < barPosi[1]) return null
        if (loc_y >= barPosi[1] && loc_y <= (barPosi[1] + barPosi[3]) && loc_x >= barPosi[0] && loc_x <= (barPosi[0] + barPosi[2])) {
            let item_count = this.props.source?.length
            if (!item_count) return null
            let item_w = barPosi[2] / item_count
            let click_index = parseInt(loc_x / item_w)
            return click_index
        }
        return this.state.selIndex
    }

    optionItemClick = (barSelIndex, itemIndex) => {
        let oSelIndexs = this.state.optionSelIndexs
        if (oSelIndexs[barSelIndex] === itemIndex) return
        oSelIndexs[barSelIndex] = itemIndex
        this.setState({
            optionSelIndexs: oSelIndexs,
            selIndex: -1,
            modalVisible: false
        }, () => {
            this.optionSelectResult()
        })
    }

    optionSelectResult = () => {
        let source = this.props.source
        let selResult = []
        for (let i = 0; i < source.length; i++) {
            selResult.push(source[i].options[this.state.optionSelIndexs[i]])
        }
        this.props.optionSelect && this.props.optionSelect(selResult)
    }

    //source eg:[ {title:'导入时间',options:[ {text:'全部',value:0}, {text:'近七天',value:1}, {text:'近一个月',value:2} ]} ... ]
    render() {
        const { barHeight, barBgColor, barTitleColor, barSelTitleColor, itemBgColor, itemSelBgColor, itemTitleColor, itemSelTitleColor, source } = this.props
        if (!source || source.length < 1) return null

        let barPosi = this.state.barPosi
        let selIndex = this.state.selIndex

        //当前子选项
        let currentOptions = source[selIndex]?.options ?? []
        //当前子选项选中
        let currentOptionSelIndex = this.state.optionSelIndexs[selIndex]

        let item_margin = Utils.size(20)
        let count_onerow = 4
        let oItem_w = (Utils.deviceWidth - item_margin * (count_onerow + 1)) / count_onerow
        let oItem_h = 35
        let rows = Math.ceil(currentOptions.length / count_onerow)
        let optionVH = item_margin * (rows + 1) + oItem_h * rows

        return (
            <View style={[styles.seg, { height: barHeight ? barHeight : Utils.size(50), backgroundColor: barBgColor ? barBgColor : 'white' }, this.props.style]} >
                <View ref={e => { this.barRef = e }} style={[styles.seg_bar, { height: barHeight ? barHeight : Utils.size(50) }]} onLayout={this.barLayout}>
                    {
                        source.map((item, i) => {
                            let cOpts = source[i]?.options ?? []
                            let oSelIdx = this.state.optionSelIndexs[i]
                            let oSelTitle = cOpts[oSelIdx].text
                            return (
                                <TouchableHighlight key={i + '_title'} style={styles.seg_bar_item} underlayColor='transparent' activeOpacity={1} onPress={() => this.barSelect(i)}>
                                    <View style={[styles.seg_bar_itemv, { height: barHeight ? barHeight : Utils.size(50) }]}>
                                        <Text style={[styles.seg_bar_item_t, { color: selIndex == i ? (barSelTitleColor ? barSelTitleColor : '#fad369') : (barTitleColor ? barTitleColor : '#333333') }]}>{oSelIdx == 0 ? item.title : oSelTitle}</Text>
                                        <Image style={[styles.seg_bar_item_img, { tintColor: selIndex == i ? (barSelTitleColor ? barSelTitleColor : '#fad369') : '#555555' }]} source={selIndex == i ? require('../Assets/lib_arrow_top.png') : require('../Assets/lib_arrow_bottom.png')} />
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
                            <TouchableHighlight style={[styles.seg_con, {}]} underlayColor='transparent' activeOpacity={1} onPress={this.coverClick} >
                                <View style={[styles.seg_con_v, { marginTop: (barPosi[1] + barPosi[3]) }]}>
                                    <View style={[styles.seg_con_itemv, { height: optionVH, backgroundColor: barBgColor ? barBgColor : 'white' }]}>
                                        {
                                            currentOptions.length > 0
                                                ?
                                                currentOptions.map((item, i) => {
                                                    return (
                                                        < TouchableHighlight key={i + '_item'} style={[styles.seg_con_itemv_item, { width: oItem_w, height: oItem_h, marginLeft: item_margin, marginTop: item_margin, backgroundColor: currentOptionSelIndex == i ? (itemSelBgColor ? itemSelBgColor : '#fad369') : (itemBgColor ? itemBgColor : '#eff0f2') }]} underlayColor={currentOptionSelIndex == i ? (itemSelBgColor ? itemSelBgColor : '#fad369') : (itemBgColor ? itemBgColor : '#eff0f2')} activeOpacity={0.7} onPress={() => { this.optionItemClick(selIndex, i) }}>
                                                            <Text style={[styles.seg_con_itemv_item_t, { maxWidth: oItem_w - 2, color: currentOptionSelIndex == i ? (itemSelTitleColor ? itemSelTitleColor : '#333333') : (itemTitleColor ? itemTitleColor : '#919193') }]} numberOfLines={1}>{item.text}</Text>
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
    },
    seg_bar: {
        width: Utils.deviceWidth,
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    seg_bar_item: {
        flex: 1,
    },
    seg_bar_itemv: {
        flex: 1,
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
        backgroundColor: 'rgba(0,0,0,0.35)'
    },
    seg_con_itemv: {
        width: Utils.deviceWidth,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomLeftRadius: Utils.size(15),
        borderBottomRightRadius: Utils.size(15)
    },
    seg_con_itemv_item: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Utils.size(5),
        overflow: 'hidden'
    },
    seg_con_itemv_item_t: {
        fontSize: Utils.size(15),
        fontWeight: '500',
    },
    seg: {

    },

})