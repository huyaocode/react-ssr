import * as actionTypes from './actionType'

const changeLoginState = isLogin => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  login: isLogin
})

// 是否登陆
export const getIsLogin = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/isLogin').then(res => {
      dispatch(changeLoginState(res.data.data.login));
    }).catch(err => {
      console.error('err !!!!!!\n', err)
    })
  }
}

// 登陆
export const login = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/login').then(res => {
      if(res.data.success) {
        dispatch(changeLoginState(true));
      }
    }).catch(err => {
      console.error('err !!!!!!\n', err)
    })
  }
}

// 登出
export const logout = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/logout').then(res => {
      if(res.data.success) {
        dispatch(changeLoginState(false));
      }
    }).catch(err => {
      console.error('err !!!!!!\n', err)
    })
  }
}