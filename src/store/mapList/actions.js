import { CHANGE_LIST } from './constants'

const changeList = list => ({
  type: CHANGE_LIST,
  list
})

export const getMapList = () => {
  return (dispatch, getState, axios) => {
    return axios.get('/api/getMapList').then(response => {
      return dispatch(changeList(response.data));
    });
  }
}