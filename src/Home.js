import React, { useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios

const Home = (props) => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        console.log("1");
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        console.log("2");

        if (token) {
          console.log("3");

          const response = await axios.get('https://tbuddy-back.onrender.com/api/v1/me', {
            headers: {
              Authorization: token,
            },
          });
          console.log("4");

          if (response.data && response.data.success) {
            console.log(response.data);
            props.navigation.navigate('Main');
          } else {
            // Token is not valid, handle accordingly (e.g., redirect to login)
            console.error('Invalid token');
            props.navigation.replace('Login');
          }
        } else {
          // No token found, navigate to the login screen
          props.navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        console.log("finally");
      }
    };

    // Check token when the app starts
    checkToken();
  }, []);

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ marginLeft: 10, marginVertical: 100 }}>
            <View style={{ position: "relative", marginLeft: 25 }}>
              <Text style={{ color: 'white', fontSize: 64 }}>Tea Buddy</Text>
            </View>

            <View style={{ marginLeft: 50, marginTop: 120 }}>
              <Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
              <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({});

export default Home;
