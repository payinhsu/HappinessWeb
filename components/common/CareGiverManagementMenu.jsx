import React, { PropTypes } from 'react';
import {Link} from 'react-router';

export default class CareGiverManagementMenu extends React.Component {

    render() {
        return (
            <div className="btnBlock" style={{float:'left', width:'100%'}}>
                <span className="float-right">&nbsp;&nbsp;</span>
                <Link to="/admin/careGiverManagement/careGiverList" className="btn-orange float-right" >管家管理</Link>
                <span className="float-right">&nbsp;&nbsp;</span>
                <Link to="/admin/careGiverManagement/careInstitutionShiftTable" className="btn-orange float-right" >排班管理</Link>
                <span className="float-right">&nbsp;&nbsp;</span>
                <Link to="/admin/careGiverManagement/careGiverList" className="btn-orange float-right" >訂單管理</Link>
                <span className="float-right">&nbsp;&nbsp;</span>
                <Link to="/admin/careGiverManagement/careGiverList" className="btn-orange float-right" >服務統計</Link>
                <span className="float-right">&nbsp;&nbsp;</span>
                <Link to="/admin/careGiverManagement/careGiverProfile" className="btn-orange float-right" >簡介</Link>{/*素人及機構照顧管家個人簡介維護*/}
            </div>
        );
    }
}