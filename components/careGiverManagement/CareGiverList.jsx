import React, { PropTypes } from 'react';
import PopUpGiverTable from 'components/careGiverManagement/PopUpGiverTable';
import AddCareGiverSelection from 'components/careGiverManagement/AddCareGiverSelection';
import ReturnExcelResultPopUp from 'components/common/ReturnExcelResultPopUp';
import ModifyOneCareGiver from 'components/careGiverManagement/ModifyOneCareGiver';
import AddOneGiverConfirm from 'components/careGiverManagement/AddOneGiverConfirm';
import TerminateCareGiverDailog from 'components/careGiverManagement/TerminateCareGiverDailog'
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
// import DropzoneUploadForm from 'components/common/DropzoneUploadForm';
import UploadPopUp from 'components/common/UploadPopUp';

import * as DefinitionActions from 'actions/DefinitionActions';
import * as InstitutionActions from 'actions/InstitutionActions';
import _ from 'lodash';

export default class CareGiverList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            careGivers : props.institution.givers,
            definition: props.definition,
            openUpdateOneGiver: false,
            openPopUp: false,
            resultOpen: false,
            openAddCareGiverSelection: false,
            openUploadPopUp: false,
            excelDataGrid: props.excelDataGrid,
            importGiversResult: props.institution.importGiversResult,
            openAddOneGiverConfirm: false,
            isNew: true,
            updateGiverId: "",
            giver: {
                familyName: "",	//姓
                firstName: "",	//名
                sex: "",	//性別
                cellphone: "",	//行動電話
                email: "",	//email
                serviceAreaIds: [],	//服務地區 ID 清單
                serviceYears: 0,	//服務年資
                serviceHours: 0,	//服務時數
                skillIds: [],	//證照清單
                abilityIds: []  //專長清單
            },
            openTerminateCareGiverDailog: false,
            terminateGiver: {
                "memberId":"",
                "name":"",
                "serviceYears":0,
                "serviceHours":0,
                "cellphone":"",
                "email":"",
                "serviceAreaIds":[],
                "skillIds":[],
                "abilityIds":[]
            }
        };
    }

    componentWillReceiveProps = newProps => {
        this.setState({
            careGivers : newProps.institution.givers,
            definition: newProps.definition,
            updateGiverId: newProps.updateGiverId
        });

        if(this.props.excelDataGrid !== newProps.excelDataGrid){
            this.setState({
                excelDataGrid:newProps.excelDataGrid,
                openPopUp:!_.isEmpty(newProps.excelDataGrid)
            });
        }
        if(this.state.importGiversResult !== newProps.institution.importGiversResult){
            this.setState({
                importGiversResult:newProps.institution.importGiversResult,
                resultOpen:!_.isEmpty(newProps.institution.importGiversResult)
            });
        }
        this.state.terminateGiver = {
            "memberId":"",
            "name":"",
            "serviceYears":0,
            "serviceHours":0,
            "cellphone":"",
            "email":"",
            "serviceAreaIds":[],
            "skillIds":[],
            "abilityIds":[]
        }
    };

    static onEnter(store){
        return (nextState, replace, callback) => {
            DefinitionActions.getPermissions()(store.dispatch, store.getState).then(() => {
                InstitutionActions.getCareInsitutionGivers(store.getState().auth.careEmployee.companyId)(store.dispatch, store.getState).then(() => callback());
            });
        }
    }

    changeStatus = (e) => {
        let status = e.target.value ;
        this.setState({status:status});
    };

    findGivers = () => {
        let institutionId = this.props.auth.careEmployee.companyId;
        this.props.actions.getCareInsitutionGivers(institutionId);
    };

    closeTerminateGiverPopUp = () => {
        this.setState({
            openTerminateCareGiverDailog: false
        });
    };

    popUpTerminateGiver = (giver) => {
        let serviceAreaIds = this.toPageModel(giver, this.state.definition) ;
        let skillIds = this.toSelectSkillsModel(giver, this.state.definition);
        let abilityIds = this.toSelectAbilitesModel(giver, this.state.definition);
        let terminateGiver = {
            "memberId":giver.id,
            "name":giver.familyName + giver.firstName,
            "serviceYears":giver.serviceYears,
            "serviceHours":giver.serviceHours,
            "cellphone":giver.cellphone,
            "email":giver.email,
            "serviceAreaIds":serviceAreaIds,
            "skillIds":skillIds,
            "abilityIds":abilityIds
        };
        this.setState({
            terminateGiver: terminateGiver,
            openTerminateCareGiverDailog: true

        });
    };

    nameFormat = (cell, giver, row) => {
        return <a href="javascript:void(0);"
                  onClick={this.openUpdateCareGiver.bind(this,giver)}>
            {giver.familyName + giver.firstName}
        </a>
    };

    suspendedFormat = (cell, giver, row) => {
        return (
            giver.isTerminated ? "已停權" :
                <button
                    onClick={
                        this.popUpTerminateGiver.bind(this,giver)}
                >
                    停權
                </button>
        )
    };

    skillsFormatter = (cell, giver, row) => {
        let skills = "";
        giver.skills.map((skill,index) => {
            if(index === 0)
                skills += (skill.name);
            else
                skills += (","+skill.name);
        });
        return (
            skills
        )
    };

    serviceAreasFormatter = (cell, giver, row) => {
        let serviceArea = "";
        giver.serviceAreas.map((area,index) => {
            if(index === 0)
                serviceArea += (area.zipName);
            else
                serviceArea += (","+area.zipName);
        });
        return (
            serviceArea
        )
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

    openAddCareGiverSelection = () => {
        this.setState({
            openAddCareGiverSelection: true
        });
    };

    closeAddCareGiverSelection = () => {
        this.setState({
            openAddCareGiverSelection: false
        });
    };

    openUploadPopUp = () => {
        this.setState({openUploadPopUp: true},this.closeAddCareGiverSelection());
    };

    closeUploadPopUp = () => {
        this.setState({
            openUploadPopUp: false
        });
    };

    toGiversModel = (dataList) => {
        let model = [];
        dataList.map((row, index) => (
            model.push(
                "{\"familyName\":\""    +row[0][1]+"\"," +
                "\"firstName\":\""      +row[1][1]+"\"," +
                "\"sex\":\""            +row[2][1]+"\"," +
                "\"cellphone\":\""      +row[3][1]+"\"," +
                "\"email\":\""          +row[4][1]+"\"," +
                "\"serviceYears\":"   +row[5][1]+"," +
                "\"serviceHours\":"   +row[6][1]+"}"
            )
        ));
        return "{\"givers\":["+model.join() + "]}";
    };

    handleUpsertCareInsitutionGivers = (excelDataGrid) => {
        let institutionId = this.props.auth.careEmployee.companyId;
        excelDataGrid.map((row, index) => {
            if (row[2][1] === "男") {
                row[2][1] = 1;
            }else if (row[2][1] === "女") {
                row[2][1] = 0;
            }else{
                row[2][1] = -1;
            }
        });
        this.props.actions.upsertCareInsitutionGivers(institutionId,JSON.parse(this.toGiversModel(excelDataGrid)));
    };

    openAddOneCareGiverPopUp = () => {
        this.setState({
            openUpdateOneGiver: true,
            isNew: true
        });
    };

    toPageModel = (model, definition) => {
        let updateModel = model ;
        let serviceAreaIds = [];
        updateModel.serviceAreas.map(m => (
            serviceAreaIds.push({
                "id": m.zipId,
                "name": definition.cities.map(city => {return city.zips.find(zip => zip.id == m.zipId)}).filter( c => c != undefined)[0].name,
                "checked": true
                })
            ));
        return serviceAreaIds ;
    };

    toSelectSkillsModel = (model, definition) => {
        let updateModel = model ;
        let skillIds = [];
        updateModel.skills.map(m => (
            skillIds.push({
                "id": m.id,
                "name": definition.skills.map(skill => {return skill.level1Content.map(subSkill => {return subSkill.level2Content.find(sk => sk.idLevel3 == m.id)}).filter(c => c != undefined)
                }).filter(s => s.length > 0)[0][0].nameLevel3,
                "checked": true
            })
        ));
        return skillIds ;
    };

    toSelectAbilitesModel = (model, definition) => {
        let updateModel = model ;
        let abilityIds = [];
        updateModel.abilitys.map(m => (
            abilityIds.push({
                "id": m.id,
                "name": definition.abilities.map(ability => {return ability.level1Content.map(subAbility => {return subAbility.level2Content.find(ab => ab.idLevel3 == m.id)}).filter(c => c != undefined)
                }).filter(a => a.length > 0)[0][0].nameLevel3,
                "checked": true
            })
        ));
        return abilityIds ;
    };

    openUpdateCareGiver = (giver) => {
        let serviceAreaIds = this.toPageModel(giver, this.state.definition) ;
        let skillIds = this.toSelectSkillsModel(giver, this.state.definition);
        let abilityIds = this.toSelectAbilitesModel(giver, this.state.definition);

        let toGiverModel = {
            familyName: giver.familyName,
            firstName: giver.firstName,
            sex: giver.sex,
            cellphone: giver.cellphone,
            email: giver.email,
            serviceAreaIds: serviceAreaIds,
            serviceYears: giver.serviceYears,
            serviceHours: giver.serviceHours,
            skillIds: skillIds,
            abilityIds: abilityIds
        }
        this.state.giver = toGiverModel;
        this.setState({
            openUpdateOneGiver: true,
            isNew: false,
            updateGiverId:giver.id,
            giver: this.state.giver
        });
    };

    closeUpdateCareGiver = () => {
        this.setState({
            openUpdateOneGiver: false,
            isNew: true,
            giver: {
                familyName: "",	//姓
                firstName: "",	//名
                sex: "",	//性別
                cellphone: "",	//行動電話
                email: "",	//email
                serviceAreaIds: [],	//服務地區 ID 清單
                serviceYears: 0,	//服務年資
                serviceHours: 0,	//服務時數
                skillIds: [],	//證照清單
                abilityIds: []  //專長清單
            }
        });
    };

    closeAddOneGiverConfirmPopUp = () => {
        this.setState({
            openAddOneGiverConfirm: false
        });
    };

    toCommitAddGiverConfirm = (giver) => {
        this.setState({
            openAddOneGiverConfirm: true,
            giver:giver
        });
    };

    toCommitAddGiver = () => {
        let institutionId = this.props.auth.careEmployee.companyId;
        let toServiceAreaIds = this.state.giver.serviceAreaIds.map(sa => sa.id);
        let toSkillIds = this.state.giver.skillIds.map(sk => sk.id);
        let toAbilityIds = this.state.giver.abilityIds.map(ab => ab.id);
        this.state.giver.serviceAreaIds = toServiceAreaIds;
        this.state.giver.skillIds = toSkillIds;
        this.state.giver.abilityIds = toAbilityIds;

        if(this.state.isNew)
            this.props.actions.createCareInstitutionGiver(institutionId,JSON.stringify(this.state.giver));
        else
            this.props.actions.updateInstitutionCareGiver(institutionId ,this.state.updateGiverId, JSON.stringify(this.state.giver));
        this.setState({
            openAddOneGiverConfirm: false,
            openUpdateOneGiver: false,
            openAddCareGiverSelection: false,
            giver: {
                familyName: "",	//姓
                firstName: "",	//名
                sex: "",	//性別
                cellphone: "",	//行動電話
                email: "",	//email
                serviceAreaIds: [],	//服務地區 ID 清單
                serviceYears: 0,	//服務年資
                serviceHours: 0,	//服務時數
                skillIds: [],	//證照清單
                abilityIds: []  //專長清單
            }
        });
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
                <div className="listBox">
                    <div className="serviceTTL">照顧管家機構-管家列表</div>
                    <div className="btnBlock">
                        員工資料：
                        <select value={this.state.status}
                                onChange={this.changeStatus.bind(this)}>
                            <option value="ALL">全部</option>
                            <option value="VALID">保障中</option>
                            <option value="INVALID">停權</option>
                        </select>
                        <div>
                            <button className="btn-default btn-orange" onClick={this.findGivers}>查詢</button>
                            &nbsp;&nbsp;
                            <a href="javascript:void(0);" onClick={this.openAddCareGiverSelection}>
                                <img src="/resource/add.png" alt="新增"/>
                            </a>
                        </div>
                    </div>
                    <div className="box">
                        <BootstrapTable ref='table' data={ this.state.careGivers } tableHeaderClass="tr-blue" options={ options } pagination>
                            <TableHeaderColumn dataField='name' isKey={ true } dataFormat={this.nameFormat}>管家姓名</TableHeaderColumn>
                            <TableHeaderColumn dataField='serviceYears' dataSort={ true }>服務年資</TableHeaderColumn>
                            <TableHeaderColumn dataField='serviceHours' dataSort={ true }>服務時數</TableHeaderColumn>
                            <TableHeaderColumn dataField='skills' dataFormat={ this.skillsFormatter }>證照</TableHeaderColumn>
                            <TableHeaderColumn dataField='shiftsHours' dataSort={ true }>已經排班時數</TableHeaderColumn>
                            <TableHeaderColumn dataField='serviceAreas' dataFormat={ this.serviceAreasFormatter }>服務地區</TableHeaderColumn>
                            <TableHeaderColumn dataField='cellphone'>行動電話</TableHeaderColumn>
                            <TableHeaderColumn dataField='leaveDate' dataFormat={this.suspendedFormat}>狀態</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
                <PopUpGiverTable openPopUp={this.state.openPopUp}
                                  excelDataGrid={this.state.excelDataGrid}
                                  requestClose={this.closePopUp}
                                  sendConfirm = {this.handleUpsertCareInsitutionGivers}
                />

                <ReturnExcelResultPopUp openResult={this.state.resultOpen}
                                        importGiversResult={this.state.importGiversResult}
                                        closeResult={this.closeResultPopUp}
                />
                <AddCareGiverSelection  openAddCareGiverSelection={this.state.openAddCareGiverSelection}
                                        closeAddCareGiverSelection={this.closeAddCareGiverSelection}
                                        popUpUpload={this.openUploadPopUp}
                                        popUpAddOneCareGiver={this.openAddOneCareGiverPopUp}
                />
                {/*<DropzoneUploadForm openUploadPopUp={this.state.openUploadPopUp}*/}
                                    {/*closeUploadPopUp={this.closeUploadPopUp}*/}
                                    {/*actions={this.props.actions}/>*/}
                <UploadPopUp openUploadPopUp={this.state.openUploadPopUp}
                                    closeUploadPopUp={this.closeUploadPopUp}
                                    actions={this.props.actions}/>
                <ModifyOneCareGiver openUpdateOneGiver={this.state.openUpdateOneGiver}
                                onRequestClose={this.closeUpdateCareGiver}
                                definition={this.state.definition}
                                isNew={this.state.isNew}
                                giver={this.state.giver}
                                updateGiverId={this.state.updateGiverId}
                                toCommit={this.toCommitAddGiverConfirm}/>
                <AddOneGiverConfirm openAddOneGiverConfirm={this.state.openAddOneGiverConfirm}
                                onRequestClose={this.closeAddOneGiverConfirmPopUp}
                                giver={this.state.giver}
                                toCommit={this.toCommitAddGiver}/>
                <TerminateCareGiverDailog openTerminateCareGiverDailog={this.state.openTerminateCareGiverDailog}
                                       onRequestClose={this.closeTerminateGiverPopUp}
                                       terminateGiver={this.state.terminateGiver}
                                       actions={this.props.actions}
                />
            </div>
        );
    }
}
