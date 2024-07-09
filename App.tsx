// [External]
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Provider } from 'react-redux';
import { store } from './src/app/store';

import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Modal,
  TouchableOpacity
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeIcon from 'react-native-vector-icons/Octicons';
import ExploreIcon from 'react-native-vector-icons/Octicons';
import SavedIcon from 'react-native-vector-icons/Octicons';
import SearchIcon from 'react-native-vector-icons/Octicons';
import ProfileIcon from 'react-native-vector-icons/Ionicons';

// [Internal]
import HomeScreen from './src/pages/main';
import ExploreScreen from './src/pages/explore';
import SavedScreen from './src/pages/saved';
import { Colors } from './app.json';
import { Walkthrough } from './src/pages/walkthrough';
import LoginScreen from './src/pages/login';
import { FIREBASE_AUTH } from './FireBaseConfig';
import SearchScreen from './src/pages/search';
import MediaDetailScreen from './src/pages/mediaDetail';


const MainScreens = () => {
  const Tab = createBottomTabNavigator();

  return (
       <View style={styles.stack}>
        <Tab.Navigator screenOptions={{
          tabBarStyle: { backgroundColor: '#1F2C44', borderTopWidth: 0, borderTopColor: Colors.TextColor, borderRadius: 0, paddingTop: 10 }, 
          headerTitleAlign: 'center',
          headerRight: HeaderRight,
          headerStyle: { backgroundColor: Colors.PrimaryDarkColor},
          headerTitleStyle: {
            fontSize: 24,
          },
          headerTintColor: Colors.TextColor
        }}>
            <Tab.Screen name='Filmania' options={{
              tabBarIcon: ({focused}) => {
                return <HomeIcon name="home" size={26} color={focused ? Colors.PrimaryLightColor : Colors.TextColor} />
              },
              tabBarShowLabel: false,
              
            }} 
            component={HomeScreen} 
            />
            <Tab.Screen name='Keşfet' component={ExploreScreen} options={{
              tabBarIcon: ({focused}) => {
                return <ExploreIcon name="rocket" size={26} color={focused ? Colors.PrimaryLightColor : Colors.TextColor} />
              },
              tabBarShowLabel: false
            }} />
            <Tab.Screen name='Listem' component={SavedScreen} options={{
              tabBarIcon: ({focused}) => {
                return <SavedIcon name='bookmark' size={26} color={focused ? Colors.PrimaryLightColor : Colors.TextColor} />
              },
              tabBarShowLabel: false
            }} />
            <Tab.Screen name='Arama' component={SearchScreen} options={{
              tabBarIcon: ({focused}) => {
                return <SearchIcon name='search' size={26} color={focused ? Colors.PrimaryLightColor : Colors.TextColor} />
              },
              tabBarShowLabel: false
            }} />
        </Tab.Navigator>
       </View>
  );
}

function HeaderRight() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigation = useNavigation();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('User signed out!');

      navigation.reset({ index: 0, routes: [{ name: "Login" }]})

    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };


  return (
      <View style={{ width: 34, height: 34, borderRadius: 32, marginRight: 10}}>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <ProfileIcon name='person-circle-sharp' color={Colors.TextColor} size={32} />
        </TouchableOpacity>
        <Modal
          statusBarTranslucent
          animationType="none"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(!showModal);
          }}
        >
          <TouchableOpacity style={{ flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} activeOpacity={1} onPressOut={() => setShowModal(false)}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  handleLogout();
                  setShowModal(!showModal);
                }}
              >
                <Text style={styles.textStyle}>Çıkış Yap</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          
        </Modal>
      </View> 
  )
}

function App(): React.JSX.Element {
  
  FIREBASE_AUTH?.currentUser;
  
  const Stack = createNativeStackNavigator();

  const [loading, setLoading] = useState<boolean>(true);
  const [initialRouteName, setInitialRouteName] = useState<string>("Walkthrough");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {
        setInitialRouteName('Main');
      } else {
        setInitialRouteName('Walkthrough');
      }
      setLoading(false)
    });

    return () => unsubscribe();
  }, []);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PrimaryLightColor} />
        <Text style={styles.text}>Yükleniyor...</Text>
      </View>
    );
  }
   
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar translucent barStyle="dark-content" />
          <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerBackTitleVisible: true  }}>
                <Stack.Screen name='Main' component={MainScreens} options={{ 
                        title: "",
                        headerShown: false
                      }}
                />
                <Stack.Screen name="Walkthrough" component={Walkthrough} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MediaDetail" component={MediaDetailScreen} options={{ headerShown: true, headerTintColor: Colors.TextColor, headerBackTitle: "Geri Dön", title: "Detay", headerStyle: { backgroundColor: Colors.PrimaryDarkColor } }} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.PrimaryDarkColor,
    alignItems: 'center',
  },
  text: {
    color: Colors.TextColor,
  },
  modalView: {
    margin: 12,
    backgroundColor: Colors.PrimaryDarkColor,
    borderRadius: 12,
    padding: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    right: 0,
    top: 50,
    justifyContent: 'center',
  },
  logoutButton: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
  },
  textStyle: {
    color: Colors.TextColor,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default App;
