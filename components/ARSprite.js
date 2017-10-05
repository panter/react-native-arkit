import React, { Component } from 'react';
import withAnimationFrame from 'react-animation-frame';

import { NativeModules, Animated } from 'react-native';

import { position } from './lib/propTypes';

const ARKitManager = NativeModules.ARKitManager;

const ARSprite = withAnimationFrame(
  class extends Component {
    identifier = null;
    mounted = false;

    constructor(props) {
      super(props);

      this.state = {
        visible: false,
        pos2D: new Animated.ValueXY(), // inits to zero
      };
    }
    onAnimationFrame() {
      ARKitManager.projectPoint(
        this.props.position,
      ).then(({ x, y, z, distance }) => {
        if (this.mounted) {
          const visible = z < 1;
          if (visible !== this.state.visible) this.setState({ visible });

          this.state.pos2D.setValue({ x, y });
        }
      });
    }
    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      if (!this.state.visible) {
        return null;
      }
      return (
        <Animated.View
          style={{
            transform: this.state.pos2D.getTranslateTransform(),
            ...this.props.style,
          }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  },
);

ARSprite.propTypes = {
  position,
};

module.exports = ARSprite;
