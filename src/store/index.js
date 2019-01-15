import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {reducer as homeReducer} from '../containers/Home/store';

const reducer = combineReducers({
  home: homeReducer
})

//让每一个用户都有一个自己的store，而不是获取同一引用
const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk));
}

export default getStore;