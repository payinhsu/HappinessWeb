import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import Dropzone from 'react-dropzone'
import {Modal,Button} from 'react-bootstrap';

class DropzoneUploadForm extends React.Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            openUpload: props.openUploadPopUp,
            files: [],
            actions: props.actions
        };
    };

    componentWillReceiveProps = newProps => {
        if(this.state.openUpload !== newProps.openUploadPopUp){
            this.setState({
                openUpload:newProps.openUploadPopUp
            });
        }
        this.setState({
            files: newProps.files
        });
    };

    onSubmit() {
        let data = this.state.files;
        if(data) {
            var body = new FormData();
            Object.keys(data).forEach((key) => {
                body.append('file', data[key]);
            });
            this.state.actions.uploadExcel(body).then(this.handleClose());
        }else{
            alert("請選擇遇上傳之檔案");
        }
    }

    handleClose = () => {
        this.setState({openUpload: false});
        this.props.closeUploadPopUp();
    };

    render() {
        const FILE_FIELD_NAME = 'files';
        const renderDropzoneInput = (field) => {
            return (
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <Dropzone
                                    accept="application/vnd.ms-excel"
                                    name={field.name}
                                    onDrop={( filesToUpload, e ) => {
                                        this.setState({
                                            files:filesToUpload
                                        });
                                        field.input.onChange(filesToUpload);
                                    }}
                                >
                                    <div>將檔案拖拉至此,或點選遇上傳之檔案.</div>
                                </Dropzone>
                            </td>
                            <td style={{verticalAlign: 'bottom'}}>
                                {field.meta.touched &&
                                field.meta.error &&
                                <span className="error">{field.meta.error}</span>}
                                {
                                    this.state.files && Array.isArray(this.state.files) && (
                                        <ul>
                                            檔名{ this.state.files.map((file, i) => <li key={i}>{file.name}</li>) }
                                        </ul>
                                )}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }

        const {
            handleSubmit
        } = this.props;
        return (
            <div className="modal-container">
                <Modal
                    show={this.state.openUpload}
                    onHide={this.handleClose}
                    container={this}
                    bsSize="large" aria-labelledby="contained-modal-title-lg"
                >
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">批次新增</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div>
                                    <label htmlFor={FILE_FIELD_NAME}>上傳檔案</label>
                                    <Field
                                        name={FILE_FIELD_NAME}
                                        component={renderDropzoneInput}
                                    />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleClose}>取消</Button>
                            <Button type="submit">確認</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default reduxForm({
    form: 'uploadExcel',
})(DropzoneUploadForm);