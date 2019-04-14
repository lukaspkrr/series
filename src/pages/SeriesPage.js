import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import SerieCard from './../components/SerieCard';
import { watchSeries } from './../actions';

import AddButton from './../components/AddButton';

import { connect } from 'react-redux';

const isEven = number => number % 2 === 0;

class SeriesPage extends React.Component {

    componentDidMount() {
        this.props.watchSeries();
    }

    render() {
        const { series, navigation } = this.props;

        if (series === null) {
            return (
            <View style={styles.loader}>
                <ActivityIndicator
                size='large'
                color='#F95D6A' />
            </View>
            )
        }

         return (
            <View style={styles.container}>
                <FlatList
                data={series}
                renderItem={({ item, index }) => 
                <SerieCard 
                    serie={item} 
                    isFistCard={isEven(index)}
                    onNavigate={() => navigation.navigate('SerieDetail', {serie: item})}
                /> }
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                ListHeaderComponent={() => <View style={styles.headerComponent} />}
                ListFooteromponent={() => <View style={styles.footerComponent} />}
                />
                <AddButton
                    onNavigation={() => navigation.navigate('SerieForm')}
                />
            </View>
         )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerComponent: {
        paddingTop: 5,
    },
    footerComponent:{
        marginBottom: 200,
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
            backgroundColor: 'rgba(255, 255, 255 ,0.8)',
        },
});

const mapStateToProps = state => {
    const { series } = state;
    if (series === null ) { return { series } }
    const keys = Object.keys(series);
    const seriesWithKeys = keys.map(id => ({...series[id], id}))
    return { series: seriesWithKeys };
}

export default connect(mapStateToProps, { watchSeries })(SeriesPage);