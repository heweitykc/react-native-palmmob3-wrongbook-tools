import ImageEditor from "@react-native-community/image-editor";

class Utils {

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
}

export {
    Utils
};