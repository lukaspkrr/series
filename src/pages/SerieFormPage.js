import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import FormRow from '../components/FormRow';

const SerieFormPage = props => (
    <View style={styles.container}>
        <FormRow First>
            <TextInput 
            placeholder='Título'
            value=''
            onChangeText={value => console.log(value)} />
        </FormRow>
    </View>
)

const styles = StyleSheet.create({
    container: {
        
    },
});

export default SerieFormPage;