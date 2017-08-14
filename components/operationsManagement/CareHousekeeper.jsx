import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Header from 'components/common/Header';
import OperationsManagementMenu from 'components/common/OperationsManagementMenu';
import AddCareHoursekeeper from 'components/operationsManagement/AddCareHousekeeper' ;
import CheckPermission      from 'components/common/CheckPermission';
import {mapUrlToPermission} from 'mapping';
import * as DefinitionActions from 'actions/DefinitionActions' ;
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';

export default class CareHousekeeper extends React.Component {
	static contextTypes = {
		authData: React.PropTypes.object
	}
	constructor(props,context) {
	    super(props,context);
	    this.state = {
	      definition: props.definition, 
	      careGivers : props.definition.careGivers,
	      searchCondition : this.emptySearchCondition(),
	      auth: props.auth,
	      openAddCareHoursekeeper : false,
	      careGiver : this.emptyCareGiver(),
	      selectStr:"",
		  permissions:(context.authData && context.authData.permissionIds) ? context.authData.permissionIds : []
	    }; 
    }

    componentWillReceiveProps = newProps => {
        let nextState = {
        	definition: newProps.definition, 
        	careGivers : newProps.definition.careGivers,
      		searchCondition : this.emptySearchCondition(),
      		auth: newProps.auth,
      		openAddCareHoursekeeper : false,
      		careGiver: this.emptyCareGiver()
        };
        this.setState(nextState);
    };

   	static onEnter(store){
        return (nextState, replace, callback) => {
            DefinitionActions.getCareGivers()(store.dispatch, store.getState).then(() => {
            	DefinitionActions.getMemberByPermissionId("HAPPINESS_CARE_GIVER_MANAGMENT_UPDATE_INFORMATION")(store.dispatch, store.getState).then(() => {
            		DefinitionActions.getBanks()(store.dispatch, store.getState).then(() => callback());
            	}) ;
            });
        }
    };

    changeSelectStr = (e) => {
        this.state.selectStr = e.target.value;
        console.log(e.target.value) ;
        this.setState({selectStr:this.state.selectStr});
    } ;
    findCG = () => {
           let selectStr = this.state.selectStr ;
        if(selectStr != "") {
            console.log("in process") ;
            let careGivers = this.state.definition.careGivers.filter(cm => 
                cm.name.indexOf(selectStr) >= 0
            ) ;
            console.log(careGivers.length);
            this.setState({careGivers:careGivers});
        } else {
            this.setState({careGivers:this.state.definition.careGivers});
        }
        if(this.state.searchCondition.zipId != "") {
        	console.log("in searchCondition") ;
        	let models = this.state.careGivers.filter(cm => cm.serviceAreas.find(sa => sa.zipId == this.state.searchCondition.zipId) != undefined);
			this.setState({careGivers:models});	
			console.log(JSON.stringify(this.state.careGivers));
        }
    };

    toPageModel = (model, definition) => {
        let updateModel = model ;
        updateModel.serviceAreaIds = updateModel.serviceAreaIds.map(m => ({
          "id": m, 
          "name": definition.cities.map(city => {return city.zips.find(zip => zip.id == m)}).filter( c => c != undefined)[0].name, 
          "checked": true
        }));
        return updateModel ;
    };

    emptyCareGiver = () => {
        return {
        	"familyName":"",
			"firstName":"",
			"sex":"",
			"idNo":"",
			"cellphone":"",
			"email":"",
			"tel":"",
			"finance": {
				"bankCode":"",
				"bankAccount":"",
				"bankBranchName":"",
				"bankAccountName":"",
				"ownerIDCardFileKey":"",
				"passbookFileKey":""

			},
			"serviceAreaIds": [],
			"responsibleMemberId":""
        }
    };

    openAddCareHoursekeeper = () => {
      this.setState({isNew: true});
      this.setState({careGiver:this.emptyCareGiver()});
      this.setState({openAddCareHoursekeeper:true});
    } ;
    openUpdateCareGiver = (memberId) => {
    	this.setState({isNew:false}) ;
    
    	this.props.actions.getCareGiver(memberId).then(() => {
        
    		this.setState({careGiver:this.props.definition.careGiver});
    		let updateModel = this.toPageModel(this.state.careGiver, this.state.definition) ;
    		this.setState({careGiver:updateModel});
    		this.setState({openAddCareHoursekeeper:true});
    	});
    };
    onCloseAddCareHoursekeeper = () => {
      this.setState({openAddCareHoursekeeper:false}) ;
      this.findCG();
    };

    emptySearchCondition = () => {
    	return {
    		cityId: "6001001000",
    		zipId: ""
    	}
    };
    toCommitAddCareGiver = (model) => {
    	this.setState({openAddCareHoursekeeper:false}) ;
    
    	model.serviceAreaIds = model.serviceAreaIds.map(sa => sa.id) ;
        this.props.actions.createCareGiver(model);
    };
    toUpdateCareGiver = (memberId, model) => {
    	model.serviceAreaIds = model.serviceAreaIds.map(sa => sa.id) ;
    	this.props.actions.updateCareGiver(memberId, model).then(() => {
    		this.openUpdateCareGiver(memberId) ;
    	});
    };

	changeProfileAddr(field, e){
	    console.log("target >> " + e.target.value) ;
	    //this.state.profile.address[field] = e.target.value;
	    if(field == "cityId") {
	        this.state.searchCondition.cityId = this.props.definition.cities.find(c => c.id === e.target.value).id ;
	    }
	    if(field == "zipId" && e.target.value != "") {
	        this.state.searchCondition.zipId = this.props.definition.cities.find(c => c.id === this.state.searchCondition.cityId).zips.find(z => z.id === e.target.value).id ;
	    } else {
            this.state.searchCondition.zipId = "";
        }
	    this.setState({searchCondition:this.state.searchCondition});
	    //console.log('change >>' + JSON.stringify(this.state.searchCondition));
    };

    uniqueCityName = ( serviceAreas ) => {
    	let uniques = [] ;
    	serviceAreas.map(sa => {
		   	if (uniques.indexOf(sa.cityName) === -1) {
		   		uniques.push(sa.cityName);
		   	}
		});
		return uniques ;
    } ;

    serviceAreasFormat = (cell, row) => {
        return this.uniqueCityName(cell).join(", ")
    };
    idNoFormatter = (cell, careGiver, row) => {
        return <a href="javascript:void(0);" onClick={this.openUpdateCareGiver.bind(this,careGiver.id)}>{cell}</a>
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
								 permission={mapUrlToPermission["HAPPINESS_CARE_GIVER_MANAGMENT"]}
								 showForWhichPermission={"HAPPINESS_CARE_GIVER_MANAGMENT_BASIC_INFORMATION"}
				>
	            	<a href="javascript:void(0);" className="btn-orange float-left" >基本資料</a>
				</CheckPermission>
				<span className="float-left">&nbsp;&nbsp;</span>
				<CheckPermission permissions={this.state.permissions}
								 permission={mapUrlToPermission["HAPPINESS_CARE_GIVER_MANAGMENT"]}
								 showForWhichPermission={"HAPPINESS_CARE_GIVER_MANAGMENT_PRODUCT_LAUNCH_INFORMATION"}
				>
	            	<a href="javascript:void(0);" className="btn-orange float-left" >上架資料</a>
				</CheckPermission>
	           	<span className="float-left">&nbsp;&nbsp;</span>
				<CheckPermission permissions={this.state.permissions}
								 permission={mapUrlToPermission["HAPPINESS_CARE_GIVER_MANAGMENT"]}
								 showForWhichPermission={"HAPPINESS_CARE_GIVER_MANAGMENT_SERVICE_RECORD"}
				>
	            	<a href="javascript:void(0);" className="btn-orange float-left" >服務紀錄</a>
				</CheckPermission>
	            <span className="float-left">&nbsp;&nbsp;</span>
		 		<input className="float-left" value={this.state.selectStr} onChange={this.changeSelectStr}/>
		 		<span className="float-left">&nbsp;&nbsp;</span>
		 		<p className="float-left">服務地區</p>
		 		<span className="float-left">&nbsp;&nbsp;</span>
				<select className="float-left" value={this.state.searchCondition.cityId} 
					onChange={this.changeProfileAddr.bind(this, 'cityId')}>
						<option value=""></option>
							{this.state.definition.cities.map((city,index) => {
								return (
								<option key={`city0_${index}`} value={city.id}>{city.name}</option>
							)
					})}
				</select>
		 		<span className="float-left">&nbsp;&nbsp;</span>
				<select className="float-left" value={this.state.searchCondition.zipId} 
					onChange={this.changeProfileAddr.bind(this, 'zipId')}>
						<option value="">地區</option>
							{this.state.definition.cities.find( c => c.id === this.state.searchCondition.cityId).zips.filter( z => z.id != this.state.searchCondition.cityId).map((zip,index) => {
							return (
								<option key={`zip0_${index}`} value={zip.id}>
								{zip.name.length > 3 ? zip.name.substring(3) : zip.name}
						</option>
						)
					})}
				</select>
		 		<span className="float-left">&nbsp;&nbsp;</span>
		 		<button className="btn-default btn-orange float-left" onClick={this.findCG}>查詢</button>
	           	<span className="float-left">&nbsp;&nbsp;</span>	
		 		<a href="javascript:void(0);" onClick={this.openAddCareHoursekeeper}>
		 		<img src="/resource/add.png" alt="新增"/>
		 		</a>
		 		</div>
		 		<br/><br/><br/><br/><br/><br/><br/>
		 		<div id="portal">
	            <div className="listBox">
	            <div className="box">
                    <BootstrapTable ref='table' data={ this.state.careGivers } tableHeaderClass="tr-blue" options={ options } pagination>
                        <TableHeaderColumn dataField='serviceAreas' isKey={ true } dataSort={ true } dataFormat={this.serviceAreasFormat}>服務縣市</TableHeaderColumn>
                        <TableHeaderColumn dataField='name' dataSort={ true }>姓名</TableHeaderColumn>
                        <TableHeaderColumn dataField='idNo' dataSort={ true } dataFormat={ this.idNoFormatter }>身分證字號</TableHeaderColumn>
                        <TableHeaderColumn dataField='cellphone' dataSort={ true }>行動電話</TableHeaderColumn>
                        <TableHeaderColumn dataField='email' dataSort={ true }>E-mail</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                </div>
                </div>
		 		<AddCareHoursekeeper open={this.state.openAddCareHoursekeeper}
                    onRequestClose={this.onCloseAddCareHoursekeeper}
                    careGiver={this.state.careGiver}
                    isNew={this.state.isNew}
                    definition={this.state.definition}
                    toCommit={this.toCommitAddCareGiver}
                    toUpdate={this.toUpdateCareGiver}/>
		 	</div>
		 );
	}

}