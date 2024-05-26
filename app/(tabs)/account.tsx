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
        <Text style={styles.headerText}>InfraAlert</Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScrollView}
      >
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Current Points</Text>
          <Text style={styles.widgetContent}>2,405</Text>
          <Text style={styles.widgetMiniContent}>+20% this month</Text>
        </View>

        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Top Score</Text>
          <Text style={styles.widgetContent}>4,567</Text>
          <Text style={styles.widgetMiniContent}>+33% this month</Text>
        </View>
        
      </ScrollView>


      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Tasks</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScrollView}
          >
          <View style={styles.taskWidget}>
            <View style={styles.progress}>
              <Text>2/10</Text>
            </View>
            <View style={styles.taskTexts}>
              <Text style={styles.taskWidgetTitle}>Find 10 Potholes</Text>
              <Text style={styles.taskWidgetPoints}>+50 points</Text>
            </View>
          </View>
          <View style={[styles.taskWidget, styles.blueTask]}>
            <View style={styles.progress}>
              <Text>2/10</Text>
            </View>
            <View style={styles.taskTexts}>
              <Text style={[styles.taskWidgetTitle, styles.blueTask]}>Find 10 Potholes</Text>
              <Text style={[styles.taskWidgetPoints, styles.blueTask]}>+50 points</Text>
            </View>
          </View>
          <View style={[styles.taskWidget, styles.yellowTask]}>
            <View style={styles.progress}>
              <Text>2/10</Text>
            </View>
            <View style={styles.taskTexts}>
              <Text style={[styles.taskWidgetTitle, styles.yellowTask]}>Find 10 Potholes</Text>
              <Text style={[styles.taskWidgetPoints, styles.yellowTask]}>+50 points</Text>
            </View>
          </View>
          <View style={[styles.taskWidget, styles.yellowTask]}>
            <View style={styles.progress}>
              <Text>2/10</Text>
            </View>
            <View style={styles.taskTexts}>
              <Text style={[styles.taskWidgetTitle, styles.yellowTask]}>Find 10 Potholes</Text>
              <Text style={[styles.taskWidgetPoints, styles.yellowTask]}>+50 points</Text>
            </View>
          </View>
        </ScrollView>
      </View>


      <View style={styles.leaderboardContainer}>
        <Text style={styles.sectionHeader}>Leaderboard</Text>
        <View
          >
          <View style={styles.row}>
            <Image
              source={{ uri: 'https://i.pinimg.com/originals/2e/3f/3d/2e3f3dd117098b5e442bcb77681e7034.png' }}
              style={styles.avatar}
            />
            <Text style={styles.names}>Helena Hills</Text>
          </View>
          <View style={styles.row}>
            <Image
              source={{ uri: 'https://i.pinimg.com/originals/2e/3f/3d/2e3f3dd117098b5e442bcb77681e7034.png' }}
              style={styles.avatar}
            />
            <Text style={styles.names}>Helena Hills</Text>
          </View>
          <View style={styles.row}>
            <Image
              source={{ uri: 'https://i.pinimg.com/originals/2e/3f/3d/2e3f3dd117098b5e442bcb77681e7034.png' }}
              style={styles.avatar}
            />
            <Text style={styles.names}>Helena Hills</Text>
          </View>
          <View style={styles.row}>
            <Image
              source={{ uri: 'https://i.pinimg.com/originals/2e/3f/3d/2e3f3dd117098b5e442bcb77681e7034.png' }}
              style={styles.avatar}
            />
            <Text style={styles.names}>Helena Hills</Text>
          </View>
          <View style={styles.row}>
            <Image
              source={{ uri: 'https://i.pinimg.com/originals/2e/3f/3d/2e3f3dd117098b5e442bcb77681e7034.png' }}
              style={styles.avatar}
            />
            <Text style={styles.names}>Helena Hills</Text>
          </View>
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
  widget: {
    flex: 1,
    // alignItems: "center", 
    justifyContent: "center",
    width: width - 100, // Account for padding
    borderRadius: 15,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Inter_700Bold',
  },
  widgetContent: {
    fontFamily: 'Inter_700Bold',
    fontSize: 48,
    paddingBottom: 8
  },
  widgetMiniContent: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#6c757d',
  },


  sectionContainer: {
    marginVertical: 30,
    flex: 1,
    gap: 10
  },
  sectionHeader: {
    marginHorizontal: 8,
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
  },

  // TASK WIDGET

  taskWidget: {
    flex: 1,
    gap: 14,
    // alignItems: "center", 
    justifyContent: "center",
    width: 150, // Account for padding
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginHorizontal: 8,
    backgroundColor: "#1E1E1E"
  },
  progress: {
    height: 50,
    width: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 100
  },
  taskTexts: {
    flex: 1,
  },
  taskWidgetTitle: {
    fontSize: 18,
    marginBottom: 2,
    fontFamily: 'Inter_400Regular',
    color: "#FFFFFF"
  },
  taskWidgetPoints: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    paddingBottom: 8,
    opacity: 0.8,
    color: "#FFFFFF"
  },
  blueTask: {
    backgroundColor: "#CCE6ED",
    color: "#3A4F58"
  },
  yellowTask: {
    backgroundColor: "#F4DBB7",
    color: "#3A4F58"
  },

  // LEADERBOARD
  leaderboardContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  row: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 20
  },
  names: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
  avatar: {
    borderRadius: 100,
    height: 45,
    width: 45,
  }




});