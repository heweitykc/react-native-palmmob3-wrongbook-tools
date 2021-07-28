import React, {Component} from 'react';
import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import Svg, {Path} from 'react-native-svg';

import {
  CONNECTOR_TOP_LEFT,  
  CONNECTOR_TOP_RIGHT,  
  CONNECTOR_BOTTOM_RIGHT,  
  CONNECTOR_BOTTOM_LEFT  
} from './Connector';

import {
  RoundConnector,
} from './RoundConnector';

export const AXIS_X = 'x';
export const AXIS_Y = 'y';
export const AXIS_ALL = 'all';

const DEFAULT_Z_INDEX = 1;

/**
 * Drag cut block.
 */
export class DragCutBlock extends Component {

  constructor(props) {
    super(props);

    const {
      x,
      y,
      w,
      h,
      minW,
      minH,
      connector_size,
    } = props;

    this.state = {
      isSelected: false,
      x,
      y,
      w: w < minW ? minW : w,
      h: h < minH ? minH : h,
    };

    /**
     * Connectors binding.
     */
    this.connectorsMap = {};

    /**
     * Top left connector.
     */
    this.connectorsMap[CONNECTOR_TOP_LEFT] = {
      calculateX: (width) => {
        return 0;
      },
      calculateY: (height) => {
        return 0;
      },
      onStart: this.onResizeStart,
      onMove: this.onResizeTL,
      onEnd: this.onResizeEnd,
    };

    /**
     * Top right connector.
     */
    this.connectorsMap[CONNECTOR_TOP_RIGHT] = {
      calculateX: (width) => {
        return width - connector_size;
      },
      calculateY: (height) => {
        return 0;
      },
      onStart: this.onResizeStart,
      onMove: this.onResizeTR,
      onEnd: this.onResizeEnd,
    };


    /**
     * Bottom right connector.
     */
    this.connectorsMap[CONNECTOR_BOTTOM_RIGHT] = {
      calculateX: (width) => {
        return width - connector_size;
      },
      calculateY: (height) => {
        return height - connector_size;
      },
      onStart: this.onResizeStart,
      onMove: this.onResizeBR,
      onEnd: this.onResizeEnd,
    };

    /**
     * Bottom left connector.
     */
    this.connectorsMap[CONNECTOR_BOTTOM_LEFT] = {
      calculateX: (width) => {
        return 0;
      },
      calculateY: (height) => {
        return height - connector_size;
      },
      onStart: this.onResizeStart,
      onMove: this.onResizeBL,
      onEnd: this.onResizeEnd,
    };

  }

  /**
   * Handle resize start event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  onResizeStart = (coord) => {
    const {
      onResizeStart,
    } = this.props;

    this.setState(() => {
      return {
        isSelected: true,
      };
    });

    if (onResizeStart !== null) {
      onResizeStart([
        this.state.x,
        this.state.y,
      ]);
    }
  }

  onResizeTL = (coord) => {
    const {
      minW,
      minH,
      axis,
      isResizable,
      limitation,
      onResize,
    } = this.props;

    if (!isResizable) {
      return;
    }

    this.setState(() => {
      const newX = this.state.x + coord[0];
      const newY = this.state.y + coord[1];
      const newW = this.state.x + this.state.w - newX;
      const newH = this.state.y + this.state.h - newY;

      if (newW >= minW && axis != AXIS_Y) {
        if (limitation.x <= newX) {
          this.state.w = newW;
          this.state.x = newX;
        }
      }

      if (newH >= minH && axis != AXIS_X) {
        if (limitation.y <= newY) {
          this.state.h = newH;
          this.state.y = newY;
        }
      }

      if (onResize !== null) {
        onResize([
          this.state.w,
          this.state.h,
        ]);
      }

      return this.state;
    });
  }

  onResizeTR = (coord) => {
    const {
      minW,
      minH,
      axis,
      isResizable,
      limitation,
      onResize,
    } = this.props;

    if (!isResizable) {
      return;
    }

    this.setState(() => {
      const newY = this.state.y + coord[1];
      const newW = this.state.w + coord[0];
      const newH = this.state.y + this.state.h - newY;

      if (newW >= minW && axis != AXIS_Y) {
        if (limitation.w >= this.state.x + newW) {
          this.state.w = newW;
        }
      }

      if (newH >= minH && axis != AXIS_X) {
        if (limitation.y <= newY) {
          this.state.h = newH;
          this.state.y = newY;
        }
      }

      if (onResize !== null) {
        onResize([
          this.state.w,
          this.state.h,
        ]);
      }

      return this.state;
    });
  }

  onResizeBR = (coord) => {
    const {
      minW,
      minH,
      axis,
      isResizable,
      limitation,
      onResize,
    } = this.props;

    if (!isResizable) {
      return;
    }

    this.setState(() => {
      const newW = this.state.w + coord[0];
      const newH = this.state.h + coord[1];

      if (newW >= minW && axis != AXIS_Y) {
        if (limitation.w >= this.state.x + newW) {
          this.state.w = newW;
        }
      }

      if (newH >= minH && axis != AXIS_X) {
        if (limitation.h >= this.state.y + newH) {
          this.state.h = newH;
        }
      }

      if (onResize !== null) {
        onResize([
          this.state.w,
          this.state.h,
        ]);
      }

      return this.state;
    });
  }

  onResizeBL = (coord) => {
    const {
      minW,
      minH,
      axis,
      isResizable,
      limitation,
      onResize,
    } = this.props;

    if (!isResizable) {
      return;
    }

    this.setState(() => {
      const newX = this.state.x + coord[0];
      const newW = this.state.x + this.state.w - newX;
      const newH = this.state.h + coord[1];

      if (newW >= minW && axis != AXIS_Y) {
        if (limitation.x <= newX) {
          this.state.w = newW;
          this.state.x = newX;
        }
      }

      if (newH >= minH && axis != AXIS_X) {
        if (this.state.y + newH <= limitation.h) {
          this.state.h = newH;
        }
      }

      if (onResize !== null) {
        onResize([
          this.state.w,
          this.state.h,
        ]);
      }

      return this.state;
    });
  }

  /**
   * Handle resize end event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  onResizeEnd = (coord) => {
    const {
      onResizeEnd,
    } = this.props;

    this.setState(() => {
      return {
        isSelected: false,
      };
    });

    if (onResizeEnd !== null) {
      onResizeEnd([
        this.state.w,
        this.state.h,
      ]);
    }
  }

  /**
   * Handle drag start event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  onDragStart = (coord) => {
    const {
      onDragStart,
    } = this.props;

    this.setState(() => {
      return {
        isSelected: true,
      };
    });

    if (onDragStart !== null) {
      onDragStart([
        this.state.x,
        this.state.y,
      ]);
    }
  }

  /**
   * Handle drag event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  onDrag = (coord) => {
    const {
      axis,
      isDraggable,
      limitation,
      onDrag,
    } = this.props;

    if (!isDraggable) {
      return;
    }

    this.setState(() => {
      const newX = this.state.x + coord[0];
      const newY = this.state.y + coord[1];

      if (axis != AXIS_Y) {
        if (limitation.x <= newX && limitation.w >= newX + this.state.w) {
          this.state.x = newX;
        }
      }

      if (axis != AXIS_X) {
        if (limitation.y <= newY && limitation.h >= newY + this.state.h) {
          this.state.y = newY;
        }
      }

      if (onDrag !== null) {
        onDrag([
          this.state.x,
          this.state.y,
        ]);
      }

      return this.state;
    });
  }

  /**
   * Handle drag end event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  onDragEnd = (coord) => {
    const {
      onDragEnd,
    } = this.props;

    this.setState(() => {
      return {
        isSelected: false,
      };
    });

    if (onDragEnd !== null) {
      onDragEnd([
        this.state.x,
        this.state.y,
      ]);
    }
  }

  /**
   * Render connector components.
   */
  renderConnectors = () => {
    const {
      connectors,
      connector_size
    } = this.props;

    const {
      w,
      h,
    } = this.state;

    return connectors.map((connectorType) => {

      let csize = connector_size;

      return (
        <RoundConnector
          key={connectorType}
          type={connectorType}
          size={csize}
          x={this.connectorsMap[connectorType].calculateX(w)}
          y={this.connectorsMap[connectorType].calculateY(h)}
          onStart={this.connectorsMap[connectorType].onStart}
          onMove={this.connectorsMap[connectorType].onMove}
          onEnd={this.connectorsMap[connectorType].onEnd}
        />
      );
    });
  }

  render() {
    const {
      children,
      isDisabled,
      zIndex,
      connector_size,
    } = this.props;

    const {
      x,
      y,
      w,
      h,
      isSelected,
    } = this.state;

    let path_w = w - connector_size;
    let path_h = h - connector_size;
    let path = "M 0 0 L "+ path_w +" 0  L "+ path_w +" "+ path_h +" L 0 "+ path_h +" L 0 0";

    return (
      <View
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: w,
          height: h,
          padding: connector_size / 2,
          zIndex: isSelected ? zIndex + 1 : zIndex,
        }}
      >
        <Svg height={h} width={w} fill="#00000022" >
          <Path d={path} stroke="black" />
        </Svg>
        {isDisabled ? null : this.renderConnectors()}
      </View>
    );
  }
}

DragCutBlock.defaultProps = {
  x: 0,
  y: 0,
  w: 100,
  h: 100,
  minW: 50,
  minH: 50,
  axis: AXIS_ALL,
  limitation: {
    x: 0,
    y: 0,
    w: Dimensions.get('window').width,
    h: Dimensions.get('window').height,
  },
  isDisabled: false,
  zIndex: DEFAULT_Z_INDEX,
  isDraggable: true,
  isResizable: true,
  connectors: [
    CONNECTOR_TOP_LEFT,
    CONNECTOR_TOP_RIGHT,
    CONNECTOR_BOTTOM_RIGHT,
    CONNECTOR_BOTTOM_LEFT,
  ],

  onPress: null,
  onDragStart: null,
  onDrag: null,
  onDragEnd: null,
  onResizeStart: null,
  onResize: null,
  onResizeEnd: null,
};

DragCutBlock.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  w: PropTypes.number,
  h: PropTypes.number,
  minW: PropTypes.number,
  minH: PropTypes.number,
  zIndex: PropTypes.number,
  axis: PropTypes.oneOf([
    AXIS_X,
    AXIS_Y,
    AXIS_ALL,
  ]),
  limitation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired,
  }),
  isDisabled: PropTypes.bool,
  isDraggable: PropTypes.bool,
  isResizable: PropTypes.bool,
  connectors: PropTypes.array,

  onPress: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onResizeStart: PropTypes.func,
  onResize: PropTypes.func,
  onResizeEnd: PropTypes.func,
};
