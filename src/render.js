import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'

import { ChunkExtractor } from '@loadable/server'

const statsFile = path.resolve(__dirname, '../dist/client/loadable-stats.json')

export default async (ctx, store, routes) => {
  const context = {}
  const chunkExtractor = new ChunkExtractor({ statsFile })
  const html = renderToString (
    chunkExtractor.collectChunks(
      <Provider store={store}>
        <StaticRouter location={ctx.request.path} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    )
  )
  return {
    html, 
    link: chunkExtractor.getLinkTags(), 
    style: chunkExtractor.getStyleTags(), 
    script:chunkExtractor.getScriptTags(),
    store: JSON.stringify(store.getState())
  }
}
