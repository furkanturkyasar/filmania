import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, NativeSyntheticEvent, TextInputChangeEventData, FlatList, Image } from 'react-native'
import { Colors } from '../../../app.json';
import { useSelector, useDispatch } from 'react-redux';
import { ReactElement, useState } from 'react';
import { Media } from '../../types/movie';
import { MultiMediaParam } from '../../types/shared';
import Icon from 'react-native-vector-icons/Ionicons';


export interface SearchProps {
    mediaList?: Media[] | [];
    pageInfo?: {};
    onGetMedia: (param: MultiMediaParam) => void;
    navigation?: any;
};

const EmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="ios-sad-outline" size={90} color="gray" />
        <Text style={styles.emptyText}>Şu anda gösterilecek veri yok.</Text>
      </View>
    );
};

const Search = ({ mediaList, onGetMedia, navigation }: SearchProps): ReactElement => {
    const [search, setSearch] = useState<string>("");
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const showEmptyState: boolean = (!mediaList || mediaList.length === 0);

    const handleGetMedia = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const value: string = e.nativeEvent.text;
        setSearch(value);

        if (timeoutId) clearTimeout(timeoutId);

        const newTimeoutId = setTimeout(() => {
            onGetMedia({ query: value });
          }, 350);

        setTimeoutId(newTimeoutId)
    }

    const renderInput = () => {
        
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={search}
                    onChange={(e) => handleGetMedia(e)}
                    placeholder='Arama...'
                    maxLength={30}
                />
            </View>
        );
    };

    const renderItemContent = (item: Media) => {
        let imageUrl = 'https://via.placeholder.com/200x300';

        if (item.poster_path)
            imageUrl = `https://image.tmdb.org/t/p/w400${item.poster_path}`;

        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("MediaDetail", {
                    id: item.id
                })
            }} style={styles.itemContainer}>
                <Image style={styles.itemImage} src={imageUrl} />
                <Text style={styles.itemHeader}>{item.title ? item.title : item.name}</Text>
            </TouchableOpacity>
        )
    };

  return (
    <View style={styles.container}>
        {renderInput()}
        {
            showEmptyState ?
            <EmptyState />
            :
            <FlatList
                style={styles.moviesContainer}
                data={mediaList}
                renderItem={({item}) => {
                    return renderItemContent(item)
                }}
                keyExtractor={(item) => item.id.toString()}
             />
        }
    </View>
  );
}

export default Search;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        backgroundColor: '#FFF',
        height: 35,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.PrimaryLightColor,
        justifyContent: 'center',
        paddingLeft: 12
    },
    input: {

    },
    moviesContainer: {
        marginTop: 30,
        flex: 1
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyText: {
        color: 'gray',
        fontSize: 18,
        marginTop: 20,
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
});