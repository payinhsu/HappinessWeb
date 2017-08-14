import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import {Pagination} from 'react-bootstrap';

export default class PaginationUtil extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            list: props.list,
            activePage: 1,
            pageSize: props.pageSize,
            items: parseInt((props.list.length / props.pageSize).toFixed(0)),
            subList: [],
            isSelect: props.isSelect
        };
    }

    componentDidMount() {		// for first time
    	this.handleSelect(1) ;
    };

    componentWillReceiveProps = newProps => {
    	let isSame = this.state.list.length === newProps.list.length ;
    	if(isSame) {
    		isSame = this.state.list[0].id === newProps.list[0].id
     	}
        this.setState({
            list: newProps.list,
            pageSize: newProps.pageSize,
            items: newProps.isSelect ? parseInt((newProps.list.length / newProps.pageSize ).toFixed(0)) : parseInt(this.state.items),
            subList: [],
            isSelect: newProps.isSelect
        });

        //console.log(newProps.isSelect);
        if( !isSame  && newProps.isSelect) {
         	//this.handleSelect(1) ;
         	// console.log(newProps.list) ;
         	this.props.toSubList(this.findEn(1, newProps.list)) ;
        }

        console.log("test " + this.state.items) ;
    };

    handleSelect = (eventKey) => {
	    let sub = this.findEn(eventKey, this.state.list) ;
	    this.setState({ subList: sub });
	    this.setState({activePage: eventKey});
	    this.props.toSubList(sub) ;
	};

	findEn = (eventKey, list) => {
		let down = this.state.pageSize*(eventKey-1) ;
    	let up = this.state.pageSize*eventKey ;
    	let result = [] ;
    	list.map( (en,index) => { 
    		if( index >= down && index < up) {
    			result.push(en) ;
    		}
    	}) ;
		return result ;
	};

	render() {
		return (
			<div>
				<Pagination items={this.state.items} 
							bsSize="large" 
                            first
                            last
                            ellipsis
                            boundaryLinks
							activePage={this.state.activePage}
							onSelect={this.handleSelect.bind(this)} />
			</div>
		);
	}

}