/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import TestScene from './TestHook';
// import App from './CanvasExample';
// import App from './TestScene';
import App from './CameraBasicExample';
// import App from './CameraAdvanceExample';
// import App from './CameraMLKitExample';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
