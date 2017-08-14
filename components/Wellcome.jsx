import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import NavBar from './NavBar';
import {admins} from 'mapping';
import config from 'config';
import * as PageActions from 'actions/PageActions';
import {browserHistory} from 'react-router';
import Header from 'components/common/Header';

export default class Wellcome extends React.Component {

  constructor(props) {
      super(props);
      console.log(props);
      this.state = {
          videos: props.page.index.vedios,
          knowledges: props.page.index.knowledges,
          givers: props.page.index.givers,
          test: new Date().toISOString()
      };
      console.log("datapicker test : " + this.state.test) ;
  }

  static propTypes = {
    children: PropTypes.object
  };

  links = (props) => {
    if(props.auth.returnCode == '000') {
      return (
        []
      )
    }
    else {
      return (
        [
          {url:`/loginPage`, text:'登入'}
        ] 
      )    
    }
  }; 


  static onEnter(store){
    return (nextState, replace, callback) => {
        PageActions.getPageIndex()(store.dispatch, store.getState).then(() => {
            PageActions.getYouTubeInfo("9db71415-b58a-4314-9fca-07a7b355404c")(store.dispatch, store.getState).then(()=> callback());
        });
    }
  }
  
  // <div dangerouslySetInnerHTML={{__html:this.props.page.youtube.iFrameCode }} />
  generateMainVideo = () => {
      return (
          <div style={{float:'left', width:'99%'}}>
              Main Video
              <iframe width="99%" height="315px"
                  src={`https://www.youtube.com/embed/${this.props.page.youtube.videoId}`}>
              </iframe>
              
          </div>
      )
  } ;

  generateSubVideo = () => {
      return (
          <div>
              <br/><div><button className="button-h">服務實例</button></div>
              <div className="subDiv" style={{float:'left', width:'33%'}}> sub vidio1 
                  <iframe width="99%" height="315px"
                      src="https://www.youtube.com/embed/Div0iP65aZo">
                  </iframe>
              </div>
              <div className="subDiv" style={{float:'left', width:'33%'}}> sub vidio2 
                  <iframe width="99%" height="315px"
                      src="https://www.youtube.com/embed/uQ78IqAYpsc">
                  </iframe>
              </div>
              <div className="subDiv" style={{float:'left', width:'33%'}}> sub vidio3 
                  <iframe width="99%" height="315px"
                      src="https://www.youtube.com/embed/CY8LD9er7lE">
                  </iframe>
              </div>
          </div>
      )
  } ;

  generateknowledges = () => {
      // console.log(this.state.knowledges.length) ;
      return (
          <div>
              <br/><div><button className="button-h">住院常識</button></div>
              {this.state.knowledges.slice(0, 3).map( (knowledge,index) => (
                  <div className="subDiv" style={{float:'left', width:'33%', height:'315px'}}> 
                    {knowledge.id}. {knowledge.title}<br/>{knowledge.contentTop} <br/>
                    <img src={`../resource/photo${index+7}.png`}/>
                  </div>
              ))}
          </div>
      )
  } ;

  toRefIns = () => {
      browserHistory.push('/admin/refIns');
  } ;
  handleChange = (value) => {
      this.setState({test: value}) ;
      console.log("change : " + this.state.test ) ;
  };
  render() {
    console.log("datapicker test : " + this.state.test) ;
    let permissions = (this.props.auth.permission && this.props.auth.permission.length) ? this.props.auth.permission : [];
    let roles =  (this.props.auth.roles && this.props.auth.roles.length) ? this.props.auth.roles : [];
    // let isPortalAdmin = roles.find(r => r === "PORTAL_ADMIN");
    let isPortalCareManager = roles.find(r => r === "PORTAL_CARE_MANAGER");
    let isWebViewPortal = permissions.find(p => p.id === "WEB_VIEW_PORTAL");
    // let isWebViewMaster = permissions.find(p => p.id === "WEB_VIEW_MASTER");

    let masterStyle = {};
    // 這裡的邏輯待角色權限導入後需要進行修改.
    if(isPortalCareManager && isWebViewPortal){
      masterStyle.display = 'none';     // CM 不可見 Master
    }
    let links = this.links(this.props)
    console.log("Robin test  : " + JSON.stringify(this.props.auth)) ;
    return (
      <div id="index" >
        
        <NavBar links={links} />
        <Header auth={this.props.auth}/>
        <div>====================    首頁內容    ====================</div>
        {this.generateMainVideo()}
        <br/>
        {this.generateSubVideo()}
        <br/>
        {this.generateknowledges()}
        <div>
            <br/><div><button className="button-h">服務內容</button></div>
            <div className="subDiv" style={{float:'left', width:'33%', height:'350px',backgroundImage:'url(../resource/photo1.png)', backgroundRepeat: 'no-repeat'}} />
            <div className="subDiv" style={{float:'left', width:'33%', height:'350px',backgroundImage:'url(../resource/photo2.png)', backgroundRepeat: 'no-repeat'}} />
            <div className="subDiv" style={{float:'left', width:'33%', height:'350px',backgroundImage:'url(../resource/photo3.png)', backgroundRepeat: 'no-repeat'}} />
            <div className="subDiv" style={{float:'left', width:'33%', height:'350px',backgroundImage:'url(../resource/photo4.png)', backgroundRepeat: 'no-repeat'}} /> 
            <div className="subDiv" onClick={this.toRefIns} style={{float:'left', width:'33%', height:'350px',backgroundImage:'url(../resource/photo5.png)', backgroundRepeat: 'no-repeat'}} /> 
            <div className="subDiv" style={{float:'left', width:'33%', height:'350px', backgroundImage:'url(../resource/photo6.png)'}} /> 
        </div>
      </div>
    );

    //<p className="text-center">({this.props.auth ? ' 您好, ' + this.props.auth.firstName : ' 未登入'})</p>
  }
}

