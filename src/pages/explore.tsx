import { SafeAreaView, ScrollView, Text, View, StyleSheet, Dimensions } from "react-native";
import TabMenu from "../ui/components/TabMenu";
import { Colors } from '../../app.json';
import React, { useState } from 'react';
import ExploreCarousel from "../ui/components/ExploreCarousel";

const { width, height } = Dimensions.get('screen')

export default function ExploreScreen() {
    const [active, setActive] = useState(0);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={{ height: height }}>
                    <TabMenu active={active} setActive={setActive}  />
                    <ExploreCarousel />
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