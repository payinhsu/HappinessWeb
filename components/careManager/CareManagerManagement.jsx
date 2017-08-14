import React, { PropTypes } from 'react';
import Header from 'components/common/Header';

import CareManagerInfo        from 'components/careManager/CareManagerInfo'
import * as InitializationActions from 'actions/InitializationActions';

export default class CareManagerManagement extends React.Component {

    constructor(props) {
        super(props);
        console.log('props....')
        console.log(props);
        this.state = {};

        this.updateCareManager = this.updateCareManager.bind(this);
    }

    static onEnter(store){
        return (nextState, replace, callback) => {
            InitializationActions.initApplyCareManager()(store.dispatch, store.getState).then(() => callback());
        }
    }

    componentWillReceiveProps = newProps => {
        console.log('receive props');
        console.log(newProps) ;

    };

    // === process for update employee information ===
    updateEmployeeInfo = (memberId, model) => {
        this.props.updateEmployeeInfo(memberId, model).then(() => {
            this.props.updateAuth() ;
        });
    };



    updateCareManager = (model) => {
        this.props.actions.updateCareManager(this.props.auth.id, model).then(() => {
            alert('update success');
            this.props.actions.updateAuth();
        });
    }

    render() {
        return (
            <div id="portal">
                <Header/>
                <div className="listBox">
                    <div className="serviceTTL">照顧經理簡介</div>
                    <CareManagerInfo auth={this.props.auth}
                                     initialization={this.props.initialization}
                                  onCommit={this.updateCareManager}
                                  />
                </div>

            </div>
        );
    }
}


