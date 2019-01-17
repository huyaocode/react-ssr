import * as actionTypes from './actionType'

const defaultState = {
  login: false
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_LOGIN_STATUS:
      return {
        ...state,
        login: action.login
      }
    default:
      return state;
  }
}