import { SafeAreaView, ScrollView, Text, View, StyleSheet, Dimensions } from "react-native";
import { Colors } from '../../app.json';
import React, { useEffect } from 'react';
import ListItemContainer from "../ui/containers/ListItem";
import { useDispatch } from 'react-redux';
import { getAuth } from "firebase/auth";

const { width, height } = Dimensions.get('screen');

export default function MediaDetailScreen({route, navigation}: any): React.ReactElement {
    const dispatch = useDispatch();
    const { id } = route.params;
    console.log(route.params);
    
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user ? user.uid : null;

    }, [dispatch])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.textContainer}>{id}</Text>
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
    },
    textContainer: {
        color: '#FFF'
    }
});