import firebase from 'firebase';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = user => ({
    type: USER_LOGIN_SUCCESS,
    user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT
});

export const tryLogin = ({ email, password }) => dispatch => {
    return firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
            const action = userLoginSuccess(res.user);
            dispatch(action);
        })
}

export const tryRegisterUser = ({ email, password }) => dispatch => {
    return firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            const action = userLoginSuccess(res.user);
            dispatch(action);
        })
}