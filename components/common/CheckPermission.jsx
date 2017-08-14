import React from 'react';

export default class CheckPermission extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            permissions : props.permissions, //auth內取得的角色權限
            showForWhichPermission : props.showForWhichPermission ? props.showForWhichPermission : "" //若有訪問第二層子元件需要的權限
        };
    }

    getPermissions = () => {
        if(this.state.permissions)
            return this.state.permissions;
        else
            [];
    };

    hasPermission = () => {
        let includePermission = false;
        let neededPermissions = this.props.permission; //訪問子元件所需的權限
        for(let i=0;i<this.getPermissions().length;i++){
            for(let j=0;j<neededPermissions["permissionId"].length;j++){
                if(this.getPermissions()[i] === neededPermissions["permissionId"][j]){
                    if(this.state.showForWhichPermission.length > 0 && (neededPermissions["permissionId"][j] === this.state.showForWhichPermission)){
                        includePermission = true;
                        break;
                    }else if(this.state.showForWhichPermission.length == 0){
                        includePermission = true;
                        break;
                    }
                }
            }
        }
        return includePermission;
    };

    render() {
        if(this.hasPermission()) {
            return (this.props.children);
        }else
            return <span></span>
    }
}