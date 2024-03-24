import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import MainCardContainer from "../ui/containers/MainCard";
import TabMenu from "../ui/components/TabMenu";
import { Colors } from '../../app.json';
import CardList from "../ui/components/CardList";
import React, { useState, useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import { fetchUpcomingMoviesAction } from '../features/movies/moviesActions';

export default function HomeScreen() {
    const [active, setActive] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUpcomingMoviesAction());
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
                <MainCardContainer />
                <CardList hasTopTen title={`Haftanın Top 10 ${active === 0 ? "Film" : "Dizi"} Listesi`} />
                <CardList title={`Favori ${active === 0 ? "Filmler" : "Diziler"}`} />
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