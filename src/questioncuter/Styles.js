
import {StyleSheet } from 'react-native';

const testpaper_styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    imbg: {
        position:'absolute',
        zIndex: -100,
        top:0,
        left:0
    },    
    resize_container: {
        flex:1,
        width: '100%',
        // backgroundColor: '#0000FF',
        borderColor:'#FF0000',
        borderWidth:1
    },
    toolbar : {
        height: 100,
        width: '90%',
        // backgroundColor: '#00FFFF',
        justifyContent:"center",
        alignItems:"center",        
    },
    toolbar_rotate: {
        fontSize:50,
        width:150,
        height:50,
        backgroundColor:"#00F0FF"
    }     
});

export {
    testpaper_styles
};