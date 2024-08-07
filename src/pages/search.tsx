import { SafeAreaView, ScrollView, Text, View, StyleSheet, Dimensions } from "react-native";
import { Colors } from '../../app.json';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentMovieList } from '../features/movies/moviesActions';
import { getAuth } from "firebase/auth";
import SearchContainer from "../ui/containers/Search";

const { width, height } = Dimensions.get('screen')

export default function SearchScreen({navigation, route}: any) {
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

    },[dispatch])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <SearchContainer navigation={navigation} />
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
        flex: 1
    }
});