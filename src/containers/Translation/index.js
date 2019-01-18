import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getTranslationList } from './stroe/actions'
import styles from './style.css'
import withStyle from '../../withStyle'

class Translation extends Component {
  translationList() {
    const { list } = this.props
    return list.map(item => (
      <div className={styles.item} key={item.id}>
        {item.title}
      </div>
    ))
  }
  render() {
    return this.props.login ? (
      <Fragment>
        <Helmet>
          <title>Huyao的SSR翻译页面 - 丰富多彩的咨询</title>
          <meta name="description" content="Huyao的SSR翻译页面 - 丰富多彩的咨询"/>
        </Helmet>
        <div className={styles.container}>{this.translationList()}</div>
      </Fragment>
    ) : (
      <Redirect to="/" />
    )
  }
  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getTranslationList()
    }
  }
}

const mapStateToProps = state => ({
  list: state.translation.list,
  login: state.header.login
})

const mapDispatchToProps = dispatch => ({
  getTranslationList() {
    dispatch(getTranslationList())
  }
})

const ExportTranslation = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyle(Translation, styles))

ExportTranslation.loadData = store => {
  return store.dispatch(getTranslationList())
}

export default ExportTranslation
