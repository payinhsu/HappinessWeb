import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone'
import {Modal,Button} from 'react-bootstrap';

export default class UploadPopUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openUpload: props.openUploadPopUp,
            files: [],
            fileName: '',
            actions: props.actions
        };
    };

    componentWillReceiveProps = newProps => {
        if(this.state.openUpload !== newProps.openUploadPopUp){
            this.setState({
                openUpload:newProps.openUploadPopUp
            });
        }
    };

    onDrop = (acceptedFiles) => {
        this.setState({
            files: acceptedFiles,
            fileName: '檔名:' + acceptedFiles[0].name
        });
    };

    onSubmitClick = () => {
        let file = this.state.files[0];
        if(file) {
            var data = new FormData();
            data.append('file', file);
            this.state.actions.uploadExcel(data);
            this.setState({files: [],fileName: ''});
        }else{
            alert("請選擇遇上傳之檔案");
        }
        this.handleClose();
        // if(this.props.uploadMassage === 'ok')
        //     alert("上傳成功")
        // else
        //     alert("上傳失敗")
    };

    handleClose = () => {
        this.setState({openUpload: false});
        this.props.closeUploadPopUp();
    };

    render() {
        return (
            <div className="modal-container">
                <Modal
                    show={this.state.openUpload}
                    onHide={this.handleClose}
                    container={this}
                    bsSize="large" aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">批次新增</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Dropzone onDrop={this.onDrop}>
                                                <div>將檔案拖拉至此,或點選遇上傳之檔案.</div>
                                            </Dropzone>
                                        </td>
                                        <td style={{verticalAlign: 'bottom'}}>{this.state.fileName}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>取消</Button>
                        <Button onClick={this.onSubmitClick}>確認</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}