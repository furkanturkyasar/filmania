import { SafeAreaView, ScrollView, Text, View, StyleSheet, Dimensions } from "react-native";
import { Colors } from '../../app.json';
import React, { useEffect } from 'react';
import ListItemContainer from "../ui/containers/ListItem";
import { useDispatch } from 'react-redux';
import { fetchCurrentMovieList } from '../features/movies/moviesActions';
import { getAuth } from "firebase/auth";

const { width, height } = Dimensions.get('screen')

export default function SavedScreen({route, navigation}: any) {
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
        
    },[dispatch])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <ListItemContainer navigation={navigation} />
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