import React, { PropTypes } from 'react';
import Header from 'components/common/Header';
import * as DefinitionActions from 'actions/DefinitionActions';
import CareGiverManagementMenu from 'components/common/CareGiverManagementMenu';

export default class CareGiverManagement extends React.Component {

    static onEnter(store){
        return (nextState, replace, callback) => {
            DefinitionActions.getDefinitions()(store.dispatch, store.getState).then(() => {
                DefinitionActions.getSkills()(store.dispatch, store.getState).then(() => {
                    DefinitionActions.getAbilities()(store.dispatch, store.getState).then(() => callback());
                }) ;
            });
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
                <CareGiverManagementMenu/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                {this.props.children && React.cloneElement(this.props.children, {...childProps})}
            </div>
        );
    }
}