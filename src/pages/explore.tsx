import { SafeAreaView, ScrollView, Text, View, StyleSheet, Dimensions } from "react-native";
import TabMenu from "../ui/components/TabMenu";
import { Colors } from '../../app.json';
import React, { useState, useEffect } from 'react';
import ExploreCarouselContainer from "../ui/containers/ExploreCarousel";
import { useDispatch } from 'react-redux';
import { fetchDiscoverMoviesAction } from '../features/movies/moviesActions';
import { fetchDiscoverTvAction } from '../features/tv/tvActions';

const { width, height } = Dimensions.get('screen')

export default function ExploreScreen() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDiscoverMoviesAction());
        dispatch(fetchDiscoverTvAction({ type: "tv" }));
    },[dispatch])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={{ height: height }}>
                    <TabMenu />
                    <ExploreCarouselContainer />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PrimaryDarkColor
    },
    wrapper: {
        margin: 20,
    }
});