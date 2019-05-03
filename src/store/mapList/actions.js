import { CHANGE_LIST } from './constants'

const changeList = list => ({
  type: CHANGE_LIST,
  list
})

export const getMapList = () => {
  // 这里路径要写全（包括域名），如果写成 /api/douban/movie 服务器端会认为请求域名是 127.0.0.1:80
  return (dispatch, getState, axiosInstance) => {
  	setTimeout(() => {
  		dispatch(changeList([{name: 'test'}]))
  	}, 500)
  }
}