import React from 'react';
import { StyleSheet, View } from 'react-native';

const FormRow = props => {
    const { children } = props;
    return (
        <View style={styles.container}>
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 15,
    }
})

export default FormRow;
