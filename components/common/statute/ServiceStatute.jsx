import React, { PropTypes } from 'react';
import {Link} from 'react-router';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import {Modal, Button, Image} from 'react-bootstrap';

export default class ServiceStatute extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            open : props.open
        }
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open
        };
        this.setState(nextState);
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

	render() {
		// const actions = [
  //         <FlatButton
  //           label="確認"
  //           primary={true}
  //           onTouchTap={this.handleClose}
  //         />,
  //       ];
		 return (
		 	// <Dialog
    //           contentStyle={{width:'90%', maxWidth: 'none'}}
    //           title="個人及保障對象個資、服務規約使用"
    //           actions={actions}
    //           modal={false}
    //           open={this.state.open}
    //           onRequestClose={this.handleClose}
    //           autoScrollBodyContent={true}
    //         >
    //         <Divider />
        <Modal
            show={this.state.open}
            onHide={this.handleClose}
            bsSize="lg">
            <Modal.Header closeButton>
                <Modal.Title><p>個人及保障對象個資、服務規約使用</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
    		 		<div className="listBox">
    					<div className="box" style={{ overflow:'auto'}}>
    							親愛的朋友您好： <br/><br/>
    							歡迎您加入「104銀髮幸福企業」服務網站成為會員，當你選擇加入「104銀髮幸福企業」
    							網站成為會員時，即視為你已閱讀、瞭解並同意接受「104銀髮幸福企業」
    							服務網站會員規約之全部內容，若你不同意，請立即登出並停止使用本網站所提供之任何會員服務。
    							「104銀髮幸福企業」網站有權於任何時間修改或變更本會員規約之內容，
    							你若於修改或變更後繼續使用「104銀髮幸福企業」網站之服務，即視為你已閱讀、
    							瞭解並同意接受該等修改或變更後之內容。
    					</div>
    				</div>
            </Modal.Body>
        </Modal>
	        // </Dialog>
		 );
	}
}