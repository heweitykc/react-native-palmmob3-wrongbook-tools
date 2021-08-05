import React from 'react';
import {
    Dimensions,
    Platform,
    StatusBar,
    PixelRatio
} from 'react-native';

//当前设备尺寸 pt
const deviceWidth = Dimensions.get('window').width;      //当前设备的宽度
const deviceHeight = Dimensions.get('window').height;    //当前设备的高度

const statusBarHeight = StatusBar.currentHeight;          //android 

const ratio = PixelRatio.get()

const w = 375;

//ios各尺寸
const xxs_width = 375;
const xxs_height = 812;
const xrmax_width = 414;
const xrmax_height = 896;
const twelvemin_width = 360;    //12 min
const twelvemin_height = 780;
const twelve_width = 390;    //12 12pro
const twelve_height = 844;
const twelvepromax_width = 428;    //12pro max
const twelvepromax_height = 926;

export default class Utils {

    static pixelRatio = ratio
    static deviceHeight = deviceHeight;
    static deviceWidth = deviceWidth;
    static statusBarHeight = statusBarHeight;

    static isIPhonex() {
        return (Platform.OS === 'ios' &&
            (
                (deviceHeight === xxs_height && deviceWidth === xxs_width) ||
                (deviceWidth === xrmax_width && deviceHeight === xrmax_height) ||
                (deviceHeight === twelvemin_height && deviceWidth === twelvemin_width) ||
                (deviceWidth === twelve_width && deviceHeight === twelve_height) ||
                (deviceHeight === twelvepromax_height && deviceWidth === twelvepromax_width)
            )
        )
    }

    static size(size) {
        size = parseFloat(deviceWidth / w) * size;
        return size;
    }
}

