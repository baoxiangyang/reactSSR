import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import mapList from './mapList/reducer.js'
import {clientAxios, serverAxios} from '../axios/index.js'


const reducer = combineReducers({
  mapList
})

export const getStore = req => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))))
}

export const getClientStore = () => {
  // 从服务器端输出的页面上拿到脱水的数据
  const defaultState = window.__store;
  // 当做 store的初始数据（即注水）
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}