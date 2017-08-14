import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import api from 'api/HappinessAPI';

var config = require('config');
var https = require('https')

export default class Youtube extends React.Component {

  //static DOCAPI_URL = config.document.apiUrl;
  //static DOC_UPLOAD_URL = config.document.uploadUrl;

  // static DOCAPI_URL = 'http://docapi-staging-api-1712535865.us-west-2.elb.amazonaws.com/docapi/v0';
  // static DOC_UPLOAD_URL = 'http://docapi-staging-originbucket-1s73tnifzf5z3.s3.amazonaws.com/';      // S3 URL

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
    //convertType: React.PropTypes.string.isRequired,       // 就像是銀髮的 extraNo
    onUpload: React.PropTypes.function,                 // callback: function(fileId)              - 上傳成功後的 callback
    onFileUrl: React.PropTypes.function,                // callback: function(fileId, filePath)    - 如果沒有這個 callback 就不會取 fileUrl
    displayTag: React.PropTypes.string,                 // 如果有設 onFileUrl 就要指定這個值         - 當該 tag 被轉檔完成後, onFileUrl 就會被執行.
    //docType: React.PropTypes.string.required,           // image, doc, video (option)
    btnName: React.PropTypes.string
  };

  static docTypes = {
    image: {
      accept: 'image/*',
      btnName: '選取圖片'
    },
    doc: {
      accept: 'application/x-jpg,application/x-png,application/msword,application/msword,application/vnd.ms-powerpoint,application/x-ppt,application/x-ppt,application/vnd.ms-excel,application/x-xls',
      btnName: '選取文件'
    },
    video: {
      accept: 'video/*',
      btnName: '選取影片'
    },
    refundImage: {
      accept: 'image/pjpeg,image/jpeg,image/bmp,image/gif,image/x-png,image/png',
      btnName: '選取圖片'
    },
    refundDoc: {
      accept: 'application/pdf',
      btnName: '選取文件'
    }
  }

  // constructor(props) { .. }

  handleChangeFile = e => {
    console.log(e)
    console.log(e.target.value)
    console.log('current file > ' + e.target.files[0].name);
    var file = e.target.files[0];
    var contentType = file.type;
    contentType = contentType.replace(/"/g, '');

    var sigReqParam = {
      fileName: file.name,
      fileType: file.type,
      //memberId: this.props.auth.memberId
    }

    console.log("accessToken: " + this.props.auth.accessToken)
    console.log("memberId: " + this.props.auth.memberId)
    //new api(this.props.auth).getSignature(sigReqParam).then(this.signatureComplete(contentType, file), this.errorLogger).catch(this.errorLogger);
    //var url = new api(this.props.auth).s3presignedurl().then(this.test(resolve), this.errorLogger).catch(this.errorLogger);
    var url = new api(this.props.auth).s3presignedurl().then(function( val ) {
          console.log("s3presignedurlReturn: " + JSON.stringify(val))
          console.log("s3presignedurl: " + val.S3PreSignedUrl)
          console.log("objectKey: " + val.objectKey)
          console.log(file)

          return new Promise(function(resolve, reject) {

              var request = new XMLHttpRequest();
              request.open('PUT', val.S3PreSignedUrl, true);
              request.setRequestHeader('Content-Type', 'binary/octet-stream')
              request.setRequestHeader('Access-Control-Allow-Origin', '*');
              request.setRequestHeader('Content-Disposition', 'attachment; filename='+file.name);
              
              request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                  resolve();
                  //if(val) val(val.objectKey, file.name);            callback( fileId, fileName)
                } else {
                  console.error('upload failed:', request);
                  reject();
                }
              };
              request.onerror = () => {
                console.error('upload failed:', request);
                reject();
              };
              request.send(file);
          });
          //curl -v -H "Content-Disposition: attachment; filename=IMG_0699.m4v" -T "/Users/andyhsu/IMG_0699.m4v" "https://104careu-youtube-usertemp-dev.s3.amazonaws.com/9db71415-b58a-4314-9fca-07a7b355404c?AWSAccessKeyId=AKIAIO2YW3CQHCTFB6TA&Expires=1478537473&Signature=POakgAQt2eNW9iQeFFPnZQsJ09U%3D"
    });
    
    // this.signature(signatureRequest).then(this.signatureComplete(contentType, file), this.errorLogger).catch(this.errorLogger);
  };

  // signature(data) {
  //   var url = Document.DOCAPI_URL + '/signature';
  //   return this.sendRequest(url, data);
  // };

  test(contentType) {
    console.log(contentType)
  }

  signatureComplete(contentType, file) {
    return function(signature) {
      console.log('signagure > ' + JSON.stringify(signature.objectKey));
      var s = signature.objectKey.split('/');
      var fileId = signature.fileId;
      var fileName = s[s.length-1];
      // return this.uploadFlite(fileId, file, contentType, signature, this.props.onUpload)
      //   .then(this.getFileUrl(fileId, contentType, this.props.onFileUrl), this.errorLogger).catch(this.errorLogger);

      var upload = this.uploadFile(fileId, fileName, file, contentType, signature, this.props.onUpload);
      if(this.props.onFileUrl){
        return upload.then(this.getFileUrl(fileId, [this.props.displayTag]), this.errorLogger).catch(this.errorLogger);
      }
      else{
        return upload.catch(this.errorLogger);
      }
    }.bind(this);
  }

  getFileUrl(fileId, tags) {
    console.log(JSON.stringify(tags))
    new api(this.props.auth)
    .getFileUrl(fileId, tags)
    .then((resp) => {
      const tag = resp.tags.find(tag => tag.name === this.props.displayTag);
      if(tag.status === 'pending'){
        setTimeout(this.getFileUrl.bind(this, fileId, tags), 1000);
      }
      else{
        this.props.onFileUrl(tag.url);
      }
    })
    .catch(this.errorLogger);
  }

  errorLogger() {
    console.error(arguments);
  };

  handleBtnClick = (e) => {
    e.preventDefault();
    console.log('trigger click file');
    this.refs.file.click();
  }

  render() {

    console.log('accept: ' + Youtube.docTypes[this.props.docType].accept);
    return (
      <span>
        <button className="btn-orange float-right" type="button" onClick={this.handleBtnClick}>{this.props.btnName !== undefined ? this.props.btnName : Youtube.docTypes[this.props.docType].btnName}</button>
        <input className="hidden" ref="file" type="file" accept={Youtube.docTypes[this.props.docType].accept} onChange={this.handleChangeFile} />
      </span>
    );
  }
}