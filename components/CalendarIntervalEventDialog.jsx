import React from 'react';
// import Dialog from 'material-ui/lib/dialog';
// import FlatButton from 'material-ui/lib/flat-button';
// import RaisedButton from 'material-ui/lib/raised-button';
// import Divider from 'material-ui/lib/divider';
import _ from 'lodash';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';
import events from 'components/common/calendar-event/events';
import { Modal, Button, Image} from 'react-bootstrap';

export default class CalendarIntervalEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	open: props.open,
    	calendarIntervalEvent:{
  			eventTitle: "",
  			intervalStartDate: moment().format(),
  			intervalEndDate:  moment().format(),
  			weekDaysStr: "",
  			weekDays: []
  		},
    	eventSet:events
    };
  }

  componentWillReceiveProps = newProps => {
    let nextState = {
      open: newProps.open
    };

    this.setState(nextState);
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  resetState(){
  	this.setState({    	
  		calendarIntervalEvent:{
  			eventTitle: "",
  			intervalStartDate: moment().format(),
  			intervalEndDate:  moment().format(),
  			weekDaysStr: "",
  			weekDays: []
  		}
  	});
  }

  handleClose = () => {
    this.setState({open: false});
    this.props.onRequestClose();
  };

  handleConfirm = () => {
  	if((this.state.calendarIntervalEvent.intervalEndDate) < (this.state.calendarIntervalEvent.intervalStartDate)) {
  		alert("開始時間不能大於結束時間.");
  		return; 		
  	}
  	let weekDays = this.state.calendarIntervalEvent.weekDaysStr.split(",");

  	let newEventSet = this.state.eventSet
  	weekDays.map(function(eachDay) {
  		if(eachDay < 0 || eachDay > 6) {
  			alert("輸入數字必須介於0~6之間."); 
  		}
  		else {
  			let intervalStartDate = this.state.calendarIntervalEvent.intervalStartDate
  			let intervalStartDateWeekDay = moment(intervalStartDate).weekday();
        console.log(intervalStartDateWeekDay) ;
  			let diffDayNum = eachDay - intervalStartDateWeekDay;
  			//console.log(diffDayNum) ;
  			let eventDate = intervalStartDate
  			if(diffDayNum >= 0) {
  				eventDate = moment(intervalStartDate).add(diffDayNum,'day');
  			} 
  			else {
  				eventDate = moment(intervalStartDate).add(diffDayNum + 7, 'day'); 
  			}

        console.log(eventDate) ;
  			for(var i = eventDate; i < moment(this.state.calendarIntervalEvent.intervalEndDate) ; i = i.add(7, 'day') ) {
  				newEventSet.push(
  					{
  						'title': this.state.calendarIntervalEvent.eventTitle,
        				'start': moment(i),
        				'end': moment(i)
  					}
  				)
  			}
  		}
  	}, this);
      
    console.log(newEventSet);
    this.setState({eventSet:newEventSet});  

    //inserDB
    this.handleClose();
    this.resetState();
  };

  handleChangeEventTitle = (field, e) => {
    let newEvent = Object.assign({}, this.state.calendarIntervalEvent);
    newEvent[field] = e.target.value;
    this.setState({calendarIntervalEvent:newEvent});
  }

  handleChangeEventDate = (field, e, date) => {
    //const dateStr = moment(date).format("YYYY-MM-DD").toDate();
    let newEvent = Object.assign({}, this.state.calendarIntervalEvent);
    newEvent[field] = date;
    this.setState({calendarIntervalEvent:newEvent});
  }  

  handleChangeWeekDaysStr = (field, e) => {
    let newEvent = Object.assign({}, this.state.calendarIntervalEvent);
    newEvent[field] = e.target.value;
    this.setState({calendarIntervalEvent:newEvent});
  }

  render() {
    // const actions = [
    //   <FlatButton
    //     label="取消"
    //     primary={true}
    //     onTouchTap={this.handleClose}
    //   />,
    //   <FlatButton
    //     label="確認"
    //     primary={true}
    //     keyboardFocused={true}
    //     onTouchTap={this.handleConfirm}
    //   />,      
    // ];

    return (
      // <Dialog
      //     title="新增行事曆事件"
      //     actions={actions}
      //     modal={false}
      //     open={this.state.open}
      //     onRequestClose={this.handleClose}
      //     autoScrollBodyContent={true}
      // >
      <Modal
        show={this.state.open}
        onHide={this.handleClose}
        bsSize="lg">
        <Modal.Header closeButton>
            <Modal.Title><p>新增區間事件</p></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            事件名稱：<input type="text" value={this.state.calendarIntervalEvent.eventTitle} onChange={this.handleChangeEventTitle.bind(this, 'eventTitle')} /><br />
            區間開始日期：<DatePicker value={this.state.calendarIntervalEvent.intervalStartDate} 
                                    onChange={this.handleChangeEventDate.bind(this, 'intervalStartDate')} 
                                    dateFormat="YYYY-MM-DD"/><br />
            區間結束日期：<DatePicker value={this.state.calendarIntervalEvent.intervalEndDate} 
                                    onChange={this.handleChangeEventDate.bind(this, 'intervalEndDate')} 
                                    dateFormat="YYYY-MM-DD"/>
            星期幾 (輸入數字，以逗點隔開，ex: 1,3,5)：<input type="text" value={this.state.calendarIntervalEvent.weekDaysStr} onChange={this.handleChangeWeekDaysStr.bind(this, 'weekDaysStr')} /><br />
          </div>
          <div>
              <button onClick={this.handleConfirm}>確認</button>
          </div>
        </Modal.Body>
        </Modal>     
      // </Dialog>
    );
  }
}