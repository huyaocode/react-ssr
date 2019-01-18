import React, {Component} from 'react'

/**
 * 生成高阶组件的函数
 * 这个函数返回一个组件
 */
export default (DecoratedComponent, styles) => {
  // 返回一个高阶组件
  return class NewComponent extends Component {

    componentWillMount() {
      if(this.props.staticContext) {
        //staticContext只会在服务端渲染才会有这个对象
        this.props.staticContext.css.push(styles._getCss());      
      }
    }

    render() {
      return <DecoratedComponent {...this.props} />
    }

  }
}