import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import MainCard from "../ui/components/MainCard";
import TabMenu from "../ui/components/TabMenu";
import { Colors } from '../../app.json';
import CardList from "../ui/components/CardList";
import React, { useState } from 'react'


export default function HomeScreen() {
    const [active, setActive] = useState(0);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
                <TabMenu active={active} setActive={setActive}  />
                <MainCard />
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