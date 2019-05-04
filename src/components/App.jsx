/* 公共顶部 */    
import React from 'react'
import { renderRoutes } from 'react-router-config'
import '../assets/styles/global.less'

const App = props => {
  return (
    <div className="app">
      <header>React SSR</header>
      {renderRoutes(props.route.routes)}
    </div>
  )
}

export default App