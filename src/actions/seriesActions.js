import firebase from 'firebase';

export const SET_SERIES = 'SET_SERIES';
const setSeries = series => ({
    type: SET_SERIES,
    series,
})

export const watchSeries = () => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        firebase.database()
            .ref(`/users/${currentUser.uid}/series`)
            .on('value', snapshot => dispatch(setSeries(snapshot.val())));
    }
}

export const deleteSerie  = serie => {
    const {currentUser} = firebase.auth();
    return async dispatch => {
        try {
            await firebase.database()
                .ref(`/users/${currentUser.uid}/series/${serie.id}`)
                .remove();
        } catch(e) {
            throw new Error('Desculpe, ocorreu um erro inesperado, por favor tente novamente mais tarde.')
        }
    }
}
