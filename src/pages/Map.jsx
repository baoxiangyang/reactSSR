import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getMapList } from '../store/mapList/actions.js'
import '../assets/styles/map.less'
import ComplexCustomOverlay from '../util/ComplexCustomOverlay.js'

import MapControl from '../components/MapControl.jsx'

@connect(state => state.mapList, {getMapList})
class Map extends Component {
  constructor () {
    super();
    this.state = {mapDom: {}, list:[]};
  }
  componentWillMount () {
    if(!!global.document) { 
      //百度地图api中存在使用document 不支持服务端渲染 只能在客户端执行;
      this.ComplexCustomOverlay = ComplexCustomOverlay();
      if(!this.props.list.length) {
        this.props.getMapList();
      }
    }
    this.setState({list: this.props.list})
  }
  componentWillReceiveProps (props) {
    this.drawMap(props.list);
    this.setState({list: props.list})
  }
  componentDidMount () {
    this.drawMap();
  }
  drawMap(list) {
    const BMap = window.BMap,
      map = this.map = new BMap.Map("mapBox"),
      ComplexCustomOverlay = this.ComplexCustomOverlay;
    let pointArr = list || this.props.list;
    map.enableScrollWheelZoom();

    let mapDom = {
      marker: [],
      compOverlay: []
    }
    pointArr.forEach((item, index) => {
      const point = new BMap.Point(item.point[0], item.point[1]),
        marker = new BMap.Marker(point),
        infoWindow = new BMap.InfoWindow(item.info, { width : 100, height: 50, title : item.name}),
        compOverlay = new ComplexCustomOverlay(point, {Db: item.Db});
        marker.addEventListener('click', function(){
          map.openInfoWindow(infoWindow, point);
        });
        map.addOverlay(compOverlay);
        map.addOverlay(marker); 
        mapDom.marker.push(marker);
        mapDom.compOverlay.push(compOverlay)
    });
    this.setState({mapDom})
    map.centerAndZoom(new BMap.Point(this.state.list[0].point[0], this.state.list[0].point[1]), 18);
  }
  render() {
    return (
      <div id="map">
        <div id="mapBox"></div>  
        <MapControl list={this.state.list} mapDom={this.state.mapDom} />
      </div>
    );
  }
}

export default Map;
