import PropTypes from 'prop-types';
import React from 'react';
import { requireNativeComponent } from 'react-native';

class MapView extends React.Component {
  _onRegionChange = (event) => {
    if (!this.props.onRegionChange) {
      return;
    }

    // 返回nativeEvent
    this.props.onRegionChange(event.nativeEvent);
  }
  render() {
    return (
      <RNTMap 
        {...this.props} 
        onRegionChange={this._onRegionChange} 
      />
    );
  }
}

MapView.propTypes = {
  /**
   * Boolean类型的值， 决定是否允许用户用手势放大或缩小地图
   */
  zoomEnabled: PropTypes.bool,
  /**
   * 地图显示的范围：通过中心点经纬度以及宽和高的范围控制
   */
  region: PropTypes.shape({
    /**
     * 地图中心点经纬度
     */
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,

    /**
     * 地图显示的最大经纬度范围
     */
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired,
  }),
  /**
 * 用户拖动地图时候触发的回调函数
 */
  onRegionChange: PropTypes.func,
};

// requireNativeComponent会自动把'RNTMap'替换成'RNTMapManager'
const RNTMap = requireNativeComponent('RNTMap', MapView);

module.exports = MapView;