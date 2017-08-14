import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Header from 'components/common/Header';
import OperationsManagementMenu from 'components/common/OperationsManagementMenu';
import AddEnterpriseCustomer from 'components/operationsManagement/AddEnterpriseCustomer' ;
import UpdateEnterpriseCustomer from 'components/operationsManagement/UpdateEnterpriseCustomer' ;
import * as EnterpriseActions from 'actions/EnterpriseActions';
import * as DefinitionActions from 'actions/DefinitionActions' ;
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';

export default class CorporateClient extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            openAddEnterpriseCustomer : false,
            openUpdateEnterpriseCustomer: false,
            enterprise: this.emptyEnterprise(),
            enterprises: props.enterprise.enterprises,
            selectStr : ""
        }
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            openAddEnterpriseCustomer : false,
            openUpdateEnterpriseCustomer: false,
            enterprise: this.emptyEnterprise(),
            enterprises: newProps.enterprise.enterprises
        };
        this.setState(nextState);
    };

    static onEnter(store){
        return (nextState, replace, callback) => {
            EnterpriseActions.getEnterprises()(store.dispatch, store.getState).then(() => {
            	DefinitionActions.getCareManagers()(store.dispatch, store.getState).then(() => {
                    DefinitionActions.getCustomerDevelopers()(store.dispatch, store.getState).then(()=> callback())
                });
            });     
        }
    };

    emptyEnterprise = () => {
    	return {
    		"id":"","name":"","abbreviation":"","tel":"","fax":"",	
			"owner":{
				"sex":"",
			    "familyName":"",
			    "firstName":""
			},
            "masterContact":{
                "employeeId":"",
                "sex":"",
                "familyName":"",
                "firstName":"",
                "cellphone":"",
                "email":"",
                "companyTel":"",
                "companyTelExt":""
            },
			"businessContacts":[],
			"financialContacts":[],
			"transactionType":"",	
			"reconciliationDate":"",	
			"invoiceDate":"",
			"invoiceType":"",
			"invoiceTitle":"",
			"invoiceAddress":{
				"zipCode":"",
            	"cityId":"6001001000",
            	"zipId":"",
            	"address":""
			},
            "careManager" : {
                "id":"",
                "name":""
            },
            "customerDeveloper": {
                "id":"",
                "name":""
            },
			"responsibleMemberId":"",
            "customerDeveloperId":""
    	}
    };

    changeSelectStr = (e) => {
        this.state.selectStr = e.target.value;
        this.setState({selectStr:this.state.selectStr});
    } ;

    openAddEnterpriseCustomer = () => {
    	this.setState({enterprise:this.emptyEnterprise()});
    	this.setState({openAddEnterpriseCustomer:true});
    } ;
    openUpdateEnterpriseCustomer = (enterpriseId) => {
    	this.props.actions.getEnterprise(enterpriseId).then(() => {
    		this.props.actions.getEnterpriseEmployees(enterpriseId, "{\"status\":\"VALID\",\"emailIsVerified\":true}").then(() => {
    			this.setState({enterprise:this.props.enterprise.enterprise});
    			this.setState({openUpdateEnterpriseCustomer:true});
    		});		
    	});
    };
    onCloseAddEnterpriseCustomer = () => {
    	this.setState({openAddEnterpriseCustomer:false}) ;
        this.props.actions.getEnterprises(this.state.selectStr);
    };
    onCloseUpdateEnterpriseCustomer = () => {
        this.setState({openUpdateEnterpriseCustomer:false}) ;
        this.props.actions.getEnterprises(this.state.selectStr);
    };
    toCommitAddEnterpriseCustomer =(model) => {
    	this.setState({openAddEnterpriseCustomer:false}) ;
    	model.reconciliationDate = parseInt(model.reconciliationDate);
		model.invoiceDate = parseInt(model.invoiceDate);
    	this.props.actions.createEnterprise(model);
    };
    updateEnterprise = (enterpriseId, model) => {
    	this.props.actions.updateEnterprise(enterpriseId, model).then(() => {
    		this.openUpdateEnterpriseCustomer(enterpriseId) ;
    	});
    };

	handleSearch = () =>  {
        this.props.actions.getEnterprises(this.state.selectStr);
	} ;

    idFormatter = (cell, row) => {
        return <a href="javascript:void(0);" onClick={this.openUpdateEnterpriseCustomer.bind(this,cell)}>{cell}</a>
    };

	render() {
        const options = {
          noDataText: '查無資料',
          //page: 2,  // which page you want to show as default
          // sizePerPageList: [ {
          //   text: '2', value: 2
          // }, {
          //   text: '3', value: 3
          // }, {
          //   text: 'All', value: this.state.employees.length
          // } ], // you can change the dropdown list for size per page
          sizePerPage: 2,  // which size per page you want to locate as default
          pageStartIndex: 1, // where to start counting the pages
          paginationSize: 3,  // the pagination bar size.
          //prePage: 'Prev', // Previous page button text
          //nextPage: 'Next', // Next page button text
          //firstPage: 'First', // First page button text
          //lastPage: 'Last', // Last page button text
          //paginationShowsTotal: this.renderShowsTotal  // Accept bool or function
          hideSizePerPage: true //  > // You can hide the dropdown for sizePerPage
        };
		return (
		 	<div>
		 		<div style={{float:'right',width:'80%'}}>
		 			<input value={this.state.selectStr} onChange={this.changeSelectStr.bind(this)} />
		 			&nbsp;&nbsp;
		 			<button className="btn-default btn-orange" onClick={this.handleSearch}>查詢</button>
	            	&nbsp;&nbsp;	
		 			<a href="javascript:void(0);" onClick={this.openAddEnterpriseCustomer}>
		 				<img src="/resource/add.png" alt="新增"/>
		 			</a>
		 		</div>
		 		<br/><br/><br/><br/><br/><br/><br/>
		 		<div id="portal">
		            <div className="listBox">
			            <div className="box">
                            <BootstrapTable ref='table' data={ this.state.enterprises } tableHeaderClass="tr-blue" options={ options } pagination>
                                <TableHeaderColumn dataField='abbreviation' isKey={ true } dataSort={ true }>客戶簡稱</TableHeaderColumn>
                                <TableHeaderColumn dataField='id' dataSort={ true } dataFormat={ this.idFormatter }>統編1</TableHeaderColumn>
                                <TableHeaderColumn dataField='masterContactName' dataSort={ true }>主要聯繫人</TableHeaderColumn>
                                <TableHeaderColumn dataField='masterContactCompanyTel' dataSort={ true }>電話</TableHeaderColumn>
                                <TableHeaderColumn dataField='masterContactCompanyTelExt' dataSort={ true }>分機</TableHeaderColumn>
                            </BootstrapTable>
		                </div>
	                </div>
                </div>
		 		<AddEnterpriseCustomer open={this.state.openAddEnterpriseCustomer}
                    onRequestClose={this.onCloseAddEnterpriseCustomer}
                    enterprise={this.state.enterprise}
                    definition={this.props.definition}
                    toCommit={this.toCommitAddEnterpriseCustomer}/>
                <UpdateEnterpriseCustomer open={this.state.openUpdateEnterpriseCustomer}
                    onRequestClose={this.onCloseUpdateEnterpriseCustomer}
                    enterprise={this.state.enterprise}
                    definition={this.props.definition}
                    employees={this.props.enterprise.employees.length > 0 ? this.props.enterprise.employees : []}
                    updateEnterprise={this.updateEnterprise}/>
		 	</div>
		 );
	}

}