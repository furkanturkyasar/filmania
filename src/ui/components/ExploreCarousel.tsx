import React, {useState, useEffect, useRef} from 'react';
import { View, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { interpolate } from "react-native-reanimated";

import { Colors } from '../../../app.json';
import MainCard from './MainCard';
import ExploreIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import SavedIcon from 'react-native-vector-icons/Octicons';
import { Media } from '../../types/movie';

export interface ExploreCarouselProps {
  activeIndex: number;
  discoverMedia?: Media[] | null;
}

const ExploreCarousel = ({activeIndex, discoverMedia}: ExploreCarouselProps) => {
    const { width, height } = Dimensions.get('window');

    const [isFast, setIsFast] = useState<boolean>(true);
    const [play, setPlay] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<Media | null>(null);

    const carouselRef = useRef<ICarouselInstance>(null);

    const ITEM_WIDTH = 130;
    const ITEM_HEIGHT = 180;


    const animationStyle: any = React.useCallback(
        (value: number) => {
          "worklet";
     
        const PAGE_WIDTH = width / 3;
        const opacity = interpolate(value, [-1, 0, 1], [.6, 1, .6]);
        const scaleX = interpolate(value, [-1, 0, 1], [.7, 1, .7]);
        const scaleY = scaleX;
        const translateX = interpolate(
            value,
            [-1, 0, 1],
            [-PAGE_WIDTH, 0, PAGE_WIDTH]
        );

        return {
            transform: [{ translateX }, { scaleX }, { scaleY }],
            opacity
        };
        },
        [width],
    );

    
    useEffect(() => {
      if (!isFast) {
          setTimeout(() => {
              setPlay(false)
              if (carouselRef) {
                if (discoverMedia) {
                  setSelectedCard(discoverMedia[(carouselRef.current as any)?.getCurrentIndex()])
                }
              }
          }, 1000)
      }
    }, [isFast]);

    useEffect(() => {
      setSelectedCard(null)
    }, [activeIndex])


    if (!discoverMedia || discoverMedia.length < 1) {
      return null;
    }

  return (
    <>
    <View style={{ height: '35%', alignItems: 'center', marginTop: '10%'  }}>
      <Carousel
        loop
        width={width}
        pagingEnabled={false}
        ref={carouselRef}
        autoPlay={play}
        scrollAnimationDuration={isFast ? 200 : 600}
        autoPlayInterval={5}
        height={ITEM_HEIGHT}
        data={discoverMedia}
        renderItem={({ index, item }) => {
          const imageUrl = `https://image.tmdb.org/t/p/w300${item.poster_path}`;
          return (
            <View key={index} style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center'
                }}
              >
                <Image
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      borderRadius: 12,
                    }}
                    source={{
                      uri: imageUrl
                    }}
                  />
              </View>
            </View>
          );
        }}
        customAnimation={animationStyle}
      />
      <TouchableOpacity onPress={() => {
            setPlay((prev) => {
                if (prev) {
                    setIsFast(false)
                    
                    return true
                } else {
                    setIsFast(true)
          
                    return !play
                }
            })
        }} style={{marginTop: '10%', backgroundColor: Colors.PrimaryDarkColor, width: 100, height: 30, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderBottomColor: Colors.PrimaryLightColor, borderBottomWidth: 3, borderTopWidth: 3, borderTopColor: Colors.PrimaryLightColor}}>
          <Text style={{color: Colors.TextColor, fontSize: 14, fontWeight: '700' }}>{!play ? "ÇEVİR" : "DURDUR"}</Text>
      </TouchableOpacity>
    </View>
    <View style={{height: '20%'}}>
        <SelectedCard activeMedia={selectedCard} />
    </View>
    </>
  )
}

export default ExploreCarousel;


interface SelectedCardProps {
  activeMedia: Media | null;
}

const SelectedCard = ({activeMedia}: SelectedCardProps) => {
  console.log({activeMedia})

  if (!activeMedia)
    return null
    
  const imageUrl = `https://image.tmdb.org/t/p/w300${activeMedia.poster_path}`;

    return (
        <View key={`act_md_${activeMedia.id}`} style={{flexDirection: 'row', height: 180, gap: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: 130, height: '100%', borderRadius: 12}} source={{uri: imageUrl}} />
            <SavedIcon name='bookmark' style={{position: 'absolute', right: 0, top: 0 }} size={24} color={Colors.TextColor} />
            <View style={{justifyContent: 'flex-end', gap: 6, height: 160}}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: Colors.TextColor, marginBottom: 10, fontSize: 16, fontWeight: '700', maxWidth: 220}}>{activeMedia.title}</Text>
              <Text ellipsizeMode='tail' numberOfLines={4} style={{ color: Colors.TextColor, maxWidth: 220, overflow: 'hidden', maxHeight: 100, minHeight: 40, fontSize: 12}}>{activeMedia.overview}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <Text style={{color: Colors.TextColor}}>{activeMedia.release_date}</Text>
                <View style={{flexDirection: 'row', gap: 5 }}>
                  <Icon name='star' size={20} color={Colors.StarColor} />
                  <Text style={{color: Colors.TextColor}}>{activeMedia.vote_average.toFixed(1)}/10</Text>
                </View>
              </View>
            </View>
        </View>
    );
}