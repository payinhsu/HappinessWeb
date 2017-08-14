import {admins, mapUrlToPermission} from 'mapping';
var config = require('config');

function hasPermission(authData, path) {
    let neededPermissions = mapUrlToPermission;
    let authPermissions = authData.permissionIds;
    for (let key in neededPermissions) {
        //定義的mapping url只有一組
        if (typeof(neededPermissions[key]["url"]) === 'string' && neededPermissions[key]["url"] === path) {
            if (neededPermissions[key]["permissionId"].length === 0) {
                return false;
            } else {
                for (let i = 0; i < authPermissions.length; i++) {
                    for (let j = 0; j < neededPermissions[key]["permissionId"].length; j++) {
                        if (authPermissions[i].indexOf(neededPermissions[key]["permissionId"][j]) > -1) {
                            return true;
                        }
                    }
                }
            }
            //定義的mapping url有多組且存成陣列
        } else if (typeof(neededPermissions[key]["url"]) === 'object') {
            for (let key2 in neededPermissions[key]["url"]) {
                if (neededPermissions[key]["url"][key2] === path) {
                    if (neededPermissions[key]["permissionId"].length === 0) {
                        return false;
                    } else {
                        for (let i = 0; i < authPermissions.length; i++) {
                            for (let j = 0; j < neededPermissions[key]["permissionId"].length; j++) {
                                if (authPermissions[i].indexOf(neededPermissions[key]["permissionId"][j]) > -1) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
};

export function requireAuth(store) {
    return (nextState, replace) => {
        const auth = store.getState().auth;
        if (!auth || !auth.id) {
            replace({
                pathname: `${config.webContext}login`,
                state: {nextPathname: nextState.location.pathname},
                query: {from: 'portalWeb'}
            });
            return false;
        }
        /** url檢測權限 */
        // const homePath = ["/","login","loginPage","wellcome"];
        // let pathName = nextState.location.pathname;
        // if(!homePath.includes(pathName) && !hasPermission(auth,pathName)){
        //   replace({
        //     pathname: config.webContext,
        //     state: {nextPathname: nextState.location.pathname},
        //     query: {}
        //   });
        //   return false;
        // }
        return true;
    }
}