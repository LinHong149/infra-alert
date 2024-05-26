import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, ScrollView, Dimensions, TextInput, TouchableOpacity, Button } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const [problemType, setProblemType] = useState('');
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleTakePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleChooseLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location);
    setLocation(`Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView style={styles.container}>
    <View>

      <View style={styles.header}>
        <Text style={styles.headerText}>Report a problem</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Problem Type</Text>
        <Picker
          selectedValue={problemType}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setProblemType(itemValue)}
          >
          <Picker.Item label="Select a problem type" value="" />
          <Picker.Item label="Pothole" value="pothole" />
          <Picker.Item label="Fallen Tree" value="fallen_tree" />
          <Picker.Item label="Broken Traffic Lights" value="broken_traffic_lights" />
          <Picker.Item label="Missing Street Signs" value="missing_street_signs" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
          />
        <TouchableOpacity style={styles.locationButton} onPress={handleChooseLocation}>
          <Text style={styles.buttonText}>Use Current Location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Upload Pictures</Text>
        <TouchableOpacity style={styles.locationButton} onPress={handleTakePicture}>
            <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
    paddingTop: 60,
    paddingBottom: 100,
    flex: 1,
    padding: 26,
    flexDirection: "column",
    backgroundColor: '#FFFFFF'
  },
  header: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    fontFamily: 'Inter_400Regular',

    borderColor: '#E8E8E8',
    // paddingHorizontal: 10,
    // margin: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "100%",
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: "#D1E5EC",
    borderRadius: 2,
  },
  locationButton: {
    backgroundColor: '#F0DCBB',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#282D33',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});
