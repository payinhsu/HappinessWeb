import React, { PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import CalendarEventDialog from 'components/CalendarEventDialog';

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

export default class UseCalendar extends React.Component {
	constructor(props) {
		super(props);
		var tempEventSet = [];

        props.institution.shifts.map(event => (
            tempEventSet.push({
				"title": event.title,
				"start": moment(event.startDateTime),
				"end": moment(event.endDateTime),
                "bgType": this.setBgType(event.title)
            })
        ));

		this.state = {
			// dialog control
			openCalendarEventDialog:false,
			scheduleEvent:{
				eventTitle: "",
				intervalStartDate: moment().format(),
				intervalEndDate:  moment().format(),
				weekDaysStr: "0,1,2,3,4,5,6",
				weekDays: [],
		        bgType: 'rbc-event'
			},
	    	eventSet:tempEventSet	  
		};
		console.log("----------eventSet------------------");
		console.log(tempEventSet);	
		console.log("------------------------------------------");
	}

    componentWillReceiveProps = newProps => {
		var tempEventSet = [];

        newProps.institution.shifts.map(event => (
            tempEventSet.push({
				"title": event.title,
				"start": moment(event.startDateTime),
				"end": moment(event.endDateTime),
                "bgType": this.setBgType(event.title)
            })
        ));

        this.setState({
            eventSet: tempEventSet
        });
        //console.log("componentWillReceiveProps...........")
        //console.log(this.state.eventSet);
    };

    static onEnter(store){
        return (nextState, replace, callback) => {
            DefinitionActions.getPermissions()(store.dispatch, store.getState).then(() => {
                InstitutionActions.getCareGiverShiftTable(store.getState().auth.id)(store.dispatch, store.getState).then(() => callback());
            });
        }
    }

	resetState(){
		this.setState({    	
			scheduleEvent:{
				eventTitle: "",
				intervalStartDate: moment().format(),
				intervalEndDate:  moment().format(),
				weekDaysStr: "0,1,2,3,4,5,6",
				weekDays: [],
		        bgType: 'rbc-event'
			}
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

	handleConfirm = () => {
		if((this.state.scheduleEvent.intervalEndDate) < (this.state.scheduleEvent.intervalStartDate)) {
			alert("開始時間不能大於結束時間.");
			return; 		
		}
		let weekDays = this.state.scheduleEvent.weekDaysStr.split(",");
		/*console.log("----------weekDays array------------------");
		console.log(weekDays);
		console.log("------------------------------------------");*/

		weekDays.map(function(eachDay) {
			if(eachDay < 0 || eachDay > 6) {
				alert("輸入數字必須介於0~6之間."); 
			}
			else {
				let intervalStartDate = this.state.scheduleEvent.intervalStartDate
				/*console.log("--------------區間開始日期----------------");
				console.log(intervalStartDate);
				console.log("------------------------------------------");*/		
				let intervalStartDateWeekDay = moment(intervalStartDate).weekday();
				//console.log("--------------區間開始日期是星期" + intervalStartDateWeekDay + "----------------");
				let diffDayNum = eachDay - intervalStartDateWeekDay;
				//console.log("eachDay - intervalStartDateWeekDay = " + diffDayNum) ;
				let eventDate = intervalStartDate
				if(diffDayNum >= 0) {
					var eventDate = moment(intervalStartDate).add(diffDayNum,'day');
					/*console.log("--------------事件日期是" + eventDate + "----------------");
					console.log(eventDate);
					console.log(eventDate.valueOf());
					console.log("---------------------------------------------");*/
				} 
				else {
					var eventDate = moment(intervalStartDate).add(diffDayNum + 7, 'day');
					/*console.log("--------------事件日期是" + eventDate + "----------------"); 
					console.log(eventDate);
					console.log(eventDate.valueOf());	
					console.log("---------------------------------------------");*/								
				}

	    //console.log(eventDate) ;
				for(var i = eventDate; i < moment(this.state.scheduleEvent.intervalEndDate) ; i = i.add(7, 'day') ) {
					switch(this.state.scheduleEvent.eventTitle) {
						case 'A':
							var careShiftId = '1';
							break;

						case 'B':
							var careShiftId = '2';
							break;
							
						case 'C':
							var careShiftId = '3';
							break;							
					}
					
					let result = this.props.actions.createCareGiverShift(this.props.auth.id, {'careShiftId': careShiftId, 'startDate': i.valueOf(), 'endDate': i.valueOf()});
					//console.log(result);
				}
			}
		}, this);
     
		//inserDB
		this.resetState();
	};

	handleChangeEventTitle = (e) => {
		let newEvent = Object.assign({}, this.state.scheduleEvent);
		newEvent['eventTitle'] = e.target.value;
		newEvent['bgType'] = this.setBgType(e.target.value);

		this.setState({scheduleEvent:newEvent});
		//console.log(this.state.scheduleEvent.eventTitle);
	}

	handleChangeEventDate = (field, e, date) => {
		//const dateStr = moment(date).format("YYYY-MM-DD").toDate();
		let newEvent = Object.assign({}, this.state.scheduleEvent);
		newEvent[field] = date;
		this.setState({scheduleEvent:newEvent});
	}

	/*handleChangeWeekDaysStr = (field, e) => {
		let newEvent = Object.assign({}, this.state.scheduleEvent);
		newEvent[field] = e.target.value;
		this.setState({scheduleEvent:newEvent});
	}*/

	handleOpenCalendarEventDialog = (e) => {
		e.preventDefault();
		this.setState({openCalendarEventDialog:true});
	}

	onCloseCalendarEventDialog = () => {
      this.setState({openCalendarEventDialog:false});
  	}

	render() {
		return (
			<div>
				<div className='example contain' >	
					<button onClick={this.handleOpenCalendarEventDialog} >新增單日事件</button><br/>

					<table>
						<tr>
							<td><input type="radio" name="timeSession" value='A' checked={this.state.scheduleEvent.eventTitle === 'A'} onChange={this.handleChangeEventTitle} /> A時段(07:00~15:00) </td>
							<td><input type="radio" name="timeSession" value='B' checked={this.state.scheduleEvent.eventTitle === 'B'} onChange={this.handleChangeEventTitle} /> B時段(15:00~23:00 </td>
							<td><input type="radio" name="timeSession" value='C' checked={this.state.scheduleEvent.eventTitle === 'C'} onChange={this.handleChangeEventTitle} /> C時段(23:00~07:00) </td>
						</tr>
						<tr>
							<td>
								區間開始日期：<DatePicker value={this.state.scheduleEvent.intervalStartDate} 
								                        onChange={this.handleChangeEventDate.bind(this, 'intervalStartDate')} 
								                        dateFormat="YYYY-MM-DD"/>
							</td>                        
							<td>
								區間結束日期：<DatePicker value={this.state.scheduleEvent.intervalEndDate} 
								                        onChange={this.handleChangeEventDate.bind(this, 'intervalEndDate')} 
								                        dateFormat="YYYY-MM-DD"/>
                        	</td>
                        </tr>
                         
                        {/*<tr>
							<td>星期幾 (輸入數字，以逗點隔開，ex: 1,3,5)：<input type="text" value={this.state.scheduleEvent.weekDaysStr} onChange={this.handleChangeWeekDaysStr.bind(this, 'weekDaysStr')} /></td>
						</tr>*/}
						
					</table><br />
					<div>
					 	<button onClick={this.handleConfirm}>確認</button>
					</div><br /><br />

					<BigCalendar
						{...this.props}
						popup
						events={this.state.eventSet}
						defaultDate={new Date()}
					/>
				</div>
				<div>
					<CalendarEventDialog open={this.state.openCalendarEventDialog} onRequestClose={this.onCloseCalendarEventDialog} />
				</div>
			</div>  	
		)
	}
}