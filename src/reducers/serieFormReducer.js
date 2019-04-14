import { SET_FIELD, CLEAR_FIELD, SET_WHOLE_SERIE } from './../actions';

const INITIAL_STATE = {
    id: null,
    title: '',
    gender: '',
    rate: 0,
    img: '',
    description: '',
};       

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_FIELD:
            const newState = {...state};
            newState[action.field] = action.value;
            return newState;
        case SET_WHOLE_SERIE:
            return action.serie
        case CLEAR_FIELD:
            return INITIAL_STATE;
        default:
            return state;
    }
}