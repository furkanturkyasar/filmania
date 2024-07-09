import { SafeAreaView, ScrollView, Text, View, StyleSheet, Dimensions } from "react-native";
import TabMenu from "../ui/components/TabMenu";
import { Colors } from '../../app.json';
import React, { useState, useEffect } from 'react';
import ExploreCarouselContainer from "../ui/containers/ExploreCarousel";
import { useDispatch } from 'react-redux';
import { fetchDiscoverMoviesAction, fetchCurrentMovieList } from '../features/movies/moviesActions';
import { fetchDiscoverTvAction } from '../features/tv/tvActions';
import { getAuth } from "firebase/auth";

const { width, height } = Dimensions.get('screen')

export default function ExploreScreen({navigation, route}: any) {
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user ? user.uid : null;

        if (userId) {
            dispatch(fetchCurrentMovieList(userId))
        } else {
            console.log("user is not auth!");
        }

        dispatch(fetchDiscoverMoviesAction());
        dispatch(fetchDiscoverTvAction({ type: "tv" }));
    },[dispatch])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={{ height: height }}>
                    <TabMenu />
                    <ExploreCarouselContainer navigation={navigation} />
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