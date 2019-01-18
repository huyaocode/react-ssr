import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getIsLogin, login, logout } from './store/action'
import styles from './style.css'
import withStyle from '../../withStyle'

class Header extends Component {

  render() {
    const { isLogin, handleLogin, handleLogout } = this.props
    return (
      <div className={styles.test}>
        <Link to="/"> 首页 </Link>
        <br />
        {isLogin ? (
          <Fragment>
            <Link to="/translation"> 翻译列表 </Link>
            <br />
            <button onClick={handleLogout}> 退出 </button>
          </Fragment>
        ) : (
          <button onClick={handleLogin}> 登陆 </button>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: state.header.login
})

const mapDisPathToProps = dispatch => ({
  handleLogin() {
    dispatch(login())
  },
  handleLogout() {
    dispatch(logout())
  }
})

const exportHeader = connect(
  mapStateToProps,
  mapDisPathToProps
)(withStyle(Header, styles))

exportHeader.loadData = store => {
  store.dispath(getIsLogin())
}

export default exportHeader;
