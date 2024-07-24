import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';

const Signup = (props) => {
  const [farmerId, setFarmerId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('https://tbuddy-back.onrender.com/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          farmerId,
          fullname: fullName,
          email,
          mobileno: mobileNumber,
          password,
          cnfpassword: confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Account created');
        props.navigation.navigate('Login');
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Something went wrong');
    }
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: '80%', paddingHorizontal: 20 }}>
        <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold', marginTop: 20 }}>
          Register
        </Text>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>
          Create a new account
        </Text>
        <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 20, width: '100%', maxWidth: 400 }}>
          <View style={{ width:330, flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
            <Field style={{width:100}} placeholder="Farmer ID" value={farmerId} onChangeText={setFarmerId} />
            <Field placeholder="Full Name" value={fullName} onChangeText={setFullName} />
            <Field placeholder="Email" keyboardType={'email-address'} value={email} onChangeText={setEmail} />
            <Field placeholder="Mobile Number" keyboardType={'number-pad'} value={mobileNumber} onChangeText={setMobileNumber} />
            <Field placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />
            <Field placeholder="Confirm Password" secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
          </View>

          <View style={{ flexDirection: 'column', width: '100%', paddingRight: 16, marginTop: 10, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
              <Text style={{ color: 'grey', fontSize: 14, textAlign: 'center' }}>
                By signing in, you agree to our{' '}
                <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 14 }}>
                  Terms & Conditions
                </Text>{' '}
                and{' '}
                <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 14 }}>
                  Privacy Policy
                </Text>
              </Text>
            </View>

            <Btn
              textColor="white"
              bgColor={darkGreen}
              btnLabel="Signup"
              Press={handleSignup}
              style={{ width: 100 }}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 14 }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};




export default Signup;
