import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SerieCard from './../components/SerieCard';

import series from './../../series.json';
import AddButton from './../components/AddButton';

const isEven = number => number % 2 === 0;

const SeriesPage = props => (
    <View style={styles.container}>
        <FlatList
        data={series}
        renderItem={({ item, index }) => 
        <SerieCard 
            serie={item} 
            isFistCard={isEven(index)}
            onNavigate={() => props.navigation.navigate('SerieDetail', {serie: item})}
        /> }
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={props => <View style={styles.headerComponent} />}
        ListFooteromponent={props => <View style={styles.footerComponent} />}
        />
        <AddButton
            onNavigation={() => props.navigation.navigate('SerieForm')}
         />
         {/*  
        vPosition={} 
        hPosition={} 
        color={} */}
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181818',
    },
    headerComponent: {
        paddingTop: 5,
    },
    footerComponent:{
        marginBottom: 200,
    }
});

export default SeriesPage;