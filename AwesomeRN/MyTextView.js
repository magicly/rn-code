import PropTypes from 'prop-types';
import React from 'react';
import { requireNativeComponent } from 'react-native';

const TextView = () => {
  <MyTextView {...this.prps} />
}

TextView.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number,
}
const MyTextView = requireNativeComponent('MyTextView', TextView, {
  nativeOnly: {
    textColor: true,
    isAlpha: true,
    testID: true,
    nativeID: true,
    accessibilityComponentType: true,
    accessibilityLabel: true,
    accessibilityLiveRegion: true,
    renderToHardwareTextureAndroid: true,
    importantForAccessibility: true,
    onLayout: true,
  }
});

export default MyTextView;