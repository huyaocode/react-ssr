import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getTranslationList } from './stroe/actions'

class Translation extends Component {
  translationList() {
    const { list } = this.props
    return <ul>{list.map(item => <li key={item.id}>{item.title}</li>)}</ul>
  }
  render() {
    return this.props.login ? 
    (
      <div>
        <div>Translation</div>
        {this.translationList()}
      </div>
    )
    :
    <Redirect to="/" />
  }
  componentDidMount() {
    if(!this.props.list.length){
      this.props.getTranslationList();
    }
  }
}

Translation.loadData = store => {
  return store.dispatch(getTranslationList())
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Translation)
