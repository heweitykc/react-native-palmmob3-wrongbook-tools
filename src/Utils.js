import React from 'react';
import {
    Dimensions,
    Platform,
    StatusBar,
    PixelRatio
} from 'react-native';

import ImageEditor from "@react-native-community/image-editor";
import ImageResizer from 'react-native-image-resizer';

//当前设备尺寸 pt
const deviceWidth = Dimensions.get('window').width;      //当前设备的宽度
const deviceHeight = Dimensions.get('window').height;    //当前设备的高度

const statusBarHeight = StatusBar.currentHeight;          //android 

const ratio = PixelRatio.get()

const STANDARD_W = 375;

//ios各尺寸
const xxs_width = 375;
const xxs_height = 812;
const xrmax_width = 414;
const xrmax_height = 896;
const twelvemin_width = 360;    //12 min
const twelvemin_height = 780;
const twelve_width = 390;       //12 12pro
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
        size = parseFloat(deviceWidth / STANDARD_W) * size;
        return size;
    }

    static computePaperLayout(zRotation, imageSize, containerInfo, needMargin = true) {
        console.log('123?', zRotation, imageSize, containerInfo)
        let layout = { w: 0, h: 0, x: 0, y: 0 };

        let margin = needMargin ? 20 : 0         //边缘留出20

        let container_ratio = containerInfo.w / containerInfo.h;

        if (zRotation % 180 === 0) {  //竖排
            let img_ratio = imageSize.width / imageSize.height;

            if (container_ratio >= img_ratio) {
                console.log('1');
                layout.h = containerInfo.h - margin * 2;
                layout.w = layout.h * img_ratio;
            } else {
                console.log('2');
                layout.w = containerInfo.w - margin * 2;
                console.log('??:', containerInfo.w, margin * 2, layout.w);
                layout.h = layout.w / img_ratio;
            }
        } else {                        //横排      
            let img_ratio = imageSize.height / imageSize.width;
            if (container_ratio < img_ratio) {
                console.log('3');
                layout.h = containerInfo.w - margin * 2;
                layout.w = layout.h / img_ratio;
            } else {
                console.log('4');
                layout.w = containerInfo.h - margin * 2;
                layout.h = layout.w * img_ratio;
            }
        }
        console.log('123???', layout)
        layout.w = parseInt(layout.w);
        layout.h = parseInt(layout.h);
        layout.x = parseInt((containerInfo.w - layout.w) * 0.5);
        layout.y = parseInt((containerInfo.h - layout.h) * 0.5);
        return layout;
    }

    static getCenter(poslist) {
        let total = poslist.length;
        // console.log("total:",total);
        let lat = 0, lon = 0;
        for (let i = 0; i < total; i++) {
            lat += poslist[i].x * Math.PI / 180;
            lon += poslist[i].y * Math.PI / 180;
        }
        lat /= total;
        lon /= total;
        // console.log("lat:",lat,"lon:",lon);
        return { x: parseInt(lat * 180 / Math.PI), y: parseInt(lon * 180 / Math.PI) };
    }

    //裁剪(支持远程/本地uri) cropData: [[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]...]
    static async imgCrop(imgUri, cropData) {
        if (!imgUri || imgUri.length < 1 || !cropData || cropData.length < 1) return null
        let res = []
        for (let i = 0; i < cropData.length; i++) {
            const cdata = cropData[i]
            if (!cdata || cdata.length < 4) {
                continue
            }
            let crop = {
                offset: { x: cdata[0].x, y: cdata[0].y },
                size: { width: cdata[1].x - cdata[0].x, height: cdata[2].y - cdata[0].y },
                displaySize: { width: cdata[1].x - cdata[0].x, height: cdata[2].y - cdata[0].y },
                resizeMode: 'contain'
            }
            let cropResult = await ImageEditor.cropImage(imgUri, crop)
            if (cropResult && cropResult.length > 0) {
                res.push(cropResult)
            }
        }
        return res
    }

    //rotation: 0/90/180/270...
    static imgResize(imgUri, toImgW, toImgH, rotation, callback) {
        ImageResizer.createResizedImage(imgUri, toImgW, toImgH, 'JPEG', 100, rotation, null, false, { mode: 'contain', onlyScaleDown: false })
            .then(res => {
                if (res && res.uri && res.uri.length > 0) {
                    callback && callback([res.uri, res.width, res.height])
                    return
                }
                callback && callback(null)
            })
            .catch(err => {
                callback && callback(null)
            });
    }

}