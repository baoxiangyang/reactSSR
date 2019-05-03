/* 公共顶部 */    
import React from 'react'
import { renderRoutes } from 'react-router-config'
import '../assets/styles/global.less'

const App = props => {
  return (
    <div>
      <span>123123</span>
      {renderRoutes(props.route.routes)}
    </div>
  )
}

export default App