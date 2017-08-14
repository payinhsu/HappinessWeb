import React from 'react';
import {Link} from 'react-router';
var config = require('config');

export default class NavBar extends React.Component {
  render() {
    return (
      <div id="sidebar-wrapper">
        <ul id="sidebar-view">
        	{this.props.links.map(link => <li key={`link_${link.text}`}><Link to={link.url}>{link.text}</Link></li>)}
        </ul>
      </div>
    );
  }
}