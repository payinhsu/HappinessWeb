import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Youtube from 'components/common/Youtube';
import Header from 'components/common/Header';
import api from 'api/HappinessAPI'; 

export default class YoutubePage extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			profile : props.profile || this.emptyProfileModel(),
			title : "Youtube測試",
			description: "我是描述"
		}
	} 

	handleUploadImage = (fileKey, fileName) => {
		this.state.profile.imageName = fileName
		this.setState({profile: this.state.profile});
		console.log('profile is changing new picture > ' + fileName)
	}; 

	// 上傳並取得程課圖片後更新的 callback
	handleChangeImage = (field, url) => {
		this.state.profile[field] = url;
		this.setState({profile:this.state.profile});
	}

	emptyProfileModel = () => {
		return {
			imageName: undefined,
			imagePath: undefined
		}	
	}

	toUpdateYouTubeInfoModel = (s3ObjectKeyOrYoutubeId, title, description, tags) => {
        let model = {
            "s3ObjectKeyOrYoutubeId": s3ObjectKeyOrYoutubeId, 
            "title":title,
            "description": description,
            "tags": tags
        }

        console.log("YouTubeInfo model : " + JSON.stringify(model)) ;
        return model;
    } ;

	updateYouTubeInfo = () => {
        var s3ObjectKeyOrYoutubeId = '9db71415-b58a-4314-9fca-07a7b355404c'
        var title = this.state.title
        var description =  this.state.description
        var tags = ["aaa","bbb"]
        console.log("updateYouTubeInfo >>>> " + s3ObjectKeyOrYoutubeId) ;

        let model = this.toUpdateYouTubeInfoModel(s3ObjectKeyOrYoutubeId, title, description, tags) ;
        new api(this.props.auth).updateYouTubeInfo(s3ObjectKeyOrYoutubeId, model) ;
    };

    changeYoutubeInfo(field, e){
        
        if(field == "title") {
            this.state.title = e.target.value;
        }
        if(field == "description") {
            this.state.description = e.target.value;
        }
        this.setState({title:this.state.title, description:this.state.description});
        //console.log(JSON.stringify(this.state.profile));
    };

	render() {
		return(
			<div id="profilePicture-view"className="btnBlock">
		 		<Header/>
		 		<div style={{float:'left', width:'33%'}}>
		 			{this.state.profile.imagePath !==  ''? <img src="/resource/unknownPerson.png" /> : <img src={this.state.profile.imagePath}/> }
				</div>
				<div style={{float:'left', width:'33%'}}>
					<Youtube
	                    auth={this.props.auth}
	                    docType="image"
	                    convertType="profile-image"
	                    onUpload={this.handleUploadImage}
	                    onFileUrl={this.handleChangeImage.bind(this, 'imagePath')}
	                    displayTag="WebThumbnail"
	                    btnName="上傳影片"
	                 />{this.state.profile.imageName}

               		<span className="float-right">&nbsp;&nbsp;</span>
					<button className="btn-orange float-right" onClick={this.updateYouTubeInfo} name="confirmUpdate" type="sumbit">更新youtube資料</button>

		            <label>影片title</label>
		                <input disabled={false} type="text" style={{width:480+"px",maxLength:80}} 
		                            value={this.state.title}
		                            onChange={this.changeYoutubeInfo.bind(this, 'title')}/>
		               	
		             <label>影片描述</label>
		                <input disabled={false} type="text" style={{width:480+"px",maxLength:80}} 
		                            value={this.state.description}
		                            onChange={this.changeYoutubeInfo.bind(this, 'description')}/>
				</div>
			</div>
		);
	}
}