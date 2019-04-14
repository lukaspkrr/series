import React from 'react';
import { View, 
        Text, 
        StyleSheet, 
        Image, 
        ScrollView, 
        TouchableWithoutFeedback, 
        LayoutAnimation, 
        NativeModules, 
        TouchableOpacity,
        Alert } from 'react-native';

import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import { deleteSerie } from './../actions';

import { Ionicons } from '@expo/vector-icons';


//Android
NativeModules.UIManager.setLayoutAnimationEnabledExperimental && NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);

class SerieDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        }
    }

    toggleExpanded() {
        const { isExpanded } = this.state;
        this.setState({
            isExpanded: !isExpanded
         });
    }

    componentWillUpdate(nextProps, nextState) {
        LayoutAnimation.spring();
    }

    delete(serie) {
        Alert.alert(
            'Deletar',
            `Você realmente quer deletar a série ${serie.title}?`,
            [{
                text: 'Não',
                style: 'cancel', //IOS
                onPress: () => {}
            },
            {
                text: 'Deletar',
                onPress: () => this.tryDelete(serie)
            }],
            { cancelable: false }
        )
    }

    tryDelete(serie) {
        this.props.deleteSerie(serie)
        .then(() => this.props.navigation.goBack())
        .catch((e) => Alert.alert(
            'Erro!',
            e.message,
            [{
                text: 'OK',
                style: 'cancel', //IOS
                onPress: () => {}
            }],
            { cancelable: false }
        ))
    }

    render() {
        const { navigation } = this.props;
        const { serie } = navigation.state.params;
        const { isExpanded } = this.state
        return (
            <ScrollView style={styles.container}>
                <View>
                {
                (serie.img) 
                    ? <Image 
                    source={{ uri: serie.img }} 
                    style={styles.image} />
                    : null
                }
                    <LinearGradient
                    colors={['transparent', '#fff']}
                    style={styles.gradient} />
                </View>
                <View style={styles.inform}>
                <Text style={[styles.textStyle, styles.titleStyle, styles.serieTitle]}>{serie.title}</Text>
                <Text style={[styles.textStyle, styles.serieGender]}>{serie.gender}</Text>
                <View style={styles.rate}>
                <Text style={[styles.textStyle, styles.titleStyle]}>Nota: </Text>
                <Text style={styles.textStyle}>{serie.rate}</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.description}>
                <Text style={[styles.textStyle, styles.titleStyle]}>Descrição</Text>
                <TouchableWithoutFeedback onPress={() => this.toggleExpanded()}>
                    <View>
                        <Text style={[
                            styles.textStyle, 
                            styles.justify, 
                            isExpanded ? styles.isExpanded : styles.collapsed
                            ]}>{serie.description}</Text>
                            <LinearGradient
                            colors={['transparent', '#fff']}
                            style={[styles.dropButton, isExpanded ? styles.isExpandedDrop : styles.collapsedDrop]}>
                                {(!isExpanded) ?
                                <Ionicons name="md-arrow-dropdown" size={25} color="#262626" />
                                : null}
                            </LinearGradient>
                    </View>
                </TouchableWithoutFeedback>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonOutline]}
                        onPress={() => this.delete(serie)}>
                            <Ionicons style={{marginRight: 10}} name="md-trash" size={25} color="#F95D6A" />
                            <Text style={[styles.textButton, styles.textButtonOutline]}>
                                Deletar 
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('SerieForm', { serieToEdit: serie})}>
                            <Ionicons style={{marginRight: 10}} name="md-create" size={25} color="#fff" />
                            <Text style={styles.textButton}> 
                                Editar 
                            </Text>
                    </TouchableOpacity> 
                </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        aspectRatio: 1
    },
    gradient: {
        position: 'absolute',
        height: 50,
        width: '100%',
        bottom: 0
    },
    inform: {
        padding: 15,
    },
    textStyle: {
        color: '#262626',
        fontSize: 17
    },
    titleStyle: {
        fontWeight: 'bold',
    },
    serieTitle: {
        fontSize: 30,
    },
    rate: {
        flexDirection: 'row',
        paddingTop: 15,
    },
    serieGender: {
        fontSize: 15
    },
    description: {
    paddingTop: 15,
    paddingBottom: 20,
    },
    justify: { //IOS
        textAlign: 'justify',
    },
    collapsed: {
        maxHeight: 75,
    },
    expanded: {
        flex: 1,
    },
    divider: {
        backgroundColor: '#262626',
        width: '100%',
        height: 1,
        marginTop: 5,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#F95D6A',
        padding: 10,
        borderRadius: 50,
        elevation: 1,
        minWidth: '40%',
    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    },
    buttonOutline: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#F95D6A',
    },
    textButtonOutline: {
        color: '#F95D6A',
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dropButton: {
        width: '100%',  
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    isExpandedDrop:{
        height: 0,
    },
    collapsedDrop:{
        height: 100,
    },
});

export default connect(null, { deleteSerie })(SerieDetailPage);