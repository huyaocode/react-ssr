import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {reducer as headerReducer} from '../components/Header/store';
import {reducer as homeReducer} from '../containers/Home/store';
import {reducer as translationReducer} from '../containers/Translation/stroe';
import clientAxios from '../client/request'
import serverAxios from '../server/request'

const reducer = combineReducers({
  home: homeReducer,
  header: headerReducer,
  translation: translationReducer
})

//让每一个用户都有一个自己的store，而不是获取同一引用
export const getStore = (req) => {
  //改变服务端store的内容，一定要使用的 serverAxios
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))));
}

export const getClientStore = () => {
  const defaultState = window.context.state;
  //改变客户端store的内容，一定要使用的 clientAxios
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}