import React, { Component } from 'react'
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
      <div className={styles.container}>{this.translationList()}</div>
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
