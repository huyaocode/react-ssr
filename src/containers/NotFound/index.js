import React, {Component} from 'react'

class NotFound extends Component {
  componentWillMount() {
    // 服务端渲染与客户端渲染都会执行
    const {staticContext} = this.props;
    staticContext &&  (staticContext.NOT_FOUND = true);
  }
  render() {
    return (
      <div>
        <div> 404 </div>
        <div> page not found. </div>
      </div>
    )
  }
  
}

export default NotFound;