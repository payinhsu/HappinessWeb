import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import MapIframe from 'components/MapIframe';
import Header from 'components/common/Header';
import { connect }            from 'react-redux';
import * as PageActions from 'actions/PageActions';
var config = require('config');

class RefIns extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	};

	componentWillReceiveProps = newProps => {

	};

	render() {
		let downloadPath = `${config.happinessAPIUrl}/excel/1/download?access_token=${this.props.auth.accessToken}`;
		return (
		 	<div id="portal">
		 		<Header/>
				<div className="mapIframe">
					<MapIframe></MapIframe>
				</div>
				<a href= {downloadPath} className="btn-default btn-primary float-left">匯出excel</a>
	        </div>
		 );
	}
}
export default connect(null, {...PageActions})(RefIns)