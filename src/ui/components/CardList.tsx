import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
import { Colors } from '../../../app.json';
import StarIcon from 'react-native-vector-icons/Octicons';


type CardListProps = {
    hasTopTen?: boolean;
    title: string;
}



const CardList = ({hasTopTen = false, title}: CardListProps) => {

    const DATA = [
        {
          rank: 1,
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
          image: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg"
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          rank: 2,
          title: 'Second Item',
          image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg"
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          rank: 3,
          title: 'Third Item',
          image: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY562_CR7,0,380,562_.jpg"
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d724444444',
            rank: 4,
            title: 'Third Item',
            image: "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_QL75_UX380_CR0,11,380,562_.jpg"
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72555555',
            title: 'Third Item',
            rank: 5,
            image: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX380_CR0,4,380,562_.jpg"
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72666666',
            title: 'Third Item',
            rank: 6,
            image: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UX380_CR0,0,380,562_.jpg"
        },

      ];
      

    function RenderItem({item}: any) {
        return (
            <View style={{ width: 150, flexDirection: hasTopTen ? 'row' : 'column' }}>
                {hasTopTen ? <Text style={{color: Colors.TextColor, fontSize: 140, fontWeight: '700', zIndex: 0, position: 'absolute', left: -11, bottom: -35 }}>{item.rank}</Text> : null}
                <Image  style={{width: hasTopTen ? 100 : 120, height: hasTopTen ? '100%' : 180, zIndex: 1, marginLeft: hasTopTen ? 40 : 0, borderRadius: 6 }} src={item.image} />
                {
                    !hasTopTen &&
                    <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 40 }}>
                        <Text style={{fontSize: 14, color: Colors.TextColor}}>{item.title}</Text>
                        <View style={{flexDirection: 'row', gap: 2, alignItems: 'center', marginTop: 1 }}> 
                            <StarIcon name='star-fill' size={11} color={Colors.StarColor} />
                            <Text style={{color: Colors.TextColor, fontSize: 11}}>9.0/10</Text>
                        </View>
                    </View>
                }
            </View>
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
                    data={DATA} 
                    renderItem={({item}) => <RenderItem item={item} />}
                    keyExtractor={(item) => item.id}
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
                <SafeAreaView style={{flex: 1, height: 225 }}>
                    <FlatList
                    horizontal={true}
                    scrollEnabled
                    pagingEnabled
                    ItemSeparatorComponent={myItemSeparator}
                    data={DATA} 
                    renderItem={({item}) => <RenderItem item={item} />}
                    keyExtractor={(item) => item.id}
                    />
                </SafeAreaView>
            </View>
          )
    }

  
}

export default CardList;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});