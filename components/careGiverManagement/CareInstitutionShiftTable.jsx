import React, { PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';

import cn from 'classnames';
import { render } from 'react-dom';
import localizer from 'react-big-calendar/localizers/globalize';
import globalize from 'globalize';
import _ from 'lodash';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';
import * as DefinitionActions from 'actions/DefinitionActions';
import * as InstitutionActions from 'actions/InstitutionActions';

localizer(globalize);

export default class CareInstitutionShiftTable extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);

		var tempEventSet = [];

       	props.institution.institutionShifts.map(event => (
            tempEventSet.push({
            	"id": event.calendarId,
				"title": event.memberName,
				"start": moment(event.startDateTime),
				"end": moment(event.endDateTime),
                "bgType": this.setBgType(event.title)
            })
        ));

		this.state = {
	    	eventSet:tempEventSet	  
		};
		console.log("----------eventSet------------------");
		console.log(tempEventSet);	
		console.log("------------------------------------------");
	}

    componentWillReceiveProps = newProps => {
		var tempEventSet = [];

        newProps.institution.institutionShifts.map(event => (
            tempEventSet.push({
            	"id": event.calendarId,
				"title": event.memberName,
				"start": moment(event.startDateTime),
				"end": moment(event.endDateTime),
                "bgType": this.setBgType(event.title)
            })
        ));

        this.setState({
            eventSet: tempEventSet
        });
    };	
	
    static onEnter(store){
        return (nextState, replace, callback) => {
            DefinitionActions.getPermissions()(store.dispatch, store.getState).then(() => {
                InstitutionActions.getCareInstitutionShiftTable(store.getState().auth.careEmployee.companyId)(store.dispatch, store.getState).then(() => callback());
            });
        }
    }

	resetState(){
		this.setState({    	
		});
	}

	setBgType = (title) => {
		switch(title) {
			case 'A':
				return 'rbc-event';

			case 'B':
				return 'rbc-event-2';
				
			case 'C':
				return 'rbc-event-3';	
		}	
	}

	render() {
		return (
			<div>
				<div className='example contain' >	
					<BigCalendar
						{...this.props}
						selectable
						onSelectEvent={event => {
							if (window.confirm("是否刪除此筆班表？")) { 
								this.props.actions.deleteCalendarItem(event.id, this.props.auth.careEmployee.companyId);
							}
						}}
						popup
						events={this.state.eventSet}
						defaultDate={new Date()}
					/>
				</div>
			</div>  	
		)
	}
}