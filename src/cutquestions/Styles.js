
import {StyleSheet } from 'react-native';

const papercuter_styles = StyleSheet.create({
    kuang: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor:'#000FFF',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BEBEBE',
    },    
    testpaper_container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    toolbar : {
        height: 100,
        width: '80%',
        backgroundColor: '#00FFFF',
        justifyContent:"center",
        alignItems:"center",        
    },
    toolbar_rotate: {
        fontSize:50,
        width:250,
        height:"100%",
        backgroundColor:"#0000FF"
    }
});

const testpaper_styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B87070',
    },
    imbg: {
        position:'absolute',
    },    
    resize_container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#D1D5DA00',
        borderColor:'#FF0000'
    },    
});

export {
    testpaper_styles, papercuter_styles
};