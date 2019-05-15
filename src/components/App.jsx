/* 公共顶部 */    
import React from 'react'
import { renderRoutes } from 'react-router-config'
import '../assets/styles/global.less'

const App = props => {
  return (
    <div className="app">
      <header>噪声系统</header>
      {renderRoutes(props.route.routes)}
    </div>
  )
}

export default App