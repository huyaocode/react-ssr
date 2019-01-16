import { CHANGE_LIST } from './constants'
import clientAxios from '../../../client/request'
import serverAxios from '../../../server/request'

const changeList = list => ({
  type: CHANGE_LIST,
  list
})

export const getHomeList = (isServer) => {
  let request = isServer ? serverAxios : clientAxios;

  return dispatch => {
    return request.get('/api/news.json').then(res => {
      dispatch(changeList(res.data))
    }).catch(err => {
      console.error('err !!!!!!\n', err)
    })
  }
}