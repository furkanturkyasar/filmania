import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { interpolate } from "react-native-reanimated";

import { Colors } from '../../../app.json';
import MainCard from './MainCard';
import ExploreIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import SavedIcon from 'react-native-vector-icons/Octicons';

const ExploreCarousel = () => {
    const { width, height } = Dimensions.get('window');

    const [isFast, setIsFast] = useState(true);
    const [play, setPlay] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    
    const ITEM_WIDTH = 130;
    const ITEM_HEIGHT = 180;

    const DATA = [
        {
          rank: 1,
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Shawshank Redemption',
          image: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg"
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          rank: 2,
          title: 'The Dark Knight',
          image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg"
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          rank: 3,
          title: 'The God Father Part 2',
          image: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY562_CR7,0,380,562_.jpg"
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d724444444',
            rank: 4,
            title: '12 Angry Men',
            image: "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_QL75_UX380_CR0,11,380,562_.jpg"
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72555555',
            title: "Schindler's List",
            rank: 5,
            image: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX380_CR0,4,380,562_.jpg"
        },
        {
            id: "didemfurkan",
            title: "Lord of the rings",
            rank: 6,
            image: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UX380_CR0,0,380,562_.jpg"
        }

      ];


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
            }, 1000)
        }
      }, [isFast]);

  return (
    <>
    <View style={{ height: '35%', alignItems: 'center', marginTop: '10%'  }}>
      <Carousel
        loop
        width={width}
        pagingEnabled={false}
        autoPlay={play}
        scrollAnimationDuration={isFast ? 200 : 600}
        autoPlayInterval={5}
        height={ITEM_HEIGHT}
        data={DATA}
        renderItem={({ index, item }) => {
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
                      uri: item.image
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
        <SelectedCard />
    </View>
    </>
  )
}

export default ExploreCarousel;


const SelectedCard = () => {
    return (
        <View style={{flexDirection: 'row', height: 180, gap: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: 130, height: '100%', borderRadius: 12}} source={{uri: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg"}} />
            <SavedIcon name='bookmark' style={{position: 'absolute', right: 0, top: 0}} size={24} color={Colors.TextColor} />
            <View style={{justifyContent: 'flex-end', gap: 6, height: 160}}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: Colors.TextColor, marginBottom: 10, fontSize: 16, fontWeight: '700', maxWidth: 220}}>Forrest Gump Versiyon 2</Text>
              <Text ellipsizeMode='tail' numberOfLines={4} style={{ color: Colors.TextColor, maxWidth: 220, overflow: 'hidden', maxHeight: 100, minHeight: 40, fontSize: 12}}>Follows a young girl who goes sadsdadsadsadsasds dsadas  dsads young girl who goes sadsdadsadsadsasds dsadas  dsads </Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <Text style={{color: Colors.TextColor}}>Drama</Text>
                <View style={{flexDirection: 'row' }}>
                  <Icon name='star' size={20} color={Colors.StarColor} />
                  <Text style={{color: Colors.TextColor}}>9.3/10</Text>
                </View>
              </View>
            </View>
        </View>
    );
}