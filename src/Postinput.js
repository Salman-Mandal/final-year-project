import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const PostInput = () => {
  const navigation = useNavigation();
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'You need to allow image picker permission in settings');
      }
    })();
  }, []);

  const pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const submitPostHandler = () => {
    if (!selectedImage || !caption.trim()) {
      Alert.alert('Incomplete Post', 'Please select an image and add a caption.');
      return;
    }

    console.log('Post Submitted:', { image: selectedImage, caption });
    navigation.goBack(); // Navigate back to News screen after posting
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New Post</Text>
      <TouchableOpacity onPress={pickImageHandler} style={styles.imagePicker}>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.placeholderText}>Select an image</Text>
          )}
        </View>
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your caption"
        value={caption}
        onChangeText={setCaption}
        multiline
        numberOfLines={5}
      />
      <TouchableOpacity style={styles.button} onPress={submitPostHandler}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#b5ca75', // Light gray background for a modern, clean look
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Darker color for text contrast
  },
  imagePicker: {
    width: '100%',
    height: 250,
    borderWidth: 1,
    borderColor: '#b3b3b3', // Light gray border for a modern touch
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White background for image picker
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '98%',
    height: '98%',
    borderRadius: 15,
  },
  placeholderText: {
    color: '#b3b3b3', // Light gray text for subtle contrast
    fontSize: 18,
  },
  textInput: {
    width: '100%',
    height: 120,
    borderColor: '#b3b3b3', // Light gray border
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff', // White background for text input
    color: '#333', // Dark text color for contrast
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#0073e6', // Vibrant blue for button
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PostInput;

