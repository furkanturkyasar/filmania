import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../../../app.json';
import { useSelector, useDispatch } from 'react-redux';
import { SetActiveIndexAction } from '../../features/shared/sharedActions';

type TabMenuProps = {
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

const TabMenu = (): React.ReactElement => {
    const activeIndex = useSelector((state: RootState) => state.shared.activeIndex);

    const dispatch = useDispatch()

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => dispatch(SetActiveIndexAction(0))} style={[styles.button, activeIndex === 0 ? { borderBottomColor: Colors.PrimaryLightColor, borderBottomWidth: 3} : null ]}>
            <Text style={styles.buttonText}>Film</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(SetActiveIndexAction(1))} style={[styles.button, activeIndex === 1 ? { borderBottomColor: Colors.PrimaryLightColor, borderBottomWidth: 3} : null ]}>
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