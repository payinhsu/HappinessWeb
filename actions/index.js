/** this module provides app level actions **/
import { bindActionCreators }  from 'redux'

import * as PageActions       from './PageActions';
import * as UploadAction       from './UploadAction';
import * as DefinitionActions from './DefinitionActions';
import * as RoleActions       from './RoleActions';
import * as EnterpriseActions from './EnterpriseActions';
import * as InstitutionActions from './InstitutionActions';
import * as MemberActions 		from './MemberActions';
import * as InitializationActions from './InitializationActions'

// const actions = Object.assign({}, CourseActions, DefinitionActions);
const actions = Object.assign({}, PageActions, RoleActions, DefinitionActions, UploadAction, 
	EnterpriseActions, InstitutionActions, MemberActions, InitializationActions);
//console.log("actions : " + typeof InstitutionActions.getCareInstitution) ;
export default function mapDispatchToProps(dispatch) {
  return {
  	actions: bindActionCreators(actions, dispatch),
  }
}