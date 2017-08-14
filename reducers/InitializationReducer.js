/**
 * Created by steven.fanchiang on 14/12/2016.
 */

const initState = {
    'skills': [],
    'abilities': []
};

export function initialization(state = initState, action) {
    switch (action.type) {
        case 'INIT_APPLY_CARE_MANAGER':
            return Object.assign({}, state, action.applyCareManager);
        default:
            return state;
    }
}
