import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {reducer as homeReducer} from '../containers/Home/store';
import clientAxios from '../client/request'
import serverAxios from '../server/request'

const reducer = combineReducers({
  home: homeReducer
})

//让每一个用户都有一个自己的store，而不是获取同一引用
export const getStore = () => {
  //改变服务端store的内容，一定要使用的 serverAxios
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
}

export const getClientStore = () => {
  const defaultState = window.context.state;
  //改变客户端store的内容，一定要使用的 clientAxios
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}