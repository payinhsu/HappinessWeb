import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Header from 'components/common/Header';
import * as DefinitionActions from 'actions/DefinitionActions';
import OperationsManagementMenu from 'components/common/OperationsManagementMenu';
import OperationsManagementContent from 'components/common/OperationsManagementContent';

export default class OperationsManagement extends React.Component {
 
 static onEnter(store){
        return (nextState, replace, callback) => {
            DefinitionActions.getDefinitions()(store.dispatch, store.getState).then(() => callback());
        }
    }

 static propTypes = {
     children: PropTypes.object
 };

 render() {
    let childProps = Object.assign({}, this.props);
    delete childProps.children;
    return (
    <div>
     	<Header/>
     	<OperationsManagementMenu/>
     	{this.props.children && React.cloneElement(this.props.children, {...childProps})}
    </div>
     );
 }
}