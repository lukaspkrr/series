import firebase from 'firebase';

export const SET_WHOLE_SERIE = 'SET_WHOLE_SERIE';
export const setWholeSerie = serie => ({
    type: SET_WHOLE_SERIE,
    serie,
});

export const SET_FIELD = 'SET_FIELD';
export const setField = (field, value) => ({
    type: SET_FIELD,
    field,
    value,
});

export const CLEAR_FIELD = 'CLEAR_FIELD';
export const clearField = () => ({
    type: CLEAR_FIELD
});

export const saveSerie  = serie => {
    const {currentUser} = firebase.auth();
    const db = firebase.database();
    return async dispatch => {
        if (serie.id) {
            await db.ref(`/users/${currentUser.uid}/series/${serie.id}`)
                .set(serie);
        } else {
            await db.ref(`/users/${currentUser.uid}/series`)
                .push(serie);
        }
        dispatch(clearField());
    }
}
