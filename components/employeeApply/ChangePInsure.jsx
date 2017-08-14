import React, { PropTypes } from 'react';
import {Link} from 'react-router';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import moment from 'moment';
import {Modal, Button, Image} from 'react-bootstrap';

export default class UploadPInsure extends React.Component {
	
    constructor(props) {
        super(props);
        this.state = {
            open : props.open,
            insurants: props.insurants, 
            replaceMain: props.replaceMain
        }
        //console.log("robin cons : " + JSON.stringify(this.state.replaceMain)) ;
    } 

    componentWillReceiveProps = newProps => {
        let nextState = {
            open : newProps.open,
            insurants: newProps.insurants,
            replaceMain: newProps.replaceMain
        };
        this.setState(nextState);
        //console.log("robin rece : " + JSON.stringify(this.state.replaceMain)) ;
    };

	toCommitChangePInsure = (insId) => {
		// browserHistory.push('/admin/commitChangePInsureOk');	
        this.setState({open: false});
        this.props.toCommitChangePInsure(insId) ;
	};

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

    toNewMainInsure = () => {
        this.setState({open: false});
        this.props.toNewMainInsure();
    };

	render() {
        // const actions = [
        //   <FlatButton
        //     label="取消"
        //     primary={true}
        //     onTouchTap={this.handleClose}
        //   />,
        // ];
		return(
            // <Dialog
            //   contentStyle={{width:'90%', maxWidth: 'none'}}
            //   title="從自費轉換公司保障對象資料"
            //   actions={actions}
            //   modal={false}
            //   open={this.state.open}
            //   onRequestClose={this.handleClose}
            //   autoScrollBodyContent={true}
            // >
            // <Divider />
            <Modal
            show={this.state.open}
            onHide={this.handleClose}
            bsSize="lg">
            <Modal.Header closeButton>
                <Modal.Title><p>從自費轉換公司保障對象資料</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div id="portal">
            <div className="listBox">
                <div className="box">
                    <tag>
                        <table>
                            <tr>
                                <th>自費對象</th>
                                <th>關係</th>
                                <th>出生年月日</th>
                                <th>申請變更</th>
                            </tr>
            			    {this.state.insurants.map((ins, index) => 
                                <tr>
                                    <td>{ins.name}</td>
                                    <td>{ins.relationshipName}</td>
                                    <td>{ moment(ins.birthDate).format("YYYY-MM-DD")}</td>
                                    <td>
                                        <button className="btn-orange" 
                                            onClick={this.toCommitChangePInsure.bind(this, ins.id)}>確認
                                        </button>
                                    </td>
                                </tr>
                            )}   	
                        </table>
                    </tag>
                </div>
                <div className="box">
                	<button className="btn-orange float-right" onClick={this.toNewMainInsure}>自行新增</button>
                </div>
            </div>
			</div>
            </Modal.Body>
            </Modal>
            //</Dialog>
		);
	}
}