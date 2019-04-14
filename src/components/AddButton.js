import React from 'react';
import { StyleSheet, TouchableOpacity, Image} from 'react-native';

const AddButton = ({ onNavigation }) => {
        return (
            <TouchableOpacity 
            onPress={onNavigation}
            style={[styles.container, styles.bottomRight]} >
                <Image 
                source={require('./../../assets/add.png')} 
                style={styles.image} />
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#F95D6A',
        padding: 15,
        width: 60,
        height: 60,
        borderRadius:50,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    bottomRight: {
        bottom: 20,
        right: 20,
    },
    topRight: {
        top: 20,
        right: 20,
    },
    bottomLeft: {
        bottom: 20,
        left: 20,
    },
    topLeft: {
        top: 20,
        left: 20,
    },
})

export default AddButton;
