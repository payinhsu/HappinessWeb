import React, { PropTypes } from 'react';
import {Modal,Button} from 'react-bootstrap';
import _ from 'lodash';

export default class ReturnExcelResultPopUp extends React.Component {
    static contextTypes = {
        authData: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            open: props.openResult,
            importFileResult: props.importFileResult,
            importGiversResult: props.importGiversResult,
            permissions:(props.auth && props.auth.permissionIds) ? props.auth.permissionIds : []
        };
    };

    componentWillReceiveProps = newProps => {
        if(this.state.importFileResult !== newProps.importFileResult){
            this.setState({
                importFileResult:newProps.importFileResult,
                open:!_.isEmpty(newProps.importFileResult)
            });
        }
        if(this.state.importGiversResult !== newProps.importGiversResult){
            this.setState({
                importGiversResult:newProps.importGiversResult,
                open:!_.isEmpty(newProps.importGiversResult)
            });
        }
    };

    handleClose = () => {
        this.setState({open: false});
        this.props.closeResult();
    };

    render() {
        let importEmployeesResult;
        let importGiversResult;

        if(this.state.importFileResult && this.state.importFileResult.failRows > 0){
            importEmployeesResult =
            <div>
                匯入資料，成功{this.state.importFileResult ? this.state.importFileResult.successRows : 0}筆，失敗{this.state.importFileResult ? this.state.importFileResult.failRows : 0}筆有重複/錯誤，
                請重新檢視您上傳的檔案。
            </div>
        }else if(this.state.importFileResult && this.state.importFileResult.successRows > 0){
            importEmployeesResult =
            <div>
                匯入資料成功，系統已自動發出邀請員工填報保障對象信函至各員工的電子信箱。
            </div>
        }

        if(this.state.importGiversResult && this.state.importGiversResult.failRows > 0){
            importGiversResult =
                <div>
                    匯入資料，成功{this.state.importGiversResult ? this.state.importGiversResult.successRows : 0}筆，失敗{this.state.importGiversResult ? this.state.importGiversResult.failRows : 0}筆有重複/錯誤，
                    請重新檢視您上傳的檔案。
                </div>
        }else if(this.state.importGiversResult && this.state.importGiversResult.successRows > 0){
            importGiversResult =
                <div>
                    匯入資料成功，系統已自動發出照顧管家驗證啟用信函至各管家的電子信箱
                </div>
        }
        return (
            <div className="modal-container">
                <Modal
                    show={this.state.open}
                    onHide={this.handleClose}
                    container={this}
                    bsSize="large" aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            {
                                ((this.state.importFileResult && this.state.importFileResult.failRows > 0) || (this.state.importGiversResult && this.state.importGiversResult.failRows > 0)) ? "錯誤提醒" : "匯入成功提醒"
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            {importEmployeesResult}
                            {importGiversResult}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
