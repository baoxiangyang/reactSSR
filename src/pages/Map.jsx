import React, { Component } from 'react'

const BMap = require('BMap');
class Map extends Component {
  componentDidMount() {
    const map = this.map = new BMap.Map("container");
    let pointArr = [
      {point: [106.553263,29.557058], name: '我是名称11111111', info: '这里是详情呀', Db: 50},
      {point: [106.584746,29.568159], name: '我是名称22222222', info: '这里是详情呀', Db: 42}, 
      {point: [106.560713,29.571035], name: '我是名称33333333', info: '这里是详情呀', Db: 89}, 
      {point: [106.578392,29.582688], name: '我是名称44444444', info: '这里是详情呀', Db: 23}, 
      {point: [106.533261,29.587086], name: '我是名称55555555', info: '这里是详情呀', Db: 78}
    ];
    map.enableScrollWheelZoom();
    pointArr.forEach((item, index) => {
      const point = new BMap.Point(item.point[0], item.point[1]),
        marker = new BMap.Marker(point),
        infoWindow = new BMap.InfoWindow(item.info, { width : 100, height: 50, title : item.name}),
        compOverlay = new ComplexCustomOverlay(point, {Db: item.Db});
        console.log(compOverlay)
        marker.addEventListener('click', function(){
          map.openInfoWindow(infoWindow, point);
        });
        map.addOverlay(compOverlay);
        map.addOverlay(marker); 
    });
    map.centerAndZoom(new BMap.Point(106.560713,29.571035), 15);
  }
  render() {
    return (
      <div id="container">
        
      </div>
    );
  }
}

class ComplexCustomOverlay extends BMap.Overlay {
  constructor(point, option) {
    super();
    this._point = point;
    this.option = option;
  }
  initialize (map) {
    this._map = map;
    // 创建div元素，作为自定义覆盖物的容器  
    let div = this._div = document.createElement("div");
    div.classList.add("noisefigure");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);//聚合功能?
    div.style.background = 'radial-gradient('+ this.bgGradient(this.option.Db)+')'
  　// 将div添加到覆盖物容器中  
    //getPanes(),返回值:MapPane,返回地图覆盖物容器列表
    map.getPanes().markerPane.appendChild(div);
    return div;
  }
  bgGradient (Db) {
    //接受一个分贝值 返回渐变色
    const colors = ['rgba(0,0,0,.6)', 'rgba(153,0,0,0.6)', 'rgba(204,0,0,0.6)', 'rgba(255,51,0,0.6)', 'rgba(255,204,0,0.6)', 
      'rgba(255,255,51,0.6)', 'rgba(0,0,153,0.6)', 'rgba(0,0,255,0.6)', 'rgba(0,153,255,0.6)', 'rgba(0,102,0,0.6)', 'rgba(0,204,0,0.6)', 'rgba(0,255,153,0.6)'];
    if (Db >= 85) {
      return colors.join(',')
    };
    if (Db < 35) {
      return (colors.slice(-1) + ', ' + colors.slice(-1));
    }
    const maxColorIndex = Math.ceil((Db - 35) / 5) + 1;
    return colors.slice(-maxColorIndex).join(',');
  }
  draw () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top  = pixel.y + "px";
  }
  addEventListener (event, fun) {
    this._div['on'+ event] = fun;
  }
}

export default Map;
