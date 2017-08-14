import React                   from 'react';
import {requireAuth}           from 'auth';
import { Route, IndexRoute, IndexRedirect }   from 'react-router';

import App                     from 'components/index';
import Admin                   from 'components/Admin';
import Wellcome                from 'components/Wellcome';
import UseCalendar             from 'components/UseCalendar';
import EnableEmail             from 'components/EnableEmail';
import EnableEmailSetPwd       from 'components/EnableEmailSetPwd';
// import Demo                  from 'components/Demo';
import EmployeeApplyService	   from 'components/employeeApply/EmployeeApplyService';
import UserConsole		       from 'components/UserConsole';
import RefIns 				   from 'components/RefIns.jsx' ;
import loginPage 			   from 'components/Login.jsx' ;

/** OperationsManagement **/
import OperationsManagement	   from 'components/operationsManagement/OperationsManagement';
import CorporateClient		   from 'components/operationsManagement/CorporateClient';
import CareInstitution         from 'components/operationsManagement/CareInstitution';
import CareManager      	   from 'components/operationsManagement/CareManager';
import CareHousekeeper 		   from 'components/operationsManagement/CareHousekeeper';
import ContractManagement      from 'components/operationsManagement/ContractManagement';
import AccountingManagement    from 'components/operationsManagement/AccountingManagement';

import RoleList   			   from 'components/roleManagement/RoleList' ;
import MemberList			   from 'components/roleManagement/MemberList' ;
import YoutubePage		   	   from 'components/common/YoutubePage';
import EmployeeList		   	   from 'components/EmployeeManagement/EmployeeList';

import CareGiverManagement     from 'components/careGiverManagement/CareGiverManagement';
import CareGiverList		   from 'components/careGiverManagement/CareGiverList';
import CareInstitutionShiftTable from 'components/careGiverManagement/CareInstitutionShiftTable';
import CareInstitutionInfo from 'components/careGiverManagement/CareInstitutionInfo' ;
import CareGiverProfile		   from 'components/careGiverManagement/CareGiverProfile';

import CareGiverShift		   from 'components/UseCalendar';
/** CareManager Admin **/
import CareManagerManagement    from 'components/careManager/CareManagerManagement';

var config = require('config');
var webContext = '/';
if(typeof window === 'object') {
  if(config.webContext !== '/' && config.webContext.length > 1){
    webContext = config.webContext.substring(0, config.webContext.length -1);
  }
  else webContext = config.webContext;
}

export default store => (
	<Route path={webContext} name="app" component={App}>
		<IndexRoute component={Wellcome} onEnter={Wellcome.onEnter(store)}  />
		<Route path="login" component={Wellcome} onEnter={()=> window.location.reload()}/>
		<Route path="loginPage" component={loginPage} />
		<Route path="wellcome" component={Wellcome} onEnter={Wellcome.onEnter(store)}  />
		<Route path="admin" name="admin" component={Admin} onEnter={requireAuth(store)} >
			<Route path = "employeeApplyService" component={EmployeeApplyService} onEnter={EmployeeApplyService.onEnter(store)}/>
			<Route path = "userConsole" component={UserConsole} />
			<Route path = "refIns" component={RefIns} />
			<Route path = "operationsManagement"
				component={OperationsManagement}
				onEnter={OperationsManagement.onEnter(store)}>
				<Route path = "corporateClient" component={CorporateClient} onEnter={CorporateClient.onEnter(store)}/>
				<Route path = "careInstitution" component={CareInstitution} onEnter={CareInstitution.onEnter(store)}/>
				<Route path = "careManager" component={CareManager} onEnter={CareManager.onEnter(store)}/>
				<Route path = "careHousekeeper" component={CareHousekeeper} onEnter={CareHousekeeper.onEnter(store)}/>
				<Route path = "contractManagement" component={ContractManagement} />
				<Route path = "accountingManagement" component={AccountingManagement} />
			</Route>
            <Route path = "careGiverManagement"
                component={CareGiverManagement}
                onEnter={CareGiverManagement.onEnter(store)}>
                <Route path = "careInstitutionInfo" component={CareInstitutionInfo} onEnter={CareInstitutionInfo.onEnter(store)} />
                <Route path = "careGiverList" component={CareGiverList} onEnter={CareGiverList.onEnter(store)}/>
                <Route path = "careInstitutionShiftTable" component={CareInstitutionShiftTable} onEnter={CareInstitutionShiftTable.onEnter(store)}/>
                <Route path = "careGiverProfile" component={CareGiverProfile} onEnter={CareGiverProfile.onEnter(store)}/>
            </Route>
			<Route path = "roleList" component={RoleList} onEnter={RoleList.onEnter(store)}/>
			<Route path = "memberList" component={MemberList} onEnter={MemberList.onEnter(store)}/>
			<Route path = "youtubePage" component={YoutubePage} />
			<Route path = "employeeList" component={EmployeeList} onEnter={EmployeeList.onEnter(store)}/>
      		<Route path = "careManagerManagement" component={CareManagerManagement} onEnter={CareManagerManagement.onEnter(store)}/>
		</Route>
		<Route path="usecalendar" name="usecalendar" component={UseCalendar} onEnter={CareGiverShift.onEnter(store)} />
		<Route path="enableEmail" name="enableEmail" component={EnableEmail} />
		<Route path="enableEmailSetPwd" name="enableEmailSetPwd" component={EnableEmailSetPwd} />
	</Route>
);
