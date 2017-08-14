import React, { PropTypes } from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import Header from 'components/common/Header';
import PopUpMemberTable from 'components/EmployeeManagement/PopUpMemberTable';
import AddEnterpriseEmployee from 'components/EmployeeManagement/AddEnterpriseEmployee';
import UploadPopUp from 'components/common/UploadPopUp';
import ReturnExcelResultPopUp from 'components/common/ReturnExcelResultPopUp';
import AddOneEmployee from 'components/EmployeeManagement/AddOneEmployee';
import AddOneEmployeeConfirm from 'components/EmployeeManagement/AddOneEmployeeConfirm';
import SelectEmployeesForm from 'components/EmployeeManagement/SelectEmployeesForm';
import TerminateMemberDailog from 'components/EmployeeManagement/TerminateMemberDailog';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';

import * as DefinitionActions from 'actions/DefinitionActions';
import * as EnterpriseActions from 'actions/EnterpriseActions';
import moment from 'moment';
import _ from 'lodash';

export default class EmployeeList extends React.Component {
    static contextTypes = {
        authData: React.PropTypes.object
    }
    constructor(props,context) {
        super(props,context);
        this.state = {
            employees : props.enterprise.employees,
            input:[],
            openPopUp: false,
            resultOpen: false,
            openAddEmployeePopUp: false,
            openUploadPopUp: false,
            authData: context.authData,
            excelDataGrid: props.excelDataGrid,
            importFileResult: props.enterprise.importFileResult,
            openAddOneEmployee: false,
            openAddOneEmployeeConfirm: false,
            isNew: true,
            employee: {
                "id":"",
                "familyName":"",
                "firstName":"",
                "sex":"",
                "companyTel":"",
                "companyTelExt":"",
                "cellphone":"",
                "email":"",
                "onBoardDate": moment().format()
            },
            openTerminateMemberDailog: false,
            terminateEmployee: {
                "employeeId":"",
                "id":"",
                "name":"",
                "sex":"",
                "companyTel":"",
                "companyTelExt":"",
                "email":"",
                "onBoardDate":"",
                "leaveDate":-1
            }
        };
    }

    componentWillReceiveProps = newProps => {
        this.setState({
            employees : newProps.enterprise.employees,
            input:[]
        });

        if(this.props.excelDataGrid !== newProps.excelDataGrid){
            this.setState({
                excelDataGrid:newProps.excelDataGrid,
                openPopUp:!_.isEmpty(newProps.excelDataGrid)
            });
        }
        if(this.state.importFileResult !== newProps.enterprise.importFileResult){
            this.setState({
                importFileResult:newProps.enterprise.importFileResult,
                resultOpen:!_.isEmpty(newProps.enterprise.importFileResult)
            });
        }
        this.state.terminateEmployee = {
            "employeeId":"",
            "id":"",
            "name":"",
            "sex":"",
            "companyTel":"",
            "companyTelExt":"",
            "email":"",
            "onBoardDate":"",
            "leaveDate":-1
        }
    };
    static onEnter(store){
        return (nextState, replace, callback) => {
            DefinitionActions.getPermissions()(store.dispatch, store.getState).then(() => {
                EnterpriseActions.getEnterpriseEmployees(store.getState().auth.employee.companyId,"{\"status\":\"ALL\"}")(store.dispatch, store.getState).then(() => callback());
            });
        }
    }

    closeTerminateMemberPopUp = () => {
        this.setState({
            openTerminateMemberDailog: false
        });
    };

    popUpTerminateMember = (employeeId,name,sex,companyTel,companyTelExt,email,onBoardDate,memberId) => {
        let terminateEmployee = {
            "id":memberId,
            "employeeId":employeeId,
            "name":name,
            "sex":sex,
            "companyTel":companyTel,
            "companyTelExt":companyTelExt,
            "email":email,
            "onBoardDate":onBoardDate,
            "leaveDate":-1
        };
        this.setState({
            terminateEmployee: terminateEmployee,
            openTerminateMemberDailog: true

        });
    };

    closePopUp = () => {
        this.setState({
            openPopUp: false
        });
    };

    closeResultPopUp = () => {
        this.setState({
            resultOpen: false
        });
    };

    openAddEmployeePopUp = () => {
        this.setState({
            openAddEmployeePopUp: true
        });
    };

    closeAddEmployeePopUp = () => {
        this.setState({
            openAddEmployeePopUp: false
        });
    };

    openUploadPopUp = () => {
        //下面的寫法會造成state的值還未被設定就render出去了
        this.setState({openUploadPopUp: true},this.closeAddEmployeePopUp());
        //this.setState({openUploadPopUp: true});
        // this.closeAddEmployeePopUp();
    };

    closeUploadPopUp = () => {
        this.setState({
            openUploadPopUp: false
        });
    };

    toEmployeesModel = (dataList) => {
        let model = [];
        dataList.map((row, index) => (
            model.push(
                "{\"id\":\""          +row[0][1]+"\"," +
                "\"familyName\":\""   +row[1][1]+"\"," +
                "\"firstName\":\""    +row[2][1]+"\"," +
                "\"sex\":\""          +row[3][1]+"\"," +
                "\"companyTel\":\""   +row[4][1]+"\"," +
                "\"companyTelExt\":\""+row[5][1]+"\"," +
                "\"cellphone\":\""    +row[6][1]+"\"," +
                "\"email\":\""        +row[7][1]+"\"," +
                "\"onBoardDate\":"    +moment(row[8][1], "YYYY-MM-DD").valueOf()+"}"
            )
        ));
        return "{\"enterpriseEmployees\":["+model.join() + "]}";
    };

    handleUpsertEnterpriseEmployees = (excelDataGrid) => {
        let enterpriseId = this.state.authData.employee.companyId;
        excelDataGrid.map((row, index) => {
            if (row[3][1] === "男") {
                row[3][1] = 1;
            }else if (row[3][1] === "女") {
                row[3][1] = 0;
            }else{
                row[3][1] = -1;
            }
        });
        this.props.actions.upsertEnterpriseEmployees(enterpriseId,JSON.parse(this.toEmployeesModel(excelDataGrid)));
    };

    openAddOneEmployeePopUp = () => {
        this.setState({openAddOneEmployee: true});
    };

    closeAddOneEmployeePopUp = () => {
        this.setState({
            openAddOneEmployee: false
        });
    };

    closeAddOneEmployeeConfirmPopUp = () => {
        this.setState({
            openAddOneEmployeeConfirm: false
        });
    };

    toCommitAddEmployeeConfirm = (employee) => {
        this.setState({
            openAddOneEmployeeConfirm: true,
            employee:employee
        });
    };

    toCommitAddEmployee = () => {
        let enterpriseId = this.state.authData.employee.companyId;
        let preOnBoardDate = this.state.employee.onBoardDate;
        let onBoardDate = (preOnBoardDate ? moment(preOnBoardDate, "YYYY-MM-DD").valueOf() : -1);
        this.state.employee.onBoardDate = onBoardDate;
        this.props.actions.createEnterpriseEmployee(enterpriseId,JSON.stringify(this.state.employee));
        this.setState({
            openAddOneEmployeeConfirm: false,
            openAddOneEmployee: false,
            employee:{
                "id":"",
                "familyName":"",
                "firstName":"",
                "sex":"",
                "companyTel":"",
                "companyTelExt":"",
                "cellphone":"",
                "email":"",
                "onBoardDate": moment().format()
            }
        });
    };

    sexFormatter = (cell, row) => {
        return `${cell == '0' ? "女":"男"}`;
    };
    onBoardDateFormat = (cell, row) => {
        return `${moment(moment(cell).toDate()).format('YYYY-MM-DD')}`;
    };
    leaveDateFormat = (cell, row) => {
        return `${cell > 0 ? moment(moment(cell).toDate()).format('YYYY-MM-DD') : ""}`
    };
    suspendedFormat= (cell, employee, row) => {
        return (
            cell > 0 ? "" : 
           <button 
              onClick={
              this.popUpTerminateMember.bind(this,employee.employeeId,employee.name,employee.sex,employee.companyTel,employee.companyTelExt,employee.email,employee.onBoardDate,employee.id)}
           >
           停權
           </button>
        )
    };
    employeeIdFormat = (cell, row) => {
        return <a href="javascript:void(0);">{cell}</a>
    };
    render() {
        const options = {
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
            <div id="portal">
                <Header/>
                <div className="listBox">
                    <div className="serviceTTL">企業員工列表</div>
                    <div className="btnBlock">
                        <SelectEmployeesForm
                                auth={this.props.auth}
                                openAddEmployeePopUp={this.openAddEmployeePopUp}
                                actions={this.props.actions}
                        />
                    </div>
                    <div className="box">
                        <BootstrapTable ref='table' data={ this.state.employees } tableHeaderClass="tr-blue" options={ options } pagination>
                            <TableHeaderColumn dataField='employeeId' isKey={ true } dataSort={ true } dataFormat={this.employeeIdFormat}>員編</TableHeaderColumn>
                            <TableHeaderColumn dataField='name' dataSort={ true }>姓名</TableHeaderColumn>
                            <TableHeaderColumn dataField='sex' dataSort={ true } dataFormat={ this.sexFormatter }>性別</TableHeaderColumn>
                            <TableHeaderColumn dataField='companyTel' dataSort={ true }>公司電話</TableHeaderColumn>
                            <TableHeaderColumn dataField='companyTelExt' dataSort={ true }>分機</TableHeaderColumn>
                            <TableHeaderColumn dataField='email' dataSort={ true }>Mail</TableHeaderColumn>
                            <TableHeaderColumn dataField='onBoardDate' dataSort={ true } dataFormat={this.onBoardDateFormat}>到職日</TableHeaderColumn>
                            <TableHeaderColumn dataField='leaveDate' dataSort={ true } dataFormat={this.leaveDateFormat}>離職日</TableHeaderColumn>
                            <TableHeaderColumn dataField='leaveDate' dataFormat={this.suspendedFormat}>停權</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
                <PopUpMemberTable openPopUp={this.state.openPopUp}
                                  excelDataGrid={this.state.excelDataGrid}
                                  requestClose={this.closePopUp}
                                  sendConfirm = {this.handleUpsertEnterpriseEmployees}
                />
                <ReturnExcelResultPopUp openResult={this.state.resultOpen}
                                        importFileResult={this.state.importFileResult}
                                        closeResult={this.closeResultPopUp}
                />
                <AddEnterpriseEmployee  openAddEmployeePopUp={this.state.openAddEmployeePopUp}
                                        closeAddEmployeePopUp={this.closeAddEmployeePopUp}
                                        popUpUpload={this.openUploadPopUp}
                                        popUpAddOneEmployee={this.openAddOneEmployeePopUp}
                />
                <UploadPopUp openUploadPopUp={this.state.openUploadPopUp}
                             closeUploadPopUp={this.closeUploadPopUp}
                             actions={this.props.actions}
                />
                <AddOneEmployee openAddOneEmployee={this.state.openAddOneEmployee}
                                onRequestClose={this.closeAddOneEmployeePopUp}
                                isNew={this.state.isNew}
                                employee={this.state.employee}
                                toCommit={this.toCommitAddEmployeeConfirm}/>
                <AddOneEmployeeConfirm openAddOneEmployeeConfirm={this.state.openAddOneEmployeeConfirm}
                                onRequestClose={this.closeAddOneEmployeeConfirmPopUp}
                                employee={this.state.employee}
                                toCommit={this.toCommitAddEmployee}/>
                <TerminateMemberDailog openTerminateMemberDailog={this.state.openTerminateMemberDailog}
                                       onRequestClose={this.closeTerminateMemberPopUp}
                                       employee={this.state.terminateEmployee}
                                       actions={this.props.actions}
                                       toCommit={this.terminateMember}/>
            </div>
        );
    }
}
