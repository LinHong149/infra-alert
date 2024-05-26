import { Image, Platform } from 'react-native';
import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const router = useRouter();
  const handleRouter = () => {
    router.push('/search');
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleRouter}>
            <Image
            source={{ uri: 'https://cdn2.iconfinder.com/data/icons/arrows-part-1/32/tiny-arrow-left-1-512.png' }}
            style={styles.arrow}
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>InfraAlert</Text>
      </View>

      <ScrollView horizontal pagingEnabled style={styles.galleryContainer}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy25Wk_hB1lGdraI90qMJIiw89_mePf1EcAQ&s' }}
          style={styles.photos}
        />
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx6R2sTn6E1MYj58DWdaBFLUqqXWxIDXRzfA&s' }}
          style={styles.photos}
        />
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRipMq_HOpJzhR8e-9U_-rtIlPlrCuG2wz6Vw&s' }}
          style={styles.photos}
        />
      </ScrollView>

      <View style={styles.info}>
        <Text style={styles.title}>Pot hole on highway</Text>
        <Text style={styles.location}>Toronto, ON</Text>
        <View style={styles.row}>
            <Text style={styles.urgency}>Urgency Level: </Text>
            <Text style={[styles.urgency, styles.red]}>High</Text>
        </View>
        <Text style={styles.description}>Pot holes on the streets cause delay in traffic.</Text>
        
        <TouchableOpacity style={styles.addButton} onPress={handleRouter}>
          <Text style={styles.buttonText}>Add to fix</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    gap: 5
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
  galleryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  photos: {
    width: 380,
    height: 400,
    marginRight: 10,
    borderRadius: 10,
  },
  info: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },

    //   INFO
    title: {
        fontSize: 30,
        fontFamily: 'Inter_700Bold',
    },
    location: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    urgency: {
        fontSize: 30,
        fontFamily: 'Inter_700Bold',
    },
    description: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    row: {
        flex: 1,
        flexDirection: "row"
    },
    red: {
        color: "#F72538"
    },
  
    // BUTTON
  addButton: {
    backgroundColor: '#282D33',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },

  arrow: {
    borderRadius: 100,
    height: 20,
    width: 20,
  },
});

