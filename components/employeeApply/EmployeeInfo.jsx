import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import api from 'api/HappinessAPI';

// company main insurant
export default class EmployeeInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          definition: props.definition, 
          auth: props.auth
        };
    }

	componentDidMount() {
  	};

    changeEmployee(field, e){
        //console.log(e.target.value) ;
        this.state.auth.employee[field] = e.target.value;
        this.setState({employee:this.state.auth.employee});
        //console.log(JSON.stringify(this.state.employee));
    };

    changeProfile(field, e){
        //console.log(e.target.value) ;
        this.state.auth.profile[field] = e.target.value;
        this.setState({profile:this.state.auth.profile});
        //console.log(JSON.stringify(this.state.profile));
    };

    changeProfileAddr(field, e){
        //console.log(e.target.value) ;
        this.state.auth.profile.address[field] = e.target.value;
        if(field == "cityId") {
            this.state.auth.profile.address.cityName = this.props.definition.cities.find(c => c.id === e.target.value).name ;
        }
        if(field == "zipId") {
            this.state.auth.profile.address.zipName = this.props.definition.cities.find(c => c.id === this.state.auth.profile.address.cityId).zips.find(z => z.id === e.target.value).name ;
        }
        this.setState({profile:this.state.auth.profile});
        //console.log(JSON.stringify(this.state.profile));
    };

    changeProfileRAddr(field, e){
        
        this.state.auth.profile.residenceAddress[field] = e.target.value;
        if(field == "cityId") {
            this.state.auth.profile.residenceAddress.cityName = this.props.definition.cities.find(c => c.id === e.target.value).name ;
        }
        if(field == "zipId") {
            this.state.auth.profile.residenceAddress.zipName = this.props.definition.cities.find(c => c.id === this.state.auth.profile.residenceAddress.cityId).zips.find(z => z.id === e.target.value).name ;
        }
        this.setState({profile:this.state.profile});
        //console.log(JSON.stringify(this.state.profile));
    };

    toUpdateEmployeeApiModel = (auth) => {
        let model = {
            "companyTel": auth.employee.companyTel, 
            "companyTelExt": auth.employee.companyTelExt,
            "cellphone": auth.profile.cellphone,
            "tel": auth.profile.tel,
            "email": auth.profile.email, 
            "address" : {
                "cityId": auth.profile.address.cityId,
                "zipId": auth.profile.address.zipId,
                "address": auth.profile.address.address
            },               
            "residenceAddress":{
                "cityId": auth.profile.residenceAddress.cityId,
                "zipId": auth.profile.residenceAddress.zipId,
                "address": auth.profile.residenceAddress.address
            },                      
            "accessToken": auth.accessToken 
        }

        console.log("robin model : " + JSON.stringify(model)) ;
        return model;
    } ;

    updateEmployee = (memberId) => {
        let model = this.toUpdateEmployeeApiModel(this.state.auth) ;
        this.props.onCommit(memberId, model) ;
        // new api(this.state.auth).updateEmployee(memberId, model) ;
    };

	render() {
		//const { employee, profile, definition, changeEmployee, changeProfile, changeProfileAddr, changeProfileRAddr} = this.props;
                                  
        return (
		<div className="box">
            <tag>
                <table>
                    <tbody key={"static_service_1"}>
                        <tr>
                            <th>員工編號</th>
                            <td>{this.state.auth.employee.id}</td>
                            <th>員工姓名</th>
                            <td>{this.state.auth.profile.name}</td>
                            <th>性別</th>
                            <td>{this.state.auth.profile.sex === "1" ? "男" : "女"}</td>
                        </tr>
                        <tr>
                            <th>公司電話(O)</th>
                            <td style={{textAlign:"left"}}>
                                <input type="number" value={this.state.auth.employee.companyTel} 
                                    onChange={this.changeEmployee.bind(this, 'companyTel')}/>
                            </td>
                            <th>分機</th>
                            <td colSpan="3" style={{textAlign:"left"}}>
                                <input type="number" value={this.state.auth.employee.companyTelExt} 
                                    onChange={this.changeEmployee.bind(this, 'companyTelExt')}/>
                            </td>
                        </tr>
                        <tr> 
                            <th>通訊電話(H)</th>
                            <td style={{textAlign:"left"}}>
                                <input type="number" value={this.state.auth.profile.tel} 
                                        onChange={this.changeProfile.bind(this, 'tel')}/>
                            </td>
                            <th>聯繫電話(手機)</th>
                            <td colSpan="3" style={{textAlign:"left"}}>
                                <input type="number" value={this.state.auth.profile.cellphone} 
                                    onChange={this.changeProfile.bind(this, 'cellphone')}/>
                            </td>                             
                        </tr> 
                        <tr>           
                            <th>電子信箱</th>
                            <td colSpan="5" style={{textAlign:"left"}}>
                                {1!==1?<input type="email" value={this.state.auth.profile.email} 
                                    onChange={this.changeProfile.bind(this, 'email')}/>

                                :this.state.auth.profile.email.address}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select value={this.state.auth.profile.address.cityId} 
                                  onChange={this.changeProfileAddr.bind(this, 'cityId')}>
                                    <option value=""></option>
                                    {this.state.definition.cities.map((city,index) => {
                                        return (
                                            <option key={`city0_${index}`} value={city.id}>{city.name}</option>
                                        )
                                    })}
                                </select>
                        
                                <select value={this.state.auth.profile.address.zipId} 
                                  onChange={this.changeProfileAddr.bind(this, 'zipId')}>
                                    <option value=""></option>
                                    {this.state.definition.cities.find( c => c.id === this.state.auth.profile.address.cityId).zips.filter(z => z.id != this.state.auth.profile.address.cityId).map((zip,index) => {
                                        return (
                                            <option key={`zip0_${index}`} value={zip.id}>
                                                {zip.name.length > 3 ? zip.name.substring(3) : zip.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </td>
                            <th>通訊地址</th>
                            <td colSpan="4"style={{textAlign:"left"}}>
                                <input disabled={false} type="text" style={{width:480+"px",maxLength:80}} 
                                    value={this.state.auth.profile.address.address} 
                                    onChange={this.changeProfileAddr.bind(this, 'address')}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select value={this.state.auth.profile.residenceAddress.cityId} 
                                  onChange={this.changeProfileRAddr.bind(this, 'cityId')}>
                                    <option value=""></option>
                                    {this.state.definition.cities.map( (city, index) => {
                                        return (
                                            <option key={`city_${index}`} value={city.id}>{city.name}</option>
                                        )
                                    })}
                                </select>
                                               
                                <select value={this.state.auth.profile.residenceAddress.zipId} 
                                  onChange={this.changeProfileRAddr.bind(this, 'zipId')}>
                                    <option value=""></option>
                                    {this.state.definition.cities.find( c => c.id === this.state.auth.profile.residenceAddress.cityId).zips.filter(z => z.id != this.state.auth.profile.residenceAddress.cityId).map( (zip, index) => {
                                        return (
                                            <option key={`zip_${index}`} value={zip.id}>
                                                {zip.name.length > 3 ? zip.name.substring(3) : zip.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </td>
                            <th>戶籍地址</th>
                            <td colSpan="4" style={{textAlign:"left"}}>
                                <input type="text" style={{width:480+"px",maxLength:80}} 
                                    value={this.state.auth.profile.residenceAddress.address} 
                                    onChange={this.changeProfileRAddr.bind(this, 'address')}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6">
                                <input type="checkbox" value="" id={`disability_1`}
                                    name={"test"}
                                    defaultChecked={false}/>
                                <a href="javascript:void(0);" 
                                   onClick={this.props.openServiceStatute}>
                                    我同意個人及保障對象個資、服務規約使用
                                </a>
                            </td>         
                        </tr>
                    </tbody>
                </table>
                <a href="javascript:void(0);" 
                    onClick={this.updateEmployee.bind(this,this.state.auth.id)}
                    className="btn-default btn-lightCoral float-right">
                   更新
                </a>
            </tag>
        </div>
        );
	}
}

