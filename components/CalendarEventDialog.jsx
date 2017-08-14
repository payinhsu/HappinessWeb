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

export default class CalendarEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      calendarEvent:{
        eventTitle: "",
        eventStartDate:  moment().format(),
        eventEndDate: moment().format(),
        bgType: 'rbc-event'       
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
      calendarEvent: {
        eventTitle: "",
        eventStartDate: moment().format(),
        eventEndDate: moment().format()         
      }
    });
  }

  handleClose = () => {
    this.setState({open: false});
    this.props.onRequestClose();
  };

  handleConfirm = () => {
    let newEventSet = this.state.eventSet
    newEventSet.push(
      {
        'title': this.state.calendarEvent.eventTitle,
        'start': this.state.calendarEvent.eventStartDate,
        'end': this.state.calendarEvent.eventEndDate,
        'bgType': this.state.calendarEvent.bgType
      }
    )
      
    this.setState({eventSet:newEventSet});  
    //console.log(this.state.eventSet);
    //inserDB
    this.handleClose();
    this.resetState();
    console.log(this.state.eventSet);
  };

  handleChangeEventTitle = (field, e) => {
    let newEvent = Object.assign({}, this.state.calendarEvent);
    newEvent[field] = e.target.value;
    this.setState({calendarEvent:newEvent});
  }

  handleChangeEventDate = (field, e, date) => {
    console.log("data : " + date) ;
    //const dateStr = moment(date).toISOString();
    let newEvent = Object.assign({}, this.state.calendarEvent);
    newEvent[field] = date;
    this.setState({calendarEvent:newEvent});
  }

  handleChageBgType = (field, e) => {
    let newEvent = Object.assign({}, this.state.calendarEvent);
    newEvent[field] = e.target.value;
    this.setState({calendarEvent:newEvent});
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

    let bgType = [
      {
        'name':'blue',
        'value':'rbc-event'
      }, 
      {
        'name':'red',
        'value':'rbc-event-2'
      }, 
      {
        'name':'green',
        'value':'rbc-event-3',
      }, 
      {
        'name':'yellow',
        'value':'rbc-event-4'
      }
    ];

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
            <Modal.Title><p>新增單日事件</p></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
          事件名稱：<input type="text" value={this.state.calendarEvent.eventTitle} onChange={this.handleChangeEventTitle.bind(this, 'eventTitle')} /><br />
          開始日期：<DatePicker value={this.state.calendarEvent.eventStartDate} 
                              onChange={this.handleChangeEventDate.bind(this, 'eventStartDate')} 
                              dateFormat="YYYY-MM-DD"/><br />
          結束日期：<DatePicker value={this.state.calendarEvent.eventEndDate} 
                              onChange={this.handleChangeEventDate.bind(this, 'eventEndDate')} 
                              dateFormat="YYYY-MM-DD"/>
        </div>
        班表類型
        <select
          className='form-control'
          style={{ width: 200, display: 'inline-block'}}
          defaultValue={'rbc-event'}
          value={this.state.calendarEvent.bgType}
          onChange={this.handleChageBgType.bind(this, 'bgType')}
        >
        {
          bgType.map((instance, idx) =>
            <option key={instance.name} value={instance.value}>{instance.name}</option>
          )
        }
        </select> 
        <div>
            <button onClick={this.handleConfirm}>確認</button>
        </div>
        </Modal.Body>
        </Modal>       
      //</Dialog>
    );
  }
}