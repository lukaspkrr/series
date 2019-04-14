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
            Modal ,
            TouchableOpacity
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
        color='#F95D6A' />
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
            <ImageBackground source={require('./../../assets/back.png')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
            { this.loader() }
            <View style={styles.formContainer}>
            <Image style={styles.copyimage} source={require('./../../assets/icon.png')} />
                <View style={styles.form}>
                    <FormRow>
                        <TextInput style={styles.input} 
                        selectionColor={'#F95D6A'}
                        value={this.state.mail}
                        onChangeText={value => this.OnChangeHandler('mail', value)}
                        placeholder='Email'
                        keyboardType='email-address'
                        autoCapitalize='none' />
                    </FormRow>
                    <FormRow>
                        <TextInput style={styles.input}
                        selectionColor={'#F95D6A'}
                        value={this.state.password}
                        onChangeText={value => this.OnChangeHandler('password', value)}
                        placeholder='Senha'
                        secureTextEntry />
                    </FormRow>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.tryLogin()}
                    >
                    <Text style={styles.textButton}> Entrar </Text>
                    </TouchableOpacity> 
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
                                    color='#262626'
                                    title='Cancelar'
                                    onPress={() => this.hideRegisterModal()} />
                                    <Button
                                    color='#F95D6A'
                                    title='Cadastrar'
                                    onPress={() => this.tryRegisterUser()} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>   
            {/* Modal */}
            </View>
            <View style={styles.footerButtons}>
                    <TouchableOpacity onPress={() => this.showRegisterModal()}><Text style={styles.footerButtonsText}>Não possuo conta</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.footerButtonsText}>Ajuda</Text></TouchableOpacity>
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
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
        backgroundColor: 'rgba(255, 255, 255, .8)',
        color: '#262626',
        padding: 10,
        borderWidth: .5,
        borderColor: '#262626',
        borderRadius: 50,
        elevation: 1,
    },
    copyimage: {
        aspectRatio: 1,
        alignSelf: 'center',
        marginTop: 50,
        height: 200,
        borderRadius: 100,
    },
    form: {
        marginTop: 30,
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 10,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#F95D6A',
        padding: 10,
        borderRadius: 50,
        elevation: 1,
    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
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
        color: '#262626',
        marginBottom: 30,
        alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0 ,0.8)',
    },
    modalFormContainer: {
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#fff', 
        padding: 15,
        borderRadius: 5,
    },
    footerButtons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        position: 'absolute',
        padding: 10,
        bottom: 5,
    },
    footerButtonsText: {
        textDecorationLine: 'underline',
        color: 'rgba(38, 38, 38, .5)',
    }
})

export default connect(null, { 
    tryLogin,
    tryRegisterUser
})(LoginScreen)