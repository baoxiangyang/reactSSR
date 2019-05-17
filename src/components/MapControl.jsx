/* 地图控制台 */
import React, { Component } from 'react'
import { Switch, Form, Select, DatePicker, TimePicker, Button  } from 'antd';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import formatTime from '../util/formatTime.js'
const FormItem = Form.Item;
const Option = Select.Option;

export default class Control extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      list: [], //数据列表
      findType: 1 //查询类型 1是地点， 2是类型
    };
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.disabledDate = this.disabledDate.bind(this);
    this.positionChange = this.positionChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.eventChange = this.eventChange.bind(this);
    //事件类型
    this.events = [
      {id: 1, name:'鸣笛声'},
      {id: 2, name:'警笛声'},
      {id: 3, name:'爆炸声'},
      {id: 4, name:'枪声'}
    ]
  }
  componentWillMount () {
    this.setState({list: this.props.list})
  }
	componentWillReceiveProps (props) {
    this.setState({list: props.list, ...props.mapDom})
	}
  handleSwitchChange (boolean) {
    //开关热力图
    this.state.compOverlay.forEach(item => {
      boolean ? item.show() : item.hide()
    });
  }
  disabledDate (moment) {
    return moment._d > Date.now()
  }
  typeChange (value) {
    //修改查询类型
    this.setState({findType: value})
  }
  positionChange(value) {
    //修改位置
    console.log(`selected ${value}`);
  }
  eventChange(value) {
    //修改查询事件
    console.log(`selected ${value}`);
  }
	render() {
    const {findType} = this.state; 
    return (
      <div id="control">
        <Form layout="inline">
          <FormItem label="噪声开关">
            <Switch defaultChecked={true}  onChange={this.handleSwitchChange}/>
          </FormItem>
        </Form>
        <Form>
          <FormItem label="数据查询">
            <DatePicker className="rMargin" disabledDate={this.disabledDate} defaultValue={moment(formatTime(Date.now(), 'YYYY-MM-DD'), 'YYYY-MM-DD')} placeholder="请选择查询日期" />
            <TimePicker className="rMargin" defaultValue={moment('0:00', 'HH:mm')} format='HH:mm' placeholder="开始时间" />
            <TimePicker defaultValue={moment('23:55', 'HH:mm')} format='HH:mm' placeholder="开始结束" />
            <br />
            <Select className="rMargin width120" defaultValue={this.state.findType} onChange={this.typeChange}>
              <Option value={1}>地点</Option>
              <Option value={2}>事件</Option>
            </Select>
            <Select className="rMargin width120"  defaultValue={1} style={{display: (findType == 1 ? 'inline-block': 'none') }} onChange={this.positionChange}>
              {this.state.list.map(item => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>
              })}
            </Select>
            <Select className="rMargin width120" defaultValue={1} style={{display: (findType == 2 ? 'inline-block': 'none') }} onChange={this.eventChange}>
              {this.events.map(item => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>
              })}
            </Select>
            <Button type="primary">查询</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

