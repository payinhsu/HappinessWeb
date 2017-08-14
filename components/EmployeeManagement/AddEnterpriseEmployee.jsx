import React, { PropTypes } from 'react';
import {Modal,Button} from 'react-bootstrap';
import { connect }            from 'react-redux';

export default class AddEnterpriseEmployee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.openAddEmployeePopUp
        };
    };

    componentWillReceiveProps = newProps => {
        if(this.state.open !== newProps.openAddEmployeePopUp){
            this.setState({
                open:newProps.openAddEmployeePopUp
            });
        }
    };

    handleClose = () => {
        this.setState({open: false});
        this.props.closeAddEmployeePopUp();
    };

    handleOpenUploadPopUp = () => {
        this.props.popUpUpload();
    };

    render() {

        return (
            <div className="modal-container">
                <Modal
                    show={this.state.open}
                    onHide={this.handleClose}
                    container={this}
                    bsSize="large" aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg"></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{float:'right',width:'80%'}}>
                            <a href="javascript:void(0);" onClick={this.props.popUpAddOneEmployee}>
                                個別新增
                            </a>
                            &nbsp;&nbsp;
                            <a href="javascript:void(0);" onClick={this.handleOpenUploadPopUp}>
                                批次新增
                            </a>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>關閉</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}