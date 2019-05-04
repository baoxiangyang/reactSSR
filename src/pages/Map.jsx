import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getMapList } from '../store/mapList/actions.js'
import '../assets/styles/map.less'

@connect(state => state.mapList, {getMapList})
class Map extends Component {
  componentWillMount () {
    if(!!global.document) { 
      //百度地图api中存在使用document 不支持服务端渲染 只能在客户端执行;
      this.ComplexCustomOverlay = class ComplexCustomOverlay extends window.BMap.Overlay {
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
      if(!this.props.list.length) {
        this.props.getMapList();
      }
    }
  }
  componentWillReceiveProps (props) {
    this.drawMap(props.list);
  }
  componentDidMount () {
    this.drawMap();
  }
  drawMap(list) {
    const BMap = window.BMap,
      map = this.map = new BMap.Map("container"),
      ComplexCustomOverlay = this.ComplexCustomOverlay;
    let pointArr = list || this.props.list;
    map.enableScrollWheelZoom();
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

export default Map;
