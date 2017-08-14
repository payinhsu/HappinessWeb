import React, {PropTypes} from 'react';
import {Link} from 'react-router';
//import Dialog from 'material-ui/lib/dialog';
//import Divider from 'material-ui/lib/divider';
//import FlatButton from 'material-ui/lib/flat-button';
import Document from 'components/common/Document';
import {Modal, Button, Image} from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import {connect} from 'react-redux';
import * as UploadAction from 'actions/UploadAction';
import * as PageActions from 'actions/PageActions';

class ProfilePicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: props.profile || this.emptyProfileModel(),
            open: props.open,
            headPhoto: this.props.auth === undefined ? undefined : this.props.auth
        }
    }

    componentWillReceiveProps = newProps => {
        let nextState = {
            open: newProps.open
        };
        this.setState(nextState);
    };

    close = () => {
        let cleanState = {
            profile: this.emptyProfileModel(),
            open: false
        }
        this.setState(cleanState);
        this.props.onRequestClose();
    }

    open = () => {
        this.setState({ open: true});
    }

    handleUploadImage = (fileKey, fileName) => {
        this.state.profile.fileKey = fileKey
        this.state.profile.imageName = fileName
        this.setState({profile: this.state.profile});
        console.log('profile is changing new picture > ' + fileName)
    };

    // 上傳並取得程課圖片後更新的 callback
    handleChangeImage = (field, url) => {
        this.state.profile[field] = url;

        this.setState({profile: this.state.profile});
    }

    handleConfirmUpload = () => {
        this.props.uploadHeadshot({"headFileKey": this.state.profile.fileKey}).then(() => {
            this.props.updateAuth().then(() => {
                this.close()
            });
        });
    }

    emptyProfileModel = () => {
        return {
            imageName: undefined,
            imagePath: undefined,
            fileKey: undefined
        }
    }

    handleClose = () => {
        this.setState({open: false});
        this.props.onRequestClose();
    };

    render() {
        return (
            <Modal
                show={this.state.open}
                onHide={this.close}
                bsSize="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title><p>上傳照片</p></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div>
                            {this.state.profile.imagePath === undefined ? <Image src={this.props.auth.profile.headPhoto} circle/> :
                            <Image src={this.state.profile.imagePath} circle/> }
                            <Document
                                auth={this.props.auth}
                                docType="image"
                                convertType="profile-image"
                                onUpload={this.handleUploadImage}
                                onFileUrl={this.handleChangeImage.bind(this, 'imagePath')}
                                displayTag="WebThumbnail"
                                btnName="上傳照片"
                            />{this.state.profile.imageName}
                            <span className="float-right">&nbsp;&nbsp;</span>
                            {/*<Button onClick={this.handleConfirmUpload.bind(this)} name="confirmUpload"*/}
                                    {/*type="sumbit">確認</Button>*/}
                            <Confirm
                                onConfirm={this.handleConfirmUpload.bind(this)}
                                body="您確定要上傳此照片嗎？"
                                confirmText="確定"
                                cancelText="取消"
                                title="上傳照片">
                                <Button>確定</Button>
                            </Confirm>
                        </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect(state => ({}), {...UploadAction, ...PageActions})(ProfilePicture)