// main index.js

import { NativeModules } from 'react-native';

// const { Palmmob3WrongbookTools } = NativeModules;

import SegmentSelector from './src/Segment/SegmentSelector';
import WarpPerspective from './src/Dragable/WarpPerspective';
import PhotoEditor from './src/PhotoEditor/PhotoEditor';
import Hud from './src/Views/Hud';

export {
  SegmentSelector, WarpPerspective, PhotoEditor, Hud
}