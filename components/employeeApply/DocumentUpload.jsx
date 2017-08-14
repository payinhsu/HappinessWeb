import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Document from 'components/common/Document';
import Header from 'components/common/Header';
// import {browserHistory} from 'react-router';
// import Dialog from 'material-ui/lib/dialog';
// import Divider from 'material-ui/lib/divider';
// import FlatButton from 'material-ui/lib/flat-button';
import {Modal, Button, Image} from 'react-bootstrap';

export default class DocumentUpload extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			document : props.document || this.emptyDocumentModel(), 
			open : props.open, 
			auth: props.auth,
			replaceMain: {
				proofFileId: "",
				reason:""
			}
		}
	} 

	componentWillReceiveProps = newProps => {
        let nextState = {
            document : newProps.document || this.emptyDocumentModel(), 
			open : newProps.open, 
			auth: newProps.auth,
			replaceMain: {
				proofFileId: "",
				reason:""
			}
        };
        this.setState(nextState);
    };

	handleUploadImage = (fileKey, fileName) => {
		this.state.document.imageName = fileName
		this.state.replaceMain.proofFileId = fileKey;
		this.setState({replaceMain: this.state.replaceMain});
		this.setState({document: this.state.document});
		console.log('document upload > ' + fileName)
	}; 

	// 上傳並取得程課圖片後更新的 callback
	handleChangeImage = (field, url) => {
		this.state.document[field] = url;
		this.setState({document:this.state.document});
		console.log("robin document: " + JSON.stringify(this.state.document)) ;
	};

	handleChangeReplaceMain = (field, e) => {
        this.state.replaceMain[field] = e.target.value;
        this.setState({replaceMain:this.state.replaceMain});
    };

	emptyDocumentModel = () => {
		return {
			imageName: undefined,
			imagePath: undefined
		}	
	}; 

	toChangePInsure = () => {
        this.setState({open: false});
        this.props.toChangePInsure(this.state.replaceMain);
    };

    handleClose = () =>{
        this.setState({open: false});
        this.props.onRequestClose();
    };

	render() {
		// const actions = [
  //         <FlatButton
  //           label="取消"
  //           primary={true}
  //           onTouchTap={this.handleClose}
  //         />,
  //         <FlatButton
  //           label="確認"
  //           primary={true}
  //           keyboardFocused={true}
  //           onTouchTap={this.toChangePInsure}
  //         />,
  //       ];
		return(
			// <Dialog
   //            contentStyle={{width:'90%', maxWidth: 'none'}}
   //            title="轉換公司保障對象資料"
   //            actions={actions}
   //            modal={false}
   //            open={this.state.open}
   //            onRequestClose={this.handleClose}
   //            autoScrollBodyContent={true}
   //          >
   //          <Divider />
  			<Modal
            show={this.state.open}
            onHide={this.handleClose}
            bsSize="lg">
            <Modal.Header closeButton>
                <Modal.Title><p>完成自費保障對象終止</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
				<div id="documentUpload-view"className="btnBlock">
			 		<div style={{ width:'33%'}}>
			 			{this.state.document.imagePath === undefined ? <img src="/resource/unknownPerson.png" /> : <img src={this.state.document.imagePath}/>  }
					</div>
					<div style={{ width:'66%'}}>
						轉換原因 : <input type="text" 
									value={this.state.replaceMain.reason} 
									onChange={this.handleChangeReplaceMain.bind(this,'reason')}/>
						<span className="float-right">&nbsp;&nbsp;</span>
						<Document
		                    auth={this.state.auth}
		                    docType="image"
		                    convertType="document-image"
		                    onUpload={this.handleUploadImage}
		                    onFileUrl={this.handleChangeImage.bind(this, 'imagePath')}
		                    displayTag="WebThumbnail"
		                    btnName="上傳證明"
		                 />{this.state.document.imageName}
					</div>
				</div>
				<div>
					<button onClick={this.toChangePInsure}>確認</button>
				</div>
			</Modal.Body>
            </Modal>
			//</Dialog>
		);
	}
}