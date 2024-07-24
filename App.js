import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Home';
import Login from './src/Login';
import Signup from './src/Signup';
import Main from './src/Main';
import * as Location from 'expo-location';
import Dashboard from './src/Dashboard';
import Dataentry from './src/Dataentry';
import { Ionicons } from '@expo/vector-icons'; // Correctly import Ionicons from @expo/vector-icons
import News from './src/Feed';
import Profile from './src/Profile';
import PostInput from './src/Postinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainScreen({ route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'DataEntry') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Feed') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Index" component={Main} initialParams={route.params} />
      <Tab.Screen name="DataEntry" component={Dataentry} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Feed" component={News} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function App() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Location permission denied');
        } else {
          const currentPosition = await Location.getCurrentPositionAsync();
          setLocation(currentPosition.coords);
        }
      } catch (error) {
        setErrorMsg(`Error getting location: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (!location) {
      requestLocationPermission();
    }
  }, [location]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={MainScreen}
          initialParams={{ latitude: location ? location.latitude : 1, longitude: location ? location.longitude : 1 }}
        />
        <Stack.Screen name="PostInput" component={PostInput} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
