import React, { PropTypes } from 'react';
import { connect }            from 'react-redux';
// import * as OrderActions       from 'actions/senior/OrderActions';
import mapDispatchToProps       from 'actions';
import {Link} from 'react-router';
var config = require('config');

class App extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  static childContextTypes = {
    authData: React.PropTypes.object
  };

  getChildContext() {
    return {authData: this.props.auth};
  };

  render() {
    let childProps = Object.assign({}, this.props);
    //console.log("index : " + typeof this.props.actions.getCareInstitution) ;
    delete childProps.children;
      // <div id="main-view">     - origin
      //   <div>
      //     <Link to={`${config.webContext}senior`}>銀髮銀行</Link> &nbsp;
      //     <Link to={`${config.webContext}master`}>銀髮學苑</Link> &nbsp;
      //     <Link to={`${config.webContext}management`}>後台管理</Link>
      //     ({this.props.auth ? ' 您好, ' + this.props.auth.firstName : ' 未登入'})
      //   </div>
      //   {this.props.children && React.cloneElement(this.props.children, {...childProps})}
      // </div>

    return (
      <div id="main-view">
        {this.props.children && React.cloneElement(this.props.children, {...childProps})}
      </div>
    );
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(App)