import React, { useState } from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log(email, password);
      console.log('Sending request to:', 'Backend Server For login ');



      const response = await axios.post('https://tbuddy-back.onrender.com/api/v1/login', {
        email: email,
        password: password
      });

      const { token, user } = response.data;

      // Storing the token in AsyncStorage
      await AsyncStorage.setItem('token', token);

      console.log('Token stored:', token);
      console.log('User data:', user);


      console.log("hi");
      

      props.navigation.navigate('Main');
    } catch (error) {
      console.error('Login failed:', error.message);
      alert(error.message);
    }
  };



  return (
    <Background>
      <View style={{ alignItems: 'center', width: 460, }}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 30,
            marginRight: 60
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 400,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
            marginRight: 80
          }}>
          <Text style={{ fontSize: 40, color: darkGreen, fontWeight: 'bold' }}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <View style={{ width: 300, marginLeft: 50, }}>
            <Field
              placeholder="Email / Username"
              keyboardType={'email-address'}
              onChangeText={(text) => setEmail(text)}
            />
            <Field
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View
            style={{ alignItems: 'flex-end', width: '78%', paddingRight: 170, marginBottom: 200 }}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Forgot Password ?
            </Text>
          </View>


        </View>
      </View>
      <View style={{ position: "relative", flex: 1, marginLeft:50 }}>
        <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={handleLogin} />
      </View>
      <View style={{ marginLeft: 50, display: 'flex', flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Don't have an account ? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
          <Text style={{ color: "green", fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default Login;