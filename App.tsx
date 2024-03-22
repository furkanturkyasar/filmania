// [External]
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
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
import { Colors, Fonts } from './app.json';
import { Walkthrough } from './src/pages/walkthrough';
import LoginScreen from './src/pages/login';
import { FIREBASE_AUTH } from './FireBaseConfig';

function Saved() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Saved!</Text>
      <Text>hello</Text>
    </View>
  );
}

function Search() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Search!</Text>
      <Text>hello</Text>
    </View>
  );
}

const MainScreens = () => {
  const Tab = createBottomTabNavigator();

  return (
       <View style={styles.stack}>
        <Tab.Navigator screenOptions={{
          tabBarStyle: {backgroundColor: '#1F2C44', borderTopWidth: 0, borderTopColor: Colors.TextColor, borderRadius: 0, paddingTop: 10}, 
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
            <Tab.Screen name='Listem' component={Saved} options={{
              tabBarIcon: ({focused}) => {
                return <SavedIcon name='bookmark' size={26} color={focused ? Colors.PrimaryLightColor : Colors.TextColor} />
              },
              tabBarShowLabel: false
            }} />
            <Tab.Screen name='Arama' component={Search} options={{
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

  return (
      <View style={{ width: 34, height: 34, borderRadius: 32, marginRight: 10}}>
        <ProfileIcon name='person-circle-sharp' color={Colors.TextColor}  size={32} />
      </View> 
  )
}

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  const [loading, setLoading] = useState<boolean>(true);
  const [initialRouteName, setInitialRouteName] = useState<string>("Walkthrough");

  FIREBASE_AUTH?.currentUser;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user check: ", user)
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
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar translucent barStyle="dark-content" />
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerBackTitleVisible: true }}>
              <Stack.Screen name='Main' component={MainScreens} options={{ 
                      title: "",
                      headerShown: false
                    }} />
              <Stack.Screen name="Walkthrough" component={Walkthrough} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
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
    color: Colors.TextColor
  }
});

export default App;
