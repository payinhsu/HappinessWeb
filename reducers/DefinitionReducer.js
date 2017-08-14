import _ from 'lodash';

export function definition(state = {customerDevelopers:[], businessManagers:[], banks:[], roles:[], cities:[], insurantRelationships:[], diseases:[], permissionGroups:[], careManagers:[]}, action) {
    switch(action.type) {
        case 'HAPPINESS_RECEIVE_DEFINITIONS':
          return Object.assign({}, state, action.definitions);
        case 'RECEIVE_PERMISSIONS':
            let newState = {permissionGroups:action.permissionGroups} 
            return Object.assign({}, state, newState);
        case 'RECEIVE_CARE_MANAGERS':
            let newState2 = {careManagers:action.careManagers} 
            return Object.assign({}, state, newState2);
        case 'RECEIVE_ROLES':
            let newState3 = {roles:action.roles}
            return Object.assign({}, state, newState3);
        case 'RECEIVE_BANKS':
            let newState4 = {banks:action.banks}
            return Object.assign({}, state, newState4);
        case 'RECEIVE_CARE_MANAGERS': 
            let newState5 = {businessManagers:action.businessManagers}
            return Object.assign({}, state, newState5);
        case 'RECEIVE_CUSTOMER_DEVELOPER': 
            let newState6 = {customerDevelopers:action.customerDevelopers}
            return Object.assign({}, state, newState6);
        case 'RECEIVE_CARE_MANAGER': 
            let newState7 = {careManager:action.careManager} 
            return Object.assign({}, state, newState7);
        case 'RECEIVE_CARE_GIVERS':
            let newState8 = {careGivers: action.careGivers}
            return Object.assign({}, state, newState8);
        case 'RECEIVE_CARE_GIVER':
            let newState9 = {careGiver: action.careGiver}
            return Object.assign({}, state, newState9);
        case 'RECEIVE_MEMBER_BY_PERMISSIONID':
            let newState10 = {members: action.members} ;
            return Object.assign({}, state, newState10);
        case 'HAPPINESS_RECEIVE_SKILLS':
            let newState11 = {skills: action.skills} ;
            return Object.assign({}, state, newState11);
        case 'HAPPINESS_RECEIVE_ABILITIES':
            let newState12 = {abilities: action.abilities} ;
            return Object.assign({}, state, newState12);
        default:
            return state;
    }
}

// export function permissionGroups(state = {}, action) {
//   switch(action.type) {
//     case 'RECEIVE_PERMISSIONS':
//       return action.permissionGroups;
//     // case 'RECEIVE_VIDEOS':
//     //   return videos(state.videos, action);
//     default:
//       return state;
//   }
// }