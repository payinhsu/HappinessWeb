import React, { PropTypes } from 'react';
import * as DefinitionActions from 'actions/DefinitionActions';
import * as PageActions from 'actions/PageActions';
import api from 'api/HappinessAPI';
import {browserHistory} from 'react-router';
import Header from 'components/common/Header';
import moment from 'moment';
import {Link} from 'react-router';
import Insurant               from 'components/employeeApply/Insurant' ;
import MainInsurantView       from 'components/employeeApply/MainInsurantView';
import SelfInsurantView       from 'components/employeeApply/SelfInsurantView' ;
import EmployeeInfo           from 'components/employeeApply/EmployeeInfo' ;
import CommitStopPInsure      from 'components/employeeApply/CommitStopPInsureOk' ;
import DocumentUpload         from 'components/employeeApply/DocumentUpload' ;
import ChangePInsure          from 'components/employeeApply/ChangePInsure' ;
import CommitChangePInsureOk  from 'components/employeeApply/CommitChangePInsureOk';
import ChangeRecords          from 'components/employeeApply/ChangeRecords' ;
import ServiceStatute         from 'components/common/statute/ServiceStatute' ;

export default class EmployeeApplyService extends React.Component {

    constructor(props) {
        super(props);
        console.log(props) ;
        this.state = {
            employee: props.auth.employee,
            profile: props.auth.profile,
            insurants: props.page.insurants,
            insurant: this.employInsurantModel(), 
            insurantsChangeLogs: props.page.insurantsChangeLogs,
            openInsurant: false, 
            isMain: undefined,
            openCommitStopPInsure: false, 
            openDocumentUpload: false,
            openChangePInsure: false,
            openChangePInsureOk: false,
            openChangeRecords: false,
            openServiceStatute:false, 
            isNew: false,
            year:2016
        };
        console.log(JSON.stringify(this.state.insurantsChangeLogs)) ;
    }

    componentWillReceiveProps = newProps => {
        console.log(newProps) ;
        this.setState({
            employee: newProps.auth.employee,
            profile: newProps.auth.profile,
            insurants: newProps.page.insurants,
            insurant: this.employInsurantModel(),
            insurantsChangeLogs: newProps.page.insurantsChangeLogs, 
            openInsurant: false, 
            isMain: undefined,
            openCommitStopPInsure: false,
            openDocumentUpload: false,
            openChangePInsure: false,
            openChangePInsureOk:false,
            openChangeRecords:false,
            openServiceStatute:false,
            isNew: false
        });
        console.log(JSON.stringify(this.state.insurantsChangeLogs)) ;
    };

    static onEnter(store){
        return (nextState, replace, callback) => {
            DefinitionActions.getDefinitions()(store.dispatch, store.getState).then(() => {
                PageActions.getInsurants(store.getState().auth.id)(store.dispatch, store.getState).then(() => {
                    PageActions.getInsurantsChangeLogs(store.getState().auth.id,2016)(store.dispatch, store.getState).then(() => callback());
                });
            });
        }
    }

    // === process for update employee information ===
    updateEmployeeInfo = (memberId, model) => {
        this.props.actions.updateEmployeeInfo(memberId, model).then(() => {
            this.props.actions.updateAuth() ;
        }); 
    };
    // === process for update employee information end ===

    // === process for insurants change logs ===
    toChangeRecords = () => {
        this.props.actions.getInsurantsChangeLogs(this.props.auth.id, this.state.year).then(() => {
            this.setState({openChangeRecords: true});
        }) ;
    };
    onCloseChangeRecords = () => {
        this.setState({openChangeRecords: false});
    } ;
    onChangeYear = (year) => {
        this.state.year = year ;
        this.setState({year:this.state.year}) ;
        this.props.actions.getInsurantsChangeLogs(this.props.auth.id,year).then(()=> {
            this.setState({openChangeRecords: true});
        });
    } ;
    // === process for insurants change logs end ===

    // === process for terminate insurant ===
    terminateInsurant = (memberId, model) => {
        this.props.actions.terminateInsurant(memberId, model).then(() => {
            //console.log("in terminate") ;
            this.toCommitStopPInsureOk() ;
            //console.log(this.state.openCommitStopPInsure) ;
        }) ;
    };
    toCommitStopPInsureOk = () => {
        this.setState({openCommitStopPInsure:true}) ;
    };
    onCloseCommitStop = () => {
        this.setState({openCommitStopPInsure:false}) ;
    };
    // === process for terminate insurant end === 
    
    // === process for change insurant ===
    toDocumentUpload = () => {
        this.setState({openDocumentUpload:true});
    };
    onCloseDocumentUpload = () => {
        this.setState({openDocumentUpload:false});
    };
    toChangePInsure = (replaceMain) => {
        this.setState({openDocumentUpload:false});
        this.state.insurant.replaceMain.reason = replaceMain.reason ;
        this.state.insurant.replaceMain.proofFileId = replaceMain.proofFileId ;
        this.setState({insurant: this.state.insurant}) ;
        this.setState({openChangePInsure:true});
    };
    onCloseChangePInsure = () => {
        this.setState({openChangePInsure:false});
    };
    toNewMainInsure = () => {
        this.setState({openChangePInsure:false});
        this.toChangeInsurant(this.state.insurant.replaceMain);
    };
    toChangeInsurant = (replaceMain) => {
        this.state.insurant = this.employInsurantModel() ;
        this.state.insurant.replaceMain.reason = replaceMain.reason ;
        this.state.insurant.replaceMain.proofFileId = replaceMain.proofFileId ;
        this.state.isMain = true ;
        this.state.insurant.isMain = true ;
        this.state.isNew = true ;
        this.setState({insurant: this.state.insurant});
        this.setState({isMain: this.state.isMain}) ;
        this.setState({openInsurant:true});
    };
    toCommitChangePInsure = (insId) => {
        this.setState({openChangePInsure:false});
        this.props.actions.changeMainInsurant(this.props.auth.id, {insurantId:insId, replaceMain:this.state.insurant.replaceMain}).then(() => {
            //console.log("in terminate") ;
            this.setState({openChangePInsureOk:true});
            //console.log(this.state.openCommitStopPInsure) ;
        }) ;
    };
    onCloseChangePInsureOk = () => {
        this.setState({openChangePInsureOk:false}) ;
    };
    // === process for change insurant end === 

    // === process for dialog new company insurant ===
    toInsurant = () => {
        this.state.insurant = this.employInsurantModel() ;
        this.state.isMain = true ;
        this.state.insurant.isMain = true ;
        this.state.isNew = true ;
        this.setState({isMain: this.state.isMain}) ;
        this.setState({openInsurant:true});
        // console.log(this.state.openInsurant) ;
    } ;
    toUpdateMainInsurant = (model) => {
        this.state.insurant = model ;
        this.state.isNew = false ;
        this.setState({insurant: this.state.insurant}) ;
        this.setState({openInsurant:true});
    } ;
    toInsurantSelf = () => {
        this.state.insurant = this.employInsurantModel() ;
        this.state.isMain = false ;
        this.state.insurant.isMain = false ;
        this.state.isNew = true ;
        this.setState({isMain: this.state.isMain}) ;
        this.setState({openInsurant:true});
        // console.log(this.state.openInsurant) ;
    } ;
    toUpdateInsurantSelf = (model) => {
        this.state.insurant = model ;
        this.state.isNew = false ;
        this.setState({insurant: this.state.insurant}) ;
        this.setState({openInsurant:true});
    } ;
    onCloseInsurant = () => {
        this.setState({openInsurant:false});
    };
    onCommitInsurant = ( model, isNew ) => {
        console.log("model : " + JSON.stringify(model)) ;
        console.log("isNew : " + isNew ) ;
        if(isNew) {
            this.props.actions.addInsurant(this.props.auth.id,model) ;
        } else {
            this.props.actions.updateInsurant(this.props.auth.id,model) ;
        }
    };
    employInsurantModel = () => {
        return {
            "familyName":"","firstName":"","name": "",
            "relationshipId": "",
            "birthDate": moment().format("YYYY-MM-DD"),
            "address": {
                "cityId":"6001001000","zipId":"","address":""
            },
            "height":"",
            "weight":"",
            "diseaseIds": [],
            "isMain":undefined,
            "replaceMain": {"proofFileId":"","reason": ""},
            "accessToken":3
            }
    };
    // === process for dialog new company insurant end === 

    // === process for static page member statute ===
    openServiceStatute = () => {
        this.setState({openServiceStatute:true});
    } ;
    onCloseServiceStatute = () => {
        this.setState({openServiceStatute:false});
    } ;
    // === process for static page end ===

    generateMainView = () => {
        let mainIns = this.state.insurants.find(ins => ins.isMain === true) ;
        return <MainInsurantView mainIns={mainIns} 
                definition={this.props.definition} 
                toUpdateMainInsurant={this.toUpdateMainInsurant}/>
    } ;

    generateNotMainView = () => {
        let notMainIns = this.state.insurants.filter(ins => ins.isMain === false) ;
        return <SelfInsurantView 
                notMainIns={notMainIns} 
                definition={this.props.definition} 
                toUpdateInsurantSelf={this.toUpdateInsurantSelf}/>
    } ;
    
    render() {
        console.log("robin : " + this.state.openCommitStopPInsure) ;
        // let permissions = (this.props.auth.permission && this.props.auth.permission.length) ? this.props.auth.permission : [];
        // let roles =  (this.props.auth.roles && this.props.auth.roles.length) ? this.props.auth.roles : [];
        // // let isPortalAdmin = roles.find(r => r === "PORTAL_ADMIN");
        // let isPortalCareManager = roles.find(r => r === "PORTAL_CARE_MANAGER");
        // let isWebViewPortal = permissions.find(p => p.id === "WEB_VIEW_PORTAL");
        // // let isWebViewMaster = permissions.find(p => p.id === "WEB_VIEW_MASTER");
        //
        // let masterStyle = {};
        // 這裡的邏輯待角色權限導入後需要進行修改.
        // if(isPortalCareManager && isWebViewPortal){
        //     masterStyle.display = 'none';     // CM 不可見 Master
        // }
        return (
            <div id="portal">
                <Header/>
                <div className="listBox">
                    <div className="serviceTTL">員工個人資料</div>
                    <EmployeeInfo definition={this.props.definition}
                                  auth={this.props.auth}
                                  openServiceStatute={this.openServiceStatute}
                                  onCommit={this.updateEmployeeInfo}/>
                    <div className="btnBlock">
                        <a href="javascript:void(0);" 
                          onClick={this.state.insurants.find(ins => ins.isMain === true) ? '' : this.toInsurant} 
                          className="btn-default btn-oliveDrab float-left">
                            公司提供保障對象
                        </a>
                        <a href="javascript:void(0);" 
                          onClick={this.toDocumentUpload}
                          className="btn-default btn-orange float-left">
                            轉換對象
                        </a>
                        <a href="javascript:void(0);" 
                          className="btn-default btn-pink float-left" 
                          onClick={this.toChangeRecords}>
                            變更紀錄
                        </a>
                    </div>
                    {this.generateMainView()}
                    <div className="btnBlock">
                        <a href="javascript:void(0);" 
                          onClick={this.toInsurantSelf} 
                          className="btn-default btn-oliveDrab float-left">
                            自費保障對象
                        </a>
                    </div>
                    {this.generateNotMainView()}
                </div>
                <Insurant open={this.state.openInsurant} 
                    definition={this.props.definition} 
                    onRequestClose={this.onCloseInsurant}
                    onCommitInsurant={this.onCommitInsurant} 
                    isMain={this.state.isMain} 
                    insurant={this.state.insurant}
                    auth={this.props.auth}
                    toCommitStopPInsureOk={this.toCommitStopPInsureOk}
                    terminateInsurant={this.terminateInsurant}
                    isNew={this.state.isNew}/>
                <CommitStopPInsure open={this.state.openCommitStopPInsure} 
                    onRequestClose={this.onCloseCommitStop} />
                <DocumentUpload open={this.state.openDocumentUpload} 
                    onRequestClose={this.onCloseDocumentUpload}
                    toChangePInsure={this.toChangePInsure}
                    auth={this.props.auth}/>
                <ChangePInsure open={this.state.openChangePInsure}
                    onRequestClose={this.onCloseChangePInsure}
                    toNewMainInsure={this.toNewMainInsure}
                    insurants={this.state.insurants.filter(ins => ins.isMain === false)}
                    replaceMain={this.state.insurant.replaceMain}
                    toCommitChangePInsure={this.toCommitChangePInsure}/>
                <CommitChangePInsureOk open={this.state.openChangePInsureOk} 
                    onRequestClose={this.onCloseChangePInsureOk} />
                <ChangeRecords open={this.state.openChangeRecords} 
                    insurantsChangeLogs={this.state.insurantsChangeLogs}
                    onRequestClose={this.onCloseChangeRecords} 
                    onChangeYear={this.onChangeYear}
                    year={this.state.year} />
                <ServiceStatute open={this.state.openServiceStatute}
                    onRequestClose={this.onCloseServiceStatute} />
            </div>
        );
    }
}