
class Utils {

    static computePaperLayout(zRotation, imageSize, containerInfo) {
        let layout = {w:0,h:0,x:0,y:0};
      
        let container_ratio = containerInfo.w / containerInfo.h;
      
        if(zRotation % 180 === 0){  //竖排
            let img_ratio = imageSize.width / imageSize.height;
            if(container_ratio >= img_ratio){
                console.log('1');
                layout.h = containerInfo.h;
                layout.w = layout.h * img_ratio;              
            } else {
                console.log('2');
                layout.w = containerInfo.w;
                layout.h = layout.w / img_ratio; 
            }
        } else {                        //横排      
            let img_ratio = imageSize.height / imageSize.width;  
            if(container_ratio < img_ratio){
                console.log('3');
                layout.h = containerInfo.w;
                layout.w = layout.h / img_ratio;               
            } else {
                console.log('4');
                layout.w = containerInfo.h;
                layout.h = layout.w * img_ratio;
            }
        }
        layout.w = parseInt(layout.w);
        layout.h = parseInt(layout.h);
        layout.x = parseInt((containerInfo.w - layout.w)*0.5);
        layout.y = parseInt((containerInfo.h - layout.h)*0.5);  
        return layout;
    }
}

export {
    Utils
};