import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Header from 'components/common/Header';
import OperationsManagementMenu from 'components/common/OperationsManagementMenu';
import AddCareInstitution from 'components/operationsManagement/AddCareInstitution' ;
import UpdateCareInstitution from 'components/operationsManagement/UpdateCareInstitution' ;
import * as InstitutionActions from 'actions/InstitutionActions';
import * as DefinitionActions from 'actions/DefinitionActions' ;
import CheckPermission      from 'components/common/CheckPermission';
import {mapUrlToPermission} from 'mapping';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';

export default class CareInstitution extends React.Component {
    static contextTypes = {
        authData: React.PropTypes.object
    }
	constructor(props,context) {
        super(props,context);
        this.state = {
            openAddCareInstitution : false,
            openUpdateCareInstitution: false,
            institutions: props.institution.institutions,
            institution: this.emptyInstitution(),
            selectStr : "",
            permissions:(context.authData && context.authData.permissionIds) ? context.authData.permissionIds : []
        }
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            openAddCareInstitution : false,
            openUpdateCareInstitution: false,
            institutions: newProps.institution.institutions,
            institution: this.emptyInstitution()
        };
        this.setState(nextState);
    };

    static onEnter(store){
        return (nextState, replace, callback) => {
            InstitutionActions.getCareInstitutions()(store.dispatch, store.getState).then(() => {
                DefinitionActions.getMemberByPermissionId("HAPPINESS_CARE_INSTITUTION_MANAGMENT_UPDATE_INFORMATION")(store.dispatch, store.getState).then(() => {
                    DefinitionActions.getBanks()(store.dispatch, store.getState).then(() => callback());
                });
            });
        }
    };

    // for search
    changeSelectStr = (e) => {
        this.state.selectStr = e.target.value;
        this.setState({selectStr:this.state.selectStr});
    } ;

    emptyInstitution = () => {
        return {
            "id":"","name":"","abbreviation":"","tel":"","fax":"",  
            "owner":{
                "sex":"",
                "familyName":"",
                "firstName":""
            },
            "businessContacts":[],
            "masterContact":{
                "sex":"",
                "familyName":"",
                "firstName":"",
                "cellphone":"",
                "email":"",
                "companyTel":"",
                "companyTelExt":""
            },
            "finance": {
                "bankCode":"",
                "bankName":"",
                "bankAccount":"",
                "bankBranchName":"",
                "bankAccountName":"",
                "ownerIDCardFileKey":"",
                "passbookFileKey":""
            },
            "responsibleMemberId":""
        }
    };

    openAddCareInstitution = () => {
        this.setState({institution:this.emptyInstitution()});
        this.setState({openAddCareInstitution:true});
    } ;
    openUpdateCareInstitution = (institutionId) => {
       
        this.props.actions.getCareInstitution(institutionId).then(() => {
            this.props.actions.getInstitutionEmployees(institutionId).then(() => {
                this.setState({institution:this.props.institution.institution});
                this.setState({openUpdateCareInstitution:true});
            });          
        });
    };
    onCloseAddCareInstitution = () => {
      this.setState({openAddCareInstitution:false}) ;
      this.props.actions.getCareInstitutions(this.state.selectStr) ;
    };
    onCloseUpdateCareInstitution = () => {
      this.setState({openUpdateCareInstitution:false}) ;
      this.props.actions.getCareInstitutions(this.state.selectStr) ;
    };
    toCommitAddInstitution = (model) => {
        this.setState({openAddCareInstitution:false}) ;
        this.props.actions.createInstitution(model);
    };
    updateInstitution = (institutionId, model) => {
        this.props.actions.updateInstitution(institutionId, model).then(() => {
             this.openUpdateCareInstitution(institutionId) ;
        });
    };

	handleSearch = () => {
		// console.log("enter the hadle search!");
        this.props.actions.getCareInstitutions(this.state.selectStr) ;
       	};

    idFormatter = (cell, row) => {
        return <a href="javascript:void(0);" onClick={this.openUpdateCareInstitution.bind(this,cell)}>{cell}</a>
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
	            <span className="float-left">&nbsp;&nbsp;</span>
                <CheckPermission permissions={this.state.permissions}
                                 permission={mapUrlToPermission["HAPPINESS_CARE_INSTITUTION_MANAGMENT"]}
                                 showForWhichPermission={"HAPPINESS_CARE_INSTITUTION_MANAGMENT_BASIC_INFORMATION"}
                >
                    <a href="javascript:void(0);" className="btn-orange float-left" >基本資料</a>
                </CheckPermission>
	            <span className="float-left">&nbsp;&nbsp;</span>
                <CheckPermission permissions={this.state.permissions}
                                 permission={mapUrlToPermission["HAPPINESS_CARE_INSTITUTION_MANAGMENT"]}
                                 showForWhichPermission={"HAPPINESS_CARE_INSTITUTION_MANAGMENT_PRODUCT_LAUNCH_INFORMATION"}
                >
	                <a href="javascript:void(0);" className="btn-orange float-left" >上架資料</a>
                </CheckPermission>
	           	<span className="float-left">&nbsp;&nbsp;</span>
                <CheckPermission permissions={this.state.permissions}
                                 permission={mapUrlToPermission["HAPPINESS_CARE_INSTITUTION_MANAGMENT"]}
                                 showForWhichPermission={"HAPPINESS_CARE_INSTITUTION_MANAGMENT_SERVICE_RECORD"}
                >
	                <a href="javascript:void(0);" className="btn-orange float-left" >服務紀錄</a>
                </CheckPermission>
	            <span className="float-left">&nbsp;&nbsp;</span>

		 			<input value={this.state.selectStr} onChange={this.changeSelectStr.bind(this)}/>
		 			&nbsp;&nbsp;
		 			<button className="btn-default btn-orange" onClick={this.handleSearch}>查詢</button>
	            	&nbsp;&nbsp;	
		 			<a href="javascript:void(0);" onClick={this.openAddCareInstitution}>
		 				<img src="/resource/add.png" alt="新增"/>
		 			</a>
		 		</div>
		 		<br/><br/><br/><br/><br/><br/><br/>
		 		<div id="portal">
	            <div className="listBox">
	            <div className="box">
                    <BootstrapTable ref='table' data={ this.state.institutions } tableHeaderClass="tr-blue" options={ options } pagination>
                        <TableHeaderColumn dataField='abbreviation' isKey={ true } dataSort={ true }>機構簡稱</TableHeaderColumn>
                        <TableHeaderColumn dataField='id' dataSort={ true } dataFormat={ this.idFormatter }>統編</TableHeaderColumn>
                        <TableHeaderColumn dataField='masterContactName' dataSort={ true }>主要聯繫人</TableHeaderColumn>
                        <TableHeaderColumn dataField='masterContactCompanyTel' dataSort={ true }>電話</TableHeaderColumn>
                        <TableHeaderColumn dataField='masterContactCompanyTelExt' dataSort={ true }>分機</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                </div>
                </div>
		 		<AddCareInstitution open={this.state.openAddCareInstitution}
                    onRequestClose={this.onCloseAddCareInstitution}
                    institution={this.state.institution}
                    definition={this.props.definition}
                    toCommit={this.toCommitAddInstitution}
                    auth={this.props.auth}/>
                <UpdateCareInstitution open={this.state.openUpdateCareInstitution}
                    onRequestClose={this.onCloseUpdateCareInstitution}
                    institution={this.state.institution}
                    definition={this.props.definition}
                    employees={this.props.institution.employees.length > 0 ? this.props.institution.employees : []}
                    updateInstitution={this.updateInstitution}/>
		 	</div>
		 );
	}

}