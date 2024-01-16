import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Home';
import Login from './src/login';
import Signup from './src/signup';
import Main from './src/Main';
import * as Location from 'expo-location';
import Dashboard from './src/Dashboard';
import Dataentry from './src/Dataentry';
import { Ionicons } from '@expo/vector-icons';
import News from './src/News';


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Checking if a valid token exists in AsyncStorage
        const token = await AsyncStorage.getItem('userToken');

        if (token) {
          // If a token exists, send a request to your backend to validate it
          const response = await axios.get('https://tbuddy-back.onrender.com/api/v1/me', {
            headers: {
              Authorization: token,
            },
          });

          if (response.data && response.data.success) {
            // Token is valid, consider the user as authenticated
            // Navigate to the authenticated screen, e.g., 'Main'
            navigation.replace('Main');
          } else {
            // Token is not valid, handle accordingly (e.g., redirect to login)
            console.error('Invalid token');
            navigation.replace('Login');
          }
        } else {
          // No token found, navigate to the login screen
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Check token when the app starts
    checkToken();

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

    // Check location only if it's not null
    if (!location) {
      requestLocationPermission();
    }
  }, [location, isLoading]);

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
          component={MainScreen} // Directly reference the MainScreen component
          initialParams={{ latitude: location ? location.latitude : 1, longitude: location ? location.longitude : 1 }} // Pass initial params
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

function MainScreen({ route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Index') {
            iconName = focused ? 'home' : 'home-outline'; // Specify the icon names for your 'Index' tab
          } else if (route.name === 'DataEntry') {
            iconName = focused ? 'add-circle' : 'add-circle-outline'; // Specify the icon names for your 'DataEntry' tab
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline'; // Specify the icon names for your 'Dashboard' tab
          } else if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline'; // Specify the icon names for your 'News' tab
          }

          // Return the Ionicons component with the appropriate icon name
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Index" component={Main} initialParams={route.params} />
      <Tab.Screen name="DataEntry" component={Dataentry} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="News" component={News} />
    </Tab.Navigator>
  );
}
