import path from 'path'
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { ChunkExtractor } from '@loadable/server'

import { getStore } from './store/index.js'
import routes from './router/index.js'
import serverRender from './render.js'

export default async function (ctx, next) {
	const store = getStore(ctx.request),
		mtRoutes = matchRoutes(routes, ctx.request.originalUrl);
  const promises = [];
	if (mtRoutes && mtRoutes.length) {
		mtRoutes.forEach(item => {
      if (item.route.loadData) {
        // 为了保证尽可能让能够成功的请求全部成功，不被失败的请求干扰，这里多包装一层 Promise
        promises.push(new Promise(resolve => {
          // 无论成功还是失败都返回 resolve，以便让后面的 Promise.all可以等待所有请求完成
          item.route.loadData(store).then(resolve).catch(resolve)
        }))
      }
    })
		await Promise.all(promises);
		return await serverRender(ctx, store, routes);
	} else {
		await next();
	}
}


