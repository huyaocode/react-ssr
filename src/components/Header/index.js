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
      <div className={styles.container}>
        <Link to="/" className={styles.item}> 首页 </Link>
        {isLogin ? (
          <Fragment>
            <Link to="/translation"  className={styles.item}> 翻译列表 </Link>
            <div onClick={handleLogout}  className={styles.item}> 退出 </div>
          </Fragment>
        ) : (
          <div onClick={handleLogin} className={styles.item}> 登陆 </div>
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
