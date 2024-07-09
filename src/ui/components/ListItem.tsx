import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, Image, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Colors } from '../../../app.json';
import { useDispatch } from 'react-redux';
import { Media, MovieList } from '../../types/movie';
import EmptyIcon from 'react-native-vector-icons/Ionicons';
import SavedIcon from 'react-native-vector-icons/Fontisto';

export type ListItemProps = {
    movieDetails?: Media[] | null;
    isLoading?: boolean;
    onAddMedia: (movieId: string) => void;
    navigation?: any;
}

const { width, height } = Dimensions.get('window');

const ListItem = ({ movieDetails, onAddMedia, isLoading, navigation }: ListItemProps) => {

    console.log({isLoading})
    if (isLoading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.PrimaryLightColor} />
            <Text style={styles.loadingText}>Yükleniyor...</Text>
          </View>
        );
    };

    if (!isLoading && (!movieDetails || movieDetails.length < 1)) {
        return (
            <View style={styles.emptyStateContainer}>
                <EmptyIcon size={50} name='list' style={styles.image} color={Colors.TextColor} />
                <Text style={styles.text}>Listede hiçbir veri bulunamadı.</Text>
            </View>
        );
    };

    function renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Kaydedilenler</Text>
            </View>
        );
    }; 

    const renderItem = (item: Media) => {
        const imageUrl = `https://image.tmdb.org/t/p/w400${item.poster_path}`;
        
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("MediaDetail", {
                    id: item.id
                })
            }}  style={styles.itemContainer}>
                <Image  style={styles.itemImage} src={imageUrl} />
                <Text style={styles.itemHeader}>{item.title}</Text>
                <SavedIcon onPress={() => onAddMedia(item.id)} name="bookmark-alt" style={{position: 'absolute', right: 20, top: 10 }} size={24} color={Colors.TextColor} />
            </TouchableOpacity>
        )
    };

    return (
        <View style={styles.container}>
            {renderHeader()}
            <FlatList
                data={movieDetails}
                renderItem={({ item }) => 
                    renderItem(item)
                }
            />
        </View>
    );
};

export default ListItem;

const styles = StyleSheet.create({
    container: {
        height: height,
        flex: 1
    },
    headerContainer: {
        marginTop: 24,
        marginBottom: 24
    },
    headerText: {
        color: Colors.TextColor,
        fontSize: 32
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: Colors.PrimaryDarkColor,
        margin: 16,
        borderRadius: 6,
        position: 'relative',
    },
    itemImage: {
        width: 'auto',
        height: 150,
        borderRadius: 6,
    },
    itemHeader: {
        color: Colors.TextColor,
        position: 'absolute',
        bottom: 10,
        left: '7%',
        fontSize: 24
    },
    emptyStateContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: Colors.TextColor,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
      loadingText: {
        marginTop: 10,
        color: Colors.TextColor,
    },
});