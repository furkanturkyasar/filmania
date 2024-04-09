import React, { useRef } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import StarIcon from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../app.json';
import { Media } from '../../types/movie';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-reanimated-carousel';
import type { ICarouselInstance } from "react-native-reanimated-carousel";

export interface MainCardProps {
    upcomingMovies?: Media[] | null;
    upcomingTv?: Media[] | null;
    activeIndex: number;
}

interface CarouselItemProps {
    media: Media;
    activeIndex: number;
}

const MainCard = ({upcomingMovies, upcomingTv, activeIndex}: MainCardProps) => {

    if (activeIndex === 0) {
      if (!upcomingMovies || upcomingMovies.length < 1) {
        return null;
      }
    } else {
      if (!upcomingTv || upcomingTv.length < 1) {
        return null;
      }
    };
    
    const carouselRef = useRef<ICarouselInstance>(null);

    return (
      <View style={styles.container}>
        <Carousel
          ref={carouselRef}
          loop
          autoPlay
          autoPlayInterval={3500}
          style={{ borderRadius: 32}}
          width={400}
          height={400}
          data={activeIndex === 0 ? upcomingMovies ?? [] : upcomingTv ?? []}
          renderItem={({ item }) => <CarouselItem media={item} activeIndex={activeIndex} />}
          //onSnapToItem={(index) => index}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.arrowButton, { left: 10 }]}
          onPress={() => carouselRef.current?.prev()}>
          <ArrowIcon name="arrow-back" size={30} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.arrowButton, { right: 10 }]}
          onPress={() => carouselRef.current?.next()}>
          <ArrowIcon name="arrow-forward" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
};

const CarouselItem: React.FC<CarouselItemProps> = ({ media, activeIndex }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w400${media.poster_path}`;
    
    return (
      <View key={media.id} style={styles.itemContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']} style={styles.gradient}>
          <Text numberOfLines={2} style={styles.title}>{ activeIndex === 0 ? media.title : (media as any).name}</Text>
          <View style={styles.ratingContainer}>
            <StarIcon name='star-fill' size={20} color={Colors.StarColor} />
            <Text style={styles.ratingText}>{media.vote_average.toFixed(1)}/10</Text>
          </View>
        </LinearGradient>
      </View>
    );
  };
  

export default MainCard;

const styles = StyleSheet.create({
    container: {
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        height: 400,
    },
    image: {
        backgroundColor: '#FFF',
        width: 'auto',
        height: 400,
        objectFit: 'cover'
    },
    arrowButton: {
      position: 'absolute',
      //top: '50%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 32,
      padding: 8,
    },
    gradient: {
        alignItems: 'center',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        position: 'absolute', 
        bottom: 0,
        left: 0, 
        width: "100%", 
        height: 85, 
        //borderBottomLeftRadius: 8, 
        //borderBottomRightRadius: 8, 
        padding: 15, 
        paddingTop: 40
    },
    title: {
        color: Colors.TextColor, 
        fontWeight: '700', 
        fontSize: 22,
        marginLeft: 15,
        maxWidth: 220
    },
    ratingContainer: {
        flexDirection: 'row', 
        gap: 2,
        marginRight: 15
    },
    ratingText: {
        alignSelf: 'center', 
        fontSize: 16, 
        fontWeight: '700', 
        color: Colors.TextColor
    }
});