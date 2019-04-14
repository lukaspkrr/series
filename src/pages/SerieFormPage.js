import React from 'react';
import { View, 
        Text, 
        TextInput, 
        StyleSheet, 
        Picker, 
        Slider,
        ScrollView, 
        KeyboardAvoidingView, 
        ActivityIndicator, 
        Alert,
        TouchableOpacity,
        Image,
        LayoutAnimation, 
    } from 'react-native';

import { connect } from 'react-redux';
import { setField, saveSerie, setWholeSerie, clearField } from './../actions';

import FormRow from '../components/FormRow';

import { Ionicons } from '@expo/vector-icons';
import { Permissions, ImagePicker } from 'expo';

class SerieFormPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stars: ['md-heart-empty','md-heart-empty','md-heart-empty','md-heart-empty','md-heart-empty'],
            isLoading: false,
            imageConfig: {
                quality: 0.2,
                base64: true,
                allowsEditing: true,
                aspect: [1, 1],
            } 
        }
    }

    componentWillUpdate(nextProps, nextState) {
        LayoutAnimation.spring();
    }

    selectStars(rate) {
        let newState = [... this.state.stars]
        const int = Math.trunc(rate);
        const half = (rate - int)*10;
            this.state.stars.forEach((e, i) => {
               if (i < int) {
                    newState[i] = 'md-heart';
               } else if ((i === int) && (half !== 0)) {
                    newState[i] =  'md-heart-half';
               } else {
                    newState[i] = 'md-heart-empty';
               }
            });
        this.setState({stars: newState});
    }

    loader() {
        if (this.state.isLoading) 
        return <View style={styles.loader}>
        <ActivityIndicator
        size='large'
        color='#F95D6A' />
        </View>
    };

    componentDidMount() {
        const { navigation ,setWholeSerie, clearField } = this.props;
        const { params } = navigation.state;
        if ( params && params.serieToEdit ) {
            setWholeSerie(params.serieToEdit);
            this.selectStars(params.serieToEdit.rate);
        } else {
            clearField();
        }
    }

    async pickCameraImage() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (status !== 'granted') {
            Alert.alert('Sem acesso :(', 'Para podermos ter acesso a sua câmera você precisa permitir o acesso.', [{text: 'OK', style: 'cancel'}], { cancelable: false })
            return;
        }

        const result = await ImagePicker.launchCameraAsync(this.state.imageConfig);

        if (!result.cancelled) {
            this.saveImage(result.base64);
        }
    }

    async pickInternalImage() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            Alert.alert('Sem acesso :(', 'Para podermos ter acesso as suas imagens você precisa permitir o acesso.', [{text: 'OK', style: 'cancel'}], { cancelable: false })
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync(this.state.imageConfig);

        if (!result.cancelled) {
            this.saveImage(result.base64);
        }
    }

    saveImage(image) {
        this.props.setField('img', image);
    }


    render() {
        const { serieForm, setField, saveSerie, navigation } = this.props;

        const trySaveSerie = async () => {
            this.setState({isLoading: true});
            try{
                await saveSerie(serieForm);
                navigation.replace('Main');
            } catch(e) {
                Alert.alert( 'Ops!', 'Ocorreu um erro inesperado! Por favor, tente novamente mais tarde.', [{text: 'OK', style: 'cancel'}], { cancelable: false });   
            } finally {
                this.setState({isLoading: false});
            }
        };

        return (
            <KeyboardAvoidingView 
            style={styles.container} 
            keyboardVerticalOffset={100}
            behavior='padding' 
            enabled>
            {this.loader()}
                <ScrollView >
                    <FormRow First>
                        <TextInput
                        selectionColor={'#F95D6A'}
                        style={styles.input}
                        placeholder='Título'
                        value={serieForm.title}
                        onChangeText={value => setField('title', value)} />
                    </FormRow>
                    <FormRow >
                        <View><Text style={[styles.text, styles.imageText]} >Selecione uma imagem: </Text></View>
                        {
                        (serieForm.img) 
                            ? <Image 
                                source={{ uri: `data:image/jpeg;base64,${serieForm.img}` }}
                                style={styles.image}
                            /> 
                            : null 
                        }
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style={[styles.button, styles.imageButton]}
                                onPress={() => this.pickCameraImage()}>
                                    <Ionicons name="md-camera" size={35} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.imageButton]}
                                onPress={() => this.pickInternalImage()}>
                                    <Ionicons name="md-images" size={35} color="#fff" />
                            </TouchableOpacity> 
                        </View>
                    </FormRow>
                    <FormRow>
                        <View
                            style={[styles.input, styles.picker]}>
                        <Picker
                            selectedValue={serieForm.gender}
                            onValueChange={itemValue => setField('gender', itemValue)}
                            >
                            <Picker.Item label="Selecione o gênero" value="" />
                            <Picker.Item label="Comédia" value="Comédia" />
                            <Picker.Item label="Terror" value="Terror" />
                            <Picker.Item label="Ação" value="Ação" />
                            <Picker.Item label="Policial" value="Policial" />
                            <Picker.Item label="Ficção Científica" value="Ficção Científica" />
                        </Picker>
                        </View>
                    </FormRow>
                    <FormRow>
                        <View style={styles.nota}>
                            <Text style={styles.text}>Nota:</Text>
                            <Ionicons name={this.state.stars[0]} size={20} color="#F95D6A" />
                            <Ionicons name={this.state.stars[1]} size={20} color="#F95D6A" />
                            <Ionicons name={this.state.stars[2]} size={20} color="#F95D6A" />
                            <Ionicons name={this.state.stars[3]} size={20} color="#F95D6A" />
                            <Ionicons name={this.state.stars[4]} size={20} color="#F95D6A" />
                        </View>
                        <Slider 
                        value={serieForm.rate}
                        onValueChange={value => {setField('rate', value), this.selectStars(value)}}
                        maximumValue={5}
                        step={.5}
                        minimumTrackTintColor='#F95D6A'
                        thumbTintColor='#F95D6A'
                        maximumTrackTintColor='rgba(38, 38, 38, .5)' />
                    </FormRow>
                    <FormRow >
                        <TextInput 
                        selectionColor={'#F95D6A'}
                        style={[styles.input, styles.inputArea]}
                        placeholder='Descrição'
                        value={serieForm.description}
                        onChangeText={value => setField('description', value)} 
                        numberOfLines={4}
                        multiline={true} />
                    </FormRow>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => trySaveSerie()}
                    >
                    <Text style={styles.textButton}> Salvar </Text>
                    </TouchableOpacity> 
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
    },
    input: {
        fontSize: 20,
        backgroundColor: 'rgba(255, 255, 255, .8)',
        color: '#262626',
        padding: 10,
        borderWidth: .5,
        borderColor: '#262626',
        borderRadius: 50,
        elevation: 1,
    },
    inputArea: {
        borderRadius: 10,
    },
    picker: {
        padding: 0,
        height: 40,
    },
    nota: {
        flexDirection: 'row',
    },
    text: {
        color: '#262626',
        paddingRight: 10,
    },
    imageText: {
        marginBottom: 10,
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
    button: {
        backgroundColor: '#F95D6A',
        padding: 10,
        borderRadius: 50,
        elevation: 1,
        marginBottom: 10,
    },
    imageButton: {
        alignItems: 'center',
        borderRadius: 10,
        minWidth: '40%',
    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    image: {
        aspectRatio: 1,
        width: '100%',
        marginBottom: 10,
    }
});

const mapStateToProps = (state) => ({
    serieForm: state.serieForm
});

const mapDispatchToProps = {
    setField,
    saveSerie,
    setWholeSerie,
    clearField
}

export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage);