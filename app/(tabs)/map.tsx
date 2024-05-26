import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';


export default function App() {
  
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [search, setSearch] = useState('');
  const mapRef = useRef<MapView | null>(null);
  


  const router = useRouter();
  const handleRouter = () => {
    router.push('/search');
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
        setRegion({
          ...region,
          latitude,
          longitude,
        });
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }, 1000);
        }
        setLocation({ latitude, longitude });
      }
    } catch (error) {
      console.log('Error searching location:', error);
    }
  };
  

  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <View style={styles.innerContianer}>

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
        </View>
        <MapView
            ref={mapRef}
            style={styles.map}
            region={region}
            onRegionChangeComplete={(region) => setRegion(region)}
        >
            {location && (
            <Marker coordinate={location} />
            )}
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    // paddingTop: 60,
  },
  inputContainer: {
    position: "absolute",
    top: 10,
    left: 0,
    width: "100%",
    zIndex: 100,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    gap: 20
  },
  input: {
    height: 40,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    // paddingHorizontal: 10,
    // margin: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "70%",
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  searchButton: {
    height: 40,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CCE6ED",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  map: {
    flex: 1,
  },

  arrow: {
    borderRadius: 100,
    height: 20,
    width: 20,
  },
  innerContianer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  }
});
