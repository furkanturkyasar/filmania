import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import MainCardContainer from "../ui/containers/MainCard";
import CardListContainer from "../ui/containers/CardList";
import TabMenu from "../ui/components/TabMenu";
import { Colors } from '../../app.json';
import React, { useState, useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import { fetchUpcomingMoviesAction, fetchTrendingMoviesAction, fetchNowPlayingMoviesAction } from '../features/movies/moviesActions';
import { fetchNowPlayingTvAction, fetchTrendingTvAction, fetchUpcomingTvAction } from '../features/tv/tvActions';

export default function HomeScreen() {
    const [active, setActive] = useState<number>(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUpcomingMoviesAction());
        dispatch(fetchTrendingMoviesAction());
        dispatch(fetchNowPlayingMoviesAction());
        dispatch(fetchUpcomingTvAction("tv"));
        dispatch(fetchTrendingTvAction("tv"));
        dispatch(fetchNowPlayingTvAction({ type: "tv" }));
    }, [dispatch]);

    useEffect(() => {
        const ac = new AbortController();
        
        setTimeout(() => {
            SplashScreen.hide();
        }, 500);

        return function cleanup() {
            ac.abort();
        };
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
                <TabMenu active={active} setActive={setActive} />
                <MainCardContainer activeIndex={active} />
                <CardListContainer activeIndex={active} hasTopTen={true} title={`Haftanın Top 10 ${active === 0 ? "Film" : "Dizi"} Listesi`} />
                <CardListContainer activeIndex={active} title={`Gösterimdeki ${active === 0 ? "Filmler" : "Diziler"}`} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PrimaryDarkColor
    },
    wrapper: {
        margin: 20
    }
});