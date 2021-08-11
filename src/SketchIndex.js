import React from 'react'
import PropTypes from 'prop-types'
import ReactNative, {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ViewPropTypes,
} from 'react-native'
import SketchCanvas from './SketchCanvas'
import { requestPermissions } from './handlePermissions';

export default class RNSketchCanvas extends React.Component {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
        canvasStyle: ViewPropTypes.style,
        onStrokeStart: PropTypes.func,
        onStrokeChanged: PropTypes.func,
        onStrokeEnd: PropTypes.func,
        onClosePressed: PropTypes.func,
        onUndoPressed: PropTypes.func,
        onClearPressed: PropTypes.func,
        onPathsChange: PropTypes.func,
        user: PropTypes.string,

        closeComponent: PropTypes.node,
        eraseComponent: PropTypes.node,
        undoComponent: PropTypes.node,
        clearComponent: PropTypes.node,
        saveComponent: PropTypes.node,
        strokeComponent: PropTypes.func,
        strokeSelectedComponent: PropTypes.func,
        strokeWidthComponent: PropTypes.func,

        strokeColors: PropTypes.arrayOf(PropTypes.shape({ color: PropTypes.string })),
        defaultStrokeIndex: PropTypes.number,
        defaultStrokeWidth: PropTypes.number,

        minStrokeWidth: PropTypes.number,
        maxStrokeWidth: PropTypes.number,
        strokeWidthStep: PropTypes.number,

        savePreference: PropTypes.func,
        onSketchSaved: PropTypes.func,

        text: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            font: PropTypes.string,
            fontSize: PropTypes.number,
            fontColor: PropTypes.string,
            overlay: PropTypes.oneOf(['TextOnSketch', 'SketchOnText']),
            anchor: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
            position: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
            coordinate: PropTypes.oneOf(['Absolute', 'Ratio']),
            alignment: PropTypes.oneOf(['Left', 'Center', 'Right']),
            lineHeightMultiple: PropTypes.number,
        })),
        localSourceImage: PropTypes.shape({ filename: PropTypes.string, directory: PropTypes.string, mode: PropTypes.string }),

        permissionDialogTitle: PropTypes.string,
        permissionDialogMessage: PropTypes.string,
    };

    static defaultProps = {
        containerStyle: null,
        canvasStyle: null,
        onStrokeStart: () => { },
        onStrokeChanged: () => { },
        onStrokeEnd: () => { },
        onClosePressed: () => { },
        onUndoPressed: () => { },
        onClearPressed: () => { },
        onPathsChange: () => { },
        user: null,

        closeComponent: null,
        eraseComponent: null,
        undoComponent: null,
        clearComponent: null,
        saveComponent: null,
        strokeComponent: null,
        strokeSelectedComponent: null,
        strokeWidthComponent: null,

        strokeColors: [
            { color: '#000000' },
            { color: '#FF0000' },
            { color: '#00FFFF' },
            { color: '#0000FF' },
            { color: '#0000A0' },
            { color: '#ADD8E6' },
            { color: '#800080' },
            { color: '#FFFF00' },
            { color: '#00FF00' },
            { color: '#FF00FF' },
            { color: '#FFFFFF' },
            { color: '#C0C0C0' },
            { color: '#808080' },
            { color: '#FFA500' },
            { color: '#A52A2A' },
            { color: '#800000' },
            { color: '#008000' },
            { color: '#808000' }],
        alphlaValues: ['33', '77', 'AA', 'FF'],
        defaultStrokeIndex: 0,
        defaultStrokeWidth: 3,

        minStrokeWidth: 3,
        maxStrokeWidth: 15,
        strokeWidthStep: 3,

        savePreference: null,
        onSketchSaved: () => { },

        text: null,
        localSourceImage: null,

        permissionDialogTitle: '',
        permissionDialogMessage: '',
    };


    constructor(props) {
        super(props)

        this.state = {
            color: props.strokeColors[props.defaultStrokeIndex].color,
            strokeWidth: props.defaultStrokeWidth,
            alpha: 'FF'
        }

        this._colorChanged = false
        this._strokeWidthStep = props.strokeWidthStep
        this._alphaStep = -1
    }

    clear() {
        this._sketchCanvas.clear()
    }

    undo() {
        this._sketchCanvas.undo()
    }

    addPath(data) {
        this._sketchCanvas.addPath(data)
    }

    deletePath(id) {
        this._sketchCanvas.deletePath(id)
    }

    save() {
        if (this.props.savePreference) {
            const p = this.props.savePreference()
            this._sketchCanvas.save(p.imageType, p.transparent, p.folder ? p.folder : '', p.filename, p.includeImage !== false, p.includeText !== false, p.cropToImageSize || false)
        } else {
            const date = new Date()
            this._sketchCanvas.save('jpg', false, '',
                date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + '-' + ('0' + date.getMinutes()).slice(-2) + '-' + ('0' + date.getSeconds()).slice(-2),
                true, true, false)
        }
    }

    setStrokeWidth(width) {
        this.setState({ strokeWidth: width })
    }

    _renderItem = ({ item, index }) => (
        <TouchableOpacity style={{ marginHorizontal: 2.5 }} onPress={() => {
            if (this.state.color === item.color) {
                const index = this.props.alphlaValues.indexOf(this.state.alpha)
                if (this._alphaStep < 0) {
                    this._alphaStep = index === 0 ? 1 : -1
                    this.setState({ alpha: this.props.alphlaValues[index + this._alphaStep] })
                } else {
                    this._alphaStep = index === this.props.alphlaValues.length - 1 ? -1 : 1
                    this.setState({ alpha: this.props.alphlaValues[index + this._alphaStep] })
                }
            } else {
                this.setState({ color: item.color })
                this._colorChanged = true
            }
        }}>
            {this.state.color !== item.color && this.props.strokeComponent && this.props.strokeComponent(item.color)}
            {this.state.color === item.color && this.props.strokeSelectedComponent && this.props.strokeSelectedComponent(item.color + this.state.alpha, index, this._colorChanged)}
        </TouchableOpacity>
    )

    componentDidUpdate() {
        this._colorChanged = false
    }

    async componentDidMount() {
        const isStoragePermissionAuthorized = await requestPermissions(
            this.props.permissionDialogTitle,
            this.props.permissionDialogMessage,
        );
    }

    render() {
        return (
            <View style={this.props.containerStyle}>
                <SketchCanvas
                    ref={ref => this._sketchCanvas = ref}
                    style={this.props.canvasStyle}
                    strokeColor={'#ffffff'}
                    onStrokeStart={this.props.onStrokeStart}
                    onStrokeChanged={this.props.onStrokeChanged}
                    onStrokeEnd={this.props.onStrokeEnd}
                    user={this.props.user}
                    strokeWidth={this.state.strokeWidth}
                    onSketchSaved={(success, path) => this.props.onSketchSaved(success, path)}
                    onPathsChange={this.props.onPathsChange}
                    text={this.props.text}
                    localSourceImage={this.props.localSourceImage}
                    permissionDialogTitle={this.props.permissionDialogTitle}
                    permissionDialogMessage={this.props.permissionDialogMessage}
                    touchEnabled={this.props.touchEnabled}
                />
            </View>
        );
    }
};

RNSketchCanvas.MAIN_BUNDLE = SketchCanvas.MAIN_BUNDLE;
RNSketchCanvas.DOCUMENT = SketchCanvas.DOCUMENT;
RNSketchCanvas.LIBRARY = SketchCanvas.LIBRARY;
RNSketchCanvas.CACHES = SketchCanvas.CACHES;

export {
    SketchCanvas
}