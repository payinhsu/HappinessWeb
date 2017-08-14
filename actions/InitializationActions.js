/**
 * Created by steven.fanchiang on 14/12/2016.
 */
import api from 'api/HappinessAPI';

export function initApplyCareManager() {
    return (dispatch, getState) => {
        let caller = new api(getState().auth);

        return Promise.all([caller.getDefinitions(), caller.getDefinitionApi(`/definition/skills`), caller.getDefinitionApi(`/definition/abilities`)]).then((values) => {
            let result = {
                type: 'INIT_APPLY_CARE_MANAGER',
                applyCareManager: {
                    cities: values[0].cities,
                    skills: values[1].skills,
                    abilities: values[2].abilities
                }
            };
            return result;
        }).then((r) => dispatch(r));
    }
}
