import { CHANGE_LIST } from './actionType'
const changeList = list => ({
  type: CHANGE_LIST,
  list
})

export const getHomeList = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/newsList').then(res => {
      dispatch(changeList(res.data))
    })
  }
}