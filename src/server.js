import path from 'path'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import { ChunkExtractor } from '@loadable/server'

import { getStore } from './store/index.js'
import routes from './router/index.js'
import serverRender from './render.js'

export default async function (ctx, next) {
	const store = getStore(ctx.request),
		mtRoutes = matchRoutes(routes, ctx.request.originalUrl);
	if (mtRoutes && mtRoutes.length) {
		//预加载数据
	  const loadDatas = mtRoutes.filter(item => !!item.route.loadData).map(item => item.route.loadData(store));
	  if (loadDatas && loadDatas.length) {
	  	await Promise.all(loadDatas);
	  }
		return await serverRender(ctx, store, routes);
	} else {
		await next();
	}
}


