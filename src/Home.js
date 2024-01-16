import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';

const Home = (props) => {
  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ marginLeft:10, marginVertical: 100}}>
            <View style={{position:"relative", marginLeft:25}}>
            <Text style={{ color: 'white', fontSize: 64 }}>Tea Buddy</Text>
            </View>

            <View style={{marginRight:60, marginTop:150}}>
              <Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
              <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({})

export default Home;
