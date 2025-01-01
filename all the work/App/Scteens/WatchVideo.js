import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';

const videos = {
  Red: [{ title: 'Relaxation Techniques', url: 'https://youtu.be/muDQm3S7mEI' }],
  White: [{ title: 'Inspirational Talk', url: 'https://youtu.be/TQDefR0KsHY' }],
  Violet: [{ title: 'Guided Meditation', url: 'https://youtu.be/v-l0Tj0PdfM' }],
  Yellow: [{ title: 'Skill Building', url: 'https://youtu.be/GEbhAT193lM' }],
};

const titleColors = {
  Red: '#ff4c4c',
  White: '#808080',
  Violet: '#7a42f4',
  Yellow: '#ffd700',
};

export default function WatchVideo({ route }) {
  const { state = [] } = route.params || []; // Ensure state is an array
  const videoLinks = state
    .flatMap((color) => videos[color] || [])
    .map((video, index) => ({ ...video, color: state[index] }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Videos to Watch</Text>
      <ScrollView style={styles.scrollContainer}>
        {videoLinks.map((video, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(video.url)}
            style={styles.videoContainer}
          >
            <Text style={[styles.videoLink, { color: titleColors[video.color] }]}>
              {video.title} ({video.color})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
  },
  videoContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  videoLink: {
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
