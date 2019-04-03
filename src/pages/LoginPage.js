import React from 'react';
import { 
            View, 
            Text,
            ImageBackground,
            TextInput, 
            StyleSheet, 
            Image, 
            Button, 
            ActivityIndicator, 
            Alert, 
            Keyboard,
            Modal 
        } from 'react-native';
import firebase from 'firebase';

import { firebaseConfig } from './../utils/firebaseConfig';

import { connect } from 'react-redux';

import { tryLogin, tryRegisterUser } from './../actions/userActions';

import FormRow from '../components/FormRow';

class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            password: '',
            registerEmail: '',
            registerPassword: '',
            isLoading: false,
            newUserModal: false,
        };
    }

    componentDidMount() {
        firebase.initializeApp(firebaseConfig);
    }

    OnChangeHandler(key, value) {
        this.setState({ [key]: value} );
    }

    runLoading() { this.setState({ isLoading: true }); };
    stopLoading() { this.setState({ isLoading: false }); }

    tryLogin() {
        Keyboard.dismiss();
        this.runLoading();
        const { mail: email, password } = this.state;

        this.props.tryLogin({ email, password })
        .then(() => this.props.navigation.replace('Main'))
        .catch(error => {
            Alert.alert( 'Ops!', this.getMessageByErrorCode(error.code), [{text: 'OK', style: 'cancel'}], { cancelable: false });
            this.stopLoading();
        });
    }

    tryRegisterUser() {
        Keyboard.dismiss();
        this.runLoading();
        this.setState({ newUserModal: false });
        const { registerEmail: email, registerPassword: password } = this.state;

        this.props.tryRegisterUser({ email, password })
        .then(() => this.props.navigation.replace('Main'))
        .catch(error => {
            Alert.alert( 'Ops!', this.getMessageByErrorCode(error.code), [{text: 'OK', style: 'cancel', onPress: () => this.showRegisterModal()}], { cancelable: false });
            this.stopLoading();
        });
    }

    getMessageByErrorCode = errorCode => {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Senha incorreta.'
    
            case 'auth/user-not-found':
                return 'O email utilizado ainda não possui uma conta no aplicativo.'
    
            case 'auth/email-already-in-use':
                return 'Já existe uma conta cadastrada com este email.'
    
            case 'auth/invalid-email':
            return 'Este email é inválido.'
    
            case 'auth/weak-password':
                return 'A senha precisa ter no mínimo 6 caracteres.'
    
            case 'auth/user-disabled':
                return 'Este usuário foi desativado.'
                
            default:
             return 'Ocorreu um erro, por favor tente novamente, caso o ero persista, entre em contato com os desenvolvedores do aplicativo.'
        }
    }

    loader() {
        if (this.state.isLoading) 
        return <View style={styles.loader}>
        <ActivityIndicator
        size='large'
        color='#DB202C' />
        </View>
    }

    showRegisterModal() {
        this.setState({newUserModal: true});
    }

    hideRegisterModal() {
        this.setState({newUserModal: false});
    }

    render() {
        return (
            <ImageBackground source={require('./../../assets/banner.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
            { this.loader() }
            <View style={styles.formContainer}>
            <Image style={styles.copyimage} source={require('./../../assets/copyflix.png')} />
                <View style={styles.form}>
                    <FormRow>
                        <TextInput style={styles.input} 
                        value={this.state.mail}
                        onChangeText={value => this.OnChangeHandler('mail', value)}
                        placeholder='Email'
                        keyboardType='email-address'
                        autoCapitalize='none' />
                    </FormRow>
                    <FormRow>
                        <TextInput style={styles.input}
                        value={this.state.password}
                        onChangeText={value => this.OnChangeHandler('password', value)}
                        placeholder='Senha'
                        secureTextEntry />
                    </FormRow>
                    <Button
                    color='#DB202C'
                    title='Entrar'
                    onPress={() => this.tryLogin()} />
                    <Text style={styles.text}>──────────────── OU ────────────────</Text>
                    <Button
                    color='#DB202C'
                    title='Cadastrar'
                    onPress={() => this.showRegisterModal()} /> 
                </View>
            </View>
            {/* Modal */}
                <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={ this.state.newUserModal }
                    onRequestClose={() => {
                        this.hideRegisterModal()
                    }}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalFormContainer}>
                                <Text style={styles.registreTitle}>Cadastro</Text>
                                <FormRow>
                                    <TextInput style={styles.input}
                                    value={this.state.registerEmail}
                                    onChangeText={value => this.OnChangeHandler('registerEmail', value)}
                                    placeholder='Email' />
                                </FormRow>
                                <FormRow>
                                    <TextInput style={styles.input}
                                    value={this.state.registerPassword}
                                    onChangeText={value => this.OnChangeHandler('registerPassword', value)}
                                    placeholder='Senha'
                                    secureTextEntry />
                                </FormRow>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                                    <Button
                                    color='#000'
                                    title='Cancelar'
                                    onPress={() => this.hideRegisterModal()} />
                                    <Button
                                    color='#DB202C'
                                    title='Cadastrar'
                                    onPress={() => this.tryRegisterUser()} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>   
            {/* Modal */}
            </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    input: {
        padding: 5,
        backgroundColor: '#333',
        marginBottom: 20,
        borderRadius: 4,
        elevation: 1,
        color: '#fff'
    },
    copyimage: {
        aspectRatio: 3,
        alignSelf: 'center',
        marginTop: 100,
        marginBottom: 50,
    },
    form: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        marginTop: 30,
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 10,
        paddingLeft: 10,
    },
    text: {
        color: '#fff',
        alignSelf: 'center',
        margin: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        position : 'absolute', 
        top : 0, 
        left : 0, 
        right : 0,
        bottom : 0,
        zIndex: 2,
        backgroundColor: 'rgba(0, 0, 0 ,0.8)',
    },
    formContainer: {
        zIndex: 1
    },
    registreTitle: {
        fontSize: 50,
        color: '#DB202C',
        marginBottom: 30,
        alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0 ,0.5)',
        paddingRight: 10,
        paddingLeft: 10,
    },
    modalFormContainer: {
        backgroundColor: '#fff', 
        padding: 15,
        borderRadius: 5
    },
})

export default connect(null, { 
    tryLogin,
    tryRegisterUser
})(LoginScreen)