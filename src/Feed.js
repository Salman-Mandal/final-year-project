import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostInput from './Postinput'; // Assuming PostInput is in the same directory

const News = () => {
  const demoNewsData = [
    {
      id: '1',
      user: 'Tea Enthusiast 1',
      location: 'Assam, India',
      // title: 'Discover the Art of Tea Making',
      content: 'Learn the secrets of brewing the perfect cup of tea and explore different tea varieties.',
      imageUrl: 'https://t4.ftcdn.net/jpg/01/19/53/91/360_F_119539118_xCAWjd9Z6Meel3jbchd7u7F9QseNa8zO.jpg',
      dpUrl: 'https://as1.ftcdn.net/v2/jpg/04/32/15/18/1000_F_432151892_oQ3YQDo2LYZPILlEMnlo55PjjgiUwnQb.jpg',
      link: 'https://your-tea-article-link-1',
    },
    {
      id: '2',
      user: 'Tea Lover 2',
      location: 'Darjeeling, India',
      // title: 'Benefits of Green Tea',
      content: 'Explore the health benefits of green tea, from antioxidants to metabolism-boosting properties.',
      imageUrl: 'https://c8.alamy.com/comp/ET020C/women-plucking-fresh-tea-leaves-from-tea-garden-assam-india-asia-ET020C.jpg',
      dpUrl: 'https://as2.ftcdn.net/v2/jpg/06/30/06/81/1000_F_630068155_RnZI6mC91wz7gUYFVmhzwpl4O6x00Cbh.jpg',
      link: 'https://your-tea-article-link-2',
    },
    {
      id: '3',
      user: 'Tea Explorer 3',
      location: 'Munnar, India',
      title: 'Tea Recipes for Relaxation',
      content: 'Try out these soothing tea recipes that can help you unwind and relax after a long day.',
      imageUrl: 'https://source.unsplash.com/random/1920x1080/?teagarden',
      dpUrl: 'https://source.unsplash.com/random/100x100/?person',
      link: 'https://your-tea-article-link-3',
    },
    {
      id: '4',
      user: 'Tea Connoisseur 4',
      location: 'Kolkata, India',
      title: 'Black Tea Tasting Guide',
      content: 'Embark on a journey to discover the rich flavors of black tea with our comprehensive tasting guide.',
      imageUrl: 'https://source.unsplash.com/random/1920x1080/?blacktea',
      dpUrl: 'https://source.unsplash.com/random/100x100/?person',
      link: 'https://your-tea-article-link-4',
    },
    {
      id: '5',
      user: 'Tea Aficionado 5',
      location: 'Nilgiri Hills, India',
      title: 'Chai Time Traditions',
      content: 'Explore the cultural significance and traditions associated with chai time in different regions of India.',
      imageUrl: 'https://source.unsplash.com/random/1920x1080/?chai',
      dpUrl: 'https://source.unsplash.com/random/100x100/?person',
      link: 'https://your-tea-article-link-5',
    },
    {
      id: '6',
      user: 'Tea Enthusiast 6',
      location: 'Himalayas, India',
      title: 'Oolong Tea: A Balanced Brew',
      content: 'Dive into the world of Oolong tea and learn about its unique characteristics and health benefits.',
      imageUrl: 'https://source.unsplash.com/random/1920x1080/?oolong',
      dpUrl: 'https://source.unsplash.com/random/100x100/?person',
      link: 'https://your-tea-article-link-6',
    },
    {
      id: '7',
      user: 'Tea Lover 7',
      location: 'Coorg, India',
      title: 'Herbal Infusions for Wellness',
      content: 'Discover the therapeutic properties of herbal infusions and how they contribute to overall wellness.',
      imageUrl: 'https://source.unsplash.com/random/1920x1080/?herbal',
      dpUrl: 'https://source.unsplash.com/random/100x100/?person',
      link: 'https://your-tea-article-link-7',
    },
    {
      id: '8',
      user: 'Tea Explorer 8',
      location: 'Sikkim, India',
      title: 'White Tea Delicacies',
      content: 'Indulge in the delicate flavors of white tea and explore recipes that showcase its subtle taste profile.',
      imageUrl: 'https://source.unsplash.com/random/1920x1080/?whitetea',
      dpUrl: 'https://source.unsplash.com/random/100x100/?person',
      link: 'https://your-tea-article-link-8',
    },
    {
      id: '9',
      user: 'Tea Connoisseur 9',
      location: 'Manipur, India',
      title: 'Artisanal Tea Blends',
      content: 'Uncover the world of artisanal tea blends and how skilled artisans create unique and flavorful combinations.',
      imageUrl: 'https://source.unsplash.com/random/1920x1080/?artisanal',
      dpUrl: 'https://source.unsplash.com/random/100x100/?person',
      link: 'https://your-tea-article-link-9',
    },
    {
      id: '10',
      user: 'Tea Aficionado 10',
      location: 'Rajasthan, India',
      title: 'Masala Chai Magic',
      content: 'Experience the magic of masala chai with authentic recipes and the cultural significance of this beloved beverage.',
      imageUrl: 'https://source.unsplash.com/random/1920x1080/?masalachai',
      dpUrl: 'https://source.unsplash.com/random/100x100/?person',
      link: 'https://your-tea-article-link-10',
    },
  ];
  const navigation = useNavigation();

  const navigateToPostInput = () => {
    navigation.navigate('PostInput'); // Navigate to the PostInput screen
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={demoNewsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.newsItem}>
            <View style={styles.userContainer}>
              <Image source={{ uri: item.dpUrl }} style={styles.userImage} />
              <View>
                <Text style={styles.userName}>{item.user}</Text>
                <Text style={styles.userLocation}>{item.location}</Text>
              </View>
            </View>
            <Image source={{ uri: item.imageUrl }} style={styles.newsImage} />
            <View style={styles.newsTextContainer}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsContent}>{item.content}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
      />
      <TouchableOpacity style={styles.createPostButton} onPress={navigateToPostInput}>
        <Ionicons name="add-circle-outline" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flatListContent: {
    paddingBottom: 100,
  },
  createPostButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'tomato',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  newsItem: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    margin: 8,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userLocation: {
    fontSize: 14,
    color: '#777',
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  newsTextContainer: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  newsContent: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default News;
