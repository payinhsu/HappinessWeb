import React, { PropTypes } from 'react';
import {Link} from 'react-router';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import {Modal, Button, Image} from 'react-bootstrap';

export default class CommitStopPInsureOk extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            open: props.open, 
        };
        // console.log(JSON.stringify(this.state.insurant)) ;
    }

    componentWillReceiveProps = newProps => {
        let nextState = {
            open: newProps.open,
        };
        this.setState(nextState);
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

	render(){
		// const actions = [
  //         <FlatButton
  //           label="確認"
  //           primary={true}
  //           onTouchTap={this.handleClose}
  //         />,
  //       ];

		 return (
    //         <Dialog
    //           contentStyle={{width:'90%', maxWidth: 'none'}}
    //           title="完成自費保障對象終止"
    //           actions={actions}
    //           modal={false}
    //           open={this.state.open}
    //           onRequestClose={this.handleClose}
    //           autoScrollBodyContent={true}
    //         >
		 	// <Divider />
      <Modal
            show={this.state.open}
            onHide={this.handleClose}
            bsSize="lg">
            <Modal.Header closeButton>
                <Modal.Title><p>完成自費保障對象終止</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
		 	<div id="portal">
		 		<div className="listBox">
					<div className="box" style={{width:'300px', height:'250px', overflow:'auto', float:'left'}}>
						王小明先生您好，<br/>
						我們已經收到您提出的自費保障對象終止申請，將變更後的明細<br/>
						寄至您的電子信箱。<br/>
						若有任何疑問，歡迎洽詢：<br/>
						客服電話：(02)2912-6104分機9635<br/>
						客戶服務信箱：careu@104.com.tw<br/>
					</div>
					<div>
						<img src="../resource/commitService.png"/>
					</div>
				</div>
	        </div>
          </Modal.Body>
            </Modal>
	        // </Dialog>
		 );
	}
}