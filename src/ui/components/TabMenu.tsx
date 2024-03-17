import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../../../app.json';

type TabMenuProps = {
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

const TabMenu = ({active, setActive}: TabMenuProps ): React.ReactElement => {
    

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => setActive(0)} style={[styles.button, active === 0 ? { borderBottomColor: Colors.PrimaryLightColor, borderBottomWidth: 3} : null ]}>
            <Text style={styles.buttonText}>Film</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActive(1)} style={[styles.button, active === 1 ? { borderBottomColor: Colors.PrimaryLightColor, borderBottomWidth: 3} : null ]}>
            <Text style={styles.buttonText}>Dizi</Text>
        </TouchableOpacity>
    </View>
  );
}

export default TabMenu;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40
    },
    button: {
        backgroundColor: Colors.PrimaryDarkColor,
        width: '33%',
        height: 32,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: Colors.TextColor,
        fontWeight: '700'
    }
});