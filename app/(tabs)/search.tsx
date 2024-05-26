import React, { useState } from 'react';
import { Image, Platform, StyleSheet, View, Text, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';


import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const router = useRouter();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);


  const handleNavigateToMap = () => {
    router.push('/map');
  };
  const handleNavigateToIncident = () => {
    router.push('/incident');
  };

  const handleSearch = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let geocode = await Location.geocodeAsync(search);
      if (geocode.length > 0) {
        const { latitude, longitude } = geocode[0];
        setLocation({
          latitude,
          longitude,
        });
        console.log(`Location: ${latitude}, ${longitude}`);
      }
    } catch (error) {
      console.log('Error searching location:', error);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const getUrgencyStyle = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'low':
        return styles.lowUrgency;
      case 'medium':
        return styles.mediumUrgency;
      case 'high':
        return styles.highUrgency;
      default:
        return {};
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Find something to fix</Text>
      </View>

      <View style={styles.outterInputContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            value={search}
            onChangeText={setSearch}
            />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleNavigateToMap}>
          <Text style={styles.buttonText}>Search through maps</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.itemContainer}>
          <Text style={[styles.location, styles.lowOpacity]}>Location</Text>
          <Text style={[styles.problem, styles.lowOpacity]}>Problem</Text>
          <Text style={[styles.urgency, styles.lowOpacity]}>Urgency</Text>
        </View>
        <View style={styles.line} />
        {[
          { location: 'TO, ON', problem: 'Pot hole on highway', urgency: 'High' },
          { location: 'HA, ON', problem: 'Pot hole', urgency: 'Medium' },
          { location: 'TO, ON', problem: 'Fallen Traffic Sign', urgency: 'Low' },
          { location: 'BR, ON', problem: 'Broken Traffic Lights', urgency: 'High' },
          { location: 'HA, ON', problem: 'Pot hole', urgency: 'Medium' },
          { location: 'HA, ON', problem: 'Fallen Tree', urgency: 'Low' },
          { location: 'TO, ON', problem: 'Pot hole', urgency: 'Low' },
          { location: 'TO, ON', problem: 'Missing Street Signs', urgency: 'High' },
          { location: 'HA, ON', problem: 'Sunknen Road', urgency: 'Medium' },
          { location: 'HA, ON', problem: 'Fallen Pole', urgency: 'High' },
        ].map((item, index) => (
          <View key={index} style={styles.outterContainer}>
            <TouchableOpacity style={styles.itemContainer} onPress={handleNavigateToIncident}>
              <Text style={styles.location}>{item.location}</Text>
              <Text style={styles.problem}>{item.problem}</Text>
              <Text style={[styles.urgency, getUrgencyStyle(item.urgency)]}>{item.urgency}</Text>
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 100,
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  nav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 30,
  },
  header: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    // textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: 'Inter_700Bold',
  },
  horizontalScrollView: {
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  searchButton: {
    backgroundColor: '#CCE6ED',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 15,
    padding: 10,
    width: '100%',
  },
  outterContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 15
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    width: 100,
  },
  problem: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    width: 200,
  },
  urgency: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    width: 80,
  },
  line: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  lowOpacity: {
    opacity: 0.6,
  },
  lowUrgency: {
    color: '#86DC43',
  },
  mediumUrgency: {
    color: '#FAC230',
  },
  highUrgency: {
    color: '#F72538',
  },


  outterInputContainer: {
    flex: 1,
    paddingBottom: 30
  }
});
