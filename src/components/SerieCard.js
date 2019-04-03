import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const SerieCard = ({ serie, isFistCard, onNavigate }) => (
    <TouchableOpacity 
        onPress={onNavigate}
        style={[
            styles.container, 
            isFistCard ? styles.firstCard: styles.lastCard
        ]}
         >
        <View style={styles.card}>
        <Image 
        source={{ uri: serie.img }} 
        aspectRatio={1}
        resizeMode='cover'
        />
        <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}> {serie.title} </Text>
        </View>
        </View>
    </TouchableOpacity> 
)

const styles = StyleSheet.create({
    container: {
        width: '50%',
        padding: 5,
        height: Dimensions.get('window').width / 2,
    },
    card: {
        flex: 1,
    },
    cardTitleContainer: {
        backgroundColor: 'rgba(24, 24, 24, 0.8)',
        height: 50,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 5,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',

    },
    firstCard: {
        paddingLeft: 10
    },
    lastCard: {
        paddingRight: 10
    }
});

export default SerieCard;