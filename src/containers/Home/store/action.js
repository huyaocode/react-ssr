import { CHANGE_LIST } from './constants'

const changeList = list => ({
  type: CHANGE_LIST,
  list
})

export const getHomeList = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve({
          data: [
            { id: 0, title: 'html' },
            { id: 1, title: 'css' },
            { id: 2, title: 'javascript' },
            { id: 3, title: 'jquery' },
            { id: 4, title: 'vue' },
            { id: 5, title: 'React' }
          ]
        })
      }, 1000)
    }).then(res => {
      dispatch(changeList(res.data))
    })
  }
}
