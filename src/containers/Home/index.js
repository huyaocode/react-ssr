import React, { Component } from 'react'
import Header from '../../components/Header'
import { connect } from 'react-redux'
import { getHomeList } from './store/action'

class Home extends Component {
  
  getList() {
    const { list } = this.props
    return list.map(item => <div key={item.id}>{item.title}</div>)
  }

  render() {
    return (
      <div>
        <Header />
        {this.getList()}
        <button onClick={() => alert('click')}>click</button>
      </div>
    )
  }
  //componentDidMount在服务器端不执行
  componentDidMount() {
    if(!this.props.list.length) {
      this.props.getHomeList(false)
    }
  }
}

Home.loadData = (store) => {
  //这个函数，负责在服务器端渲染之前，把这个路由需要的数据加载好
  return store.dispatch(getHomeList(true))
}

const mapStateToProps = state => ({
  list: state.home.newsList
})

const mapDispathToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList())
  }
})

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Home)
