import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import StarIcon from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../app.json';

const MainCard = () => {
    const dummyImage = "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UY562_CR4,0,380,562_.jpg";

  return (
    <View style={styles.container}>
        <Image style={styles.image} src={dummyImage} />
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']} style={styles.gradient}>
                <Text style={styles.title}>Forrest Gump</Text>
                <View style={styles.ratingContainer}>
                    <StarIcon name='star-fill' size={20} color={Colors.StarColor} />
                    <Text style={styles.ratingText}>9.0/10</Text>
                </View>
            </LinearGradient>
    </View>
  )
}

export default MainCard;

const styles = StyleSheet.create({
    container: {
        height: 400
    },
    image: {
        backgroundColor: '#FFF',
        width: 'auto',
        height: 400,
        borderRadius: 32
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
        borderBottomLeftRadius: 32, 
        borderBottomRightRadius: 32, 
        padding: 15, 
        paddingTop: 40
    },
    title: {
        color: Colors.TextColor, 
        fontWeight: '700', 
        fontSize: 22
    },
    ratingContainer: {
        flexDirection: 'row', 
        gap: 2
    },
    ratingText: {
        alignSelf: 'center', 
        fontSize: 16, 
        fontWeight: '700', 
        color: Colors.TextColor
    }
});