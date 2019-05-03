import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { loadableReady } from '@loadable/component'

import { getClientStore } from './store/index';
import routes from '././router/index.js'
const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

const store = getClientStore()

const App = () => {
  return (
  	<Provider store={store}>
  		<BrowserRouter>
	  		<StyleContext.Provider value={{ insertCss }}>
		      {renderRoutes(routes)}
			  </StyleContext.Provider>
		  </BrowserRouter>
    </Provider>
  )
}
loadableReady(() => {
  ReactDOM.hydrate(<App />, document.getElementById('root'));
})

