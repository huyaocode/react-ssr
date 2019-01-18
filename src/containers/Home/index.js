import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHomeList } from './store/action'
import styles from './style.css'
import withStyle from '../../withStyle'

class Home extends Component {

  getList() {
    const { list } = this.props
    return list.map(item => <div key={item.id} className={styles.item}>{item.title}</div>)
  }

  render() {
    return (
      <div className={styles.container}>
        {this.getList()}
      </div>
    )
  }
  //componentDidMount在服务器端不执行
  componentDidMount() {
    if(!this.props.list.length) {
      this.props.getHomeList()
    }
  }
}

const mapStateToProps = state => ({
  list: state.home.newsList
})

const mapDispathToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList())
  }
})

const ExportHome = connect(
  mapStateToProps,
  mapDispathToProps
)(withStyle(Home, styles))

ExportHome.loadData = (store) => {
  //这个函数，负责在服务器端渲染之前，把这个路由需要的数据加载好
  return store.dispatch(getHomeList())
}

export default ExportHome
