import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Index extends Component {
	render() {
    return (
      <Link to="/map">前往地图页</Link>
    );
  }
}

export default Index