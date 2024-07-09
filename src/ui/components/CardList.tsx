import React, { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../../app.json';
import StarIcon from 'react-native-vector-icons/Octicons';
import { Media } from '../../types/movie';
import { useDispatch } from 'react-redux';
import { fetchNowPlayingMoviesAction } from '../../features/movies/moviesActions';
import { fetchNowPlayingTvAction } from '../../features/tv/tvActions';



export type CardListProps = {
    hasTopTen?: boolean;
    title: string;
    activeIndex: number;
    trendingMovies?: Media[] | null | undefined;
    nowPlayingMovies?: Media[] | null | undefined;
    trendingTv?: Media[] | null | undefined;
    nowPlayingTv?: Media[] | null | undefined;
    navigation?: any;
}

export type RenderItemProps = {
    item: Media;
    index: number | string;
    navigation?: any;
}

const CardList = ({hasTopTen = false, title, trendingMovies, nowPlayingMovies, trendingTv, nowPlayingTv, activeIndex, navigation}: CardListProps) => {
    const dispatch = useDispatch();

    const [moviePageNumber, setMoviePageNumber] = React.useState<number>(1);
    const [tvPageNumber, setTvPageNumber] = React.useState<number>(1);
    
    const handleEndReached = () => {
        
        if (activeIndex === 0) {
            dispatch(fetchNowPlayingMoviesAction({pageNumber: moviePageNumber + 1}))
            setMoviePageNumber(prevPageNumber => prevPageNumber + 1);
        } else {
            dispatch(fetchNowPlayingTvAction({pageNumber: tvPageNumber + 1}))
            setTvPageNumber(prevPageNumber => prevPageNumber + 1);
        }
    };


    function RenderItem({item, index, navigation}: RenderItemProps) {
            const imageUrl = `https://image.tmdb.org/t/p/w200${item.poster_path}`;

            return (
                <TouchableOpacity onPress={() => {
                    navigation.navigate("MediaDetail", {
                        id: item.id
                    })
                }} style={{ width: 150, flexDirection: hasTopTen ? 'row' : 'column'}}>
                    {hasTopTen ? <Text style={{color: Colors.TextColor, fontSize: 140, fontWeight: '700', zIndex: 2, position: 'absolute', left: -21, bottom: -35 }}>{+index + 1}</Text> : null}
                    <Image  style={{width: hasTopTen ? 100 : 120, height: hasTopTen ? '100%' : 180, zIndex: 1, marginLeft: hasTopTen ? 40 : 0, borderRadius: 6 }} src={imageUrl} />
                    {
                        !hasTopTen &&
                        <View style={{ position: 'absolute', bottom: 20, width: 120, height: 55, alignContent: "center", justifyContent: 'center' }}>
                            <Text numberOfLines={1} style={{fontSize: 14, color: Colors.TextColor}}>{activeIndex === 0 ? item.title : (item as any).name}</Text>
                            <View style={{flexDirection: 'row', gap: 2, alignItems: 'center', marginTop: 1 }}> 
                                <StarIcon name='star-fill' size={11} color={Colors.StarColor} />
                                <Text style={{color: Colors.TextColor, fontSize: 11}}>9.0/10</Text>
                            </View>
                        </View>
                    }
                </TouchableOpacity>
            );
    }

    const myItemSeparator = () => {
        return (
          <View
           style={{ height: 1, marginHorizontal: hasTopTen ? 10 : -10 }}
          />
        );
    };

    if (hasTopTen) {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', gap: 5}}>
                    <View style={{width: 3, backgroundColor: Colors.PrimaryLightColor, height: 20, borderRadius: 12}} />
                    <Text style={{color : Colors.TextColor, fontWeight: '700', fontSize: 17, marginBottom: 10}}>{title}</Text>
                </View>
                <SafeAreaView style={{flex: 1, height: 150 }}>
                    <FlatList
                    horizontal={true}
                    scrollEnabled
                    pagingEnabled
                    ItemSeparatorComponent={myItemSeparator}
                    data={activeIndex === 0 ? trendingMovies ?? [] : trendingTv ?? []} 
                    renderItem={({item, index}) => <RenderItem item={item} index={index} navigation={navigation} />}
                    keyExtractor={(item, index) => `tr_${item.id.toString()}_${index}`}
                    />
                </SafeAreaView>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', gap: 5}}>
                    <View style={{width: 3, backgroundColor: Colors.PrimaryLightColor, height: 20, borderRadius: 12}} />
                    <Text style={{color : Colors.TextColor, fontWeight: '700', fontSize: 17, marginBottom: 10}}>{title}</Text>
                </View>
                <SafeAreaView style={{flex: 1, height: 260 }}>
                    <FlatList
                    horizontal={true}
                    scrollEnabled
                    pagingEnabled
                    onEndReached={() => handleEndReached()}
                    ItemSeparatorComponent={myItemSeparator}
                    data={activeIndex === 0 ? nowPlayingMovies ?? [] : nowPlayingTv ?? []} 
                    renderItem={({item, index}) => <RenderItem item={item} index={`${activeIndex === 0 ? "movie_" : "tv_"}nw_${index}`} navigation={navigation} />}
                    keyExtractor={(item, index) => `nw_${item.id.toString()}_${index}`}
                    />
                </SafeAreaView>
            </View>
          )
    }

  
}

export default CardList;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    }
});