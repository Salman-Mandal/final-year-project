// src/Profile.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://tbuddy-back.onrender.com/api/v1/me', {
          headers: {
            Authorization: token,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00BFFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_640.png' }}
        style={styles.profileImage}
      />
      <View style={styles.profileCard}>
        <Text style={styles.name}>{user.fullname}</Text>
        <Text style={styles.subtitle}>Tea Garden Farmer</Text>
        <View style={styles.iconRow}>
          <Ionicons name="heart" size={24} color="purple" />
          <Ionicons name="mail" size={24} color="purple" />
        </View>
        <Text style={styles.distance}>Location: {user.location || 'Unknown'}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>About me</Text>
        <Text style={styles.aboutText}>
          Hello! I am {user.fullname}, a dedicated tea garden farmer with {user.experience || 'several'} years of experience. I specialize in cultivating high-quality tea leaves. Feel free to reach out to me for more information or if you want to collaborate!
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Tea Garden Insights</Text>
        <View style={styles.portfolioRow}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1579647401647-317ea5ea1b92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fHRlYSUyMGZhcm18ZW58MHx8fHwxNjQ0MjgwMzI2&ixlib=rb-1.2.1&q=80&w=400' }} style={styles.portfolioImage} />
          <Image source={{ uri: 'https://images.unsplash.com/photo-1558394428-d7414a0f29d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDZ8fHRlYSUyMGZhcm18ZW58MHx8fHwxNjQ0MjgwMzI2&ixlib=rb-1.2.1&q=80&w=400' }} style={styles.portfolioImage} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: '100%',
    height: 300,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginVertical: 10,
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
  },
  portfolioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portfolioImage: {
    width: '48%',
    height: 150,
    borderRadius: 10,
  },
});

export default Profile;
