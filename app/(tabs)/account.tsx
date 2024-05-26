import { Image, Platform } from 'react-native';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Image
              source={{ uri: 'https://i.pinimg.com/originals/2e/3f/3d/2e3f3dd117098b5e442bcb77681e7034.png' }}
              style={styles.avatar}
        />
        <Text style={styles.headerText}>Edit profile picture</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.categoryContainer}>
            <Text style={styles.category}>Name</Text>
            <Text style={styles.content}>Helena Hills</Text>
            <Image
              source={{ uri: 'https://www.clipartmax.com/png/small/282-2826625_short-arrow-right-svg-png-icon-free-download-487639-slider-arrow-icon.png' }}
              style={styles.arrow}
            />
        </View>
        <View style={styles.categoryContainer}>
            <Text style={styles.category}>Username</Text>
            <Text style={styles.content}>@helenahills</Text>
            <Image
              source={{ uri: 'https://www.clipartmax.com/png/small/282-2826625_short-arrow-right-svg-png-icon-free-download-487639-slider-arrow-icon.png' }}
              style={styles.arrow}
            />
        </View>
        <View style={styles.categoryContainer}>
            <Text style={styles.category}>Email</Text>
            <Text style={styles.content}>helena.hills@gmail.com</Text>
            <Image
              source={{ uri: 'https://www.clipartmax.com/png/small/282-2826625_short-arrow-right-svg-png-icon-free-download-487639-slider-arrow-icon.png' }}
              style={styles.arrow}
            />
        </View>
        <View style={styles.categoryContainer}>
            <Text style={styles.category}>Points</Text>
            <Text style={styles.content}>2,405</Text>
            <Image
              source={{ uri: 'https://www.clipartmax.com/png/small/282-2826625_short-arrow-right-svg-png-icon-free-download-487639-slider-arrow-icon.png' }}
              style={styles.arrow}
            />
        </View>
        <View style={styles.categoryContainer}>
            <Text style={styles.category}>Bio</Text>
            <Text style={styles.content}>Hi, I'm Helena, a taxi driver</Text>
            <Image
              source={{ uri: 'https://www.clipartmax.com/png/small/282-2826625_short-arrow-right-svg-png-icon-free-download-487639-slider-arrow-icon.png' }}
              style={styles.arrow}
            />
        </View>
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
    backgroundColor: "#FFFFFF"
  },
  nav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
  },
  titleText: {
    fontSize: 30,
  },
  header: {
    marginBottom: 24,
    flex: 1,
    alignItems: "center",
    gap: 10
  },
  headerText: {
    fontSize: 18,
    // textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    color: "#0D99FF",
  },
  horizontalScrollView: {
    flexDirection: 'row',
  },
  avatar: {
    borderRadius: 100,
    height: 100,
    width: 100,
  },

//   CATEGORY

  infoContainer: {
    marginTop: 30,
    flex: 1,
    flexDirection: "column",
    gap: 40,
    padding: 10,
  },
  categoryContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  category: {
    width: 100,
    fontSize: 18,
  },
  content: {
    width: 240,
    fontSize: 18,
  },
  arrow: {
    width: 10,
    height: 15,
  }




});