import { SET_SERIES } from './../actions';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SERIES:
            return action.series
        default:
            return state;
    }
}