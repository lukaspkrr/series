import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, LayoutAnimation, NativeModules } from 'react-native';

import { LinearGradient } from 'expo';

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

    render() {
        const { serie } = this.props.navigation.state.params;
        const { isExpanded } = this.state
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Image 
                    source={{ uri: serie.img }} 
                    style={styles.image} />
                    <LinearGradient
                    colors={['transparent', '#181818']}
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
                    </View>
                </TouchableWithoutFeedback>
                </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181818',
    },
    image: {
        aspectRatio: 1
    },
    gradient: {
        position: 'absolute',
        height: 150,
        width: '100%',
        bottom: 0
    },
    inform: {
        padding: 15,
    },
    textStyle: {
        color: '#fff',
        fontSize: 18
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
    },
    justify: { //IOS
        textAlign: 'justify',
    },
    collapsed: {
        maxHeight: 65,
    },
    expanded: {
        flex: 1,
    },
    divider: {
        backgroundColor: '#fff',
        width: '100%',
        height: 1,
        marginTop: 5,
    },
});

export default SerieDetailPage;