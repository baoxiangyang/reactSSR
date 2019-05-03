import React, { Component } from 'react';

class Index extends Component {
	handleClick () {
		alert(1111)
	}
	render() {
    return (
      <div id="container" onClick={this.handleClick}>
        这是首页
      </div>
    );
  }
}

export default Index