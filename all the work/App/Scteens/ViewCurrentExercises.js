import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function ViewCurrentExercises({ route, navigation }) {
  const state = route?.params?.state || []; // Safely access state with a default empty array

  useEffect(() => {
    console.log('Received state:', state); // Debugging: log the state
    if (!state || state.length === 0) {
      Alert.alert(
        'EXERCISES',
        'No exercises found. Please take an assessment first.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('TakeAssessment'),
          },
        ]
      );
    }
  }, [state, navigation]);

  // Fallback screen if state is invalid
  if (!state || state.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No Exercises Found</Text>
        <TouchableOpacity
          style={[styles.button, styles.blueButton]}
          onPress={() => navigation.navigate('TakeAssessment')}
        >
          <Text style={styles.buttonText}>Take Assessment</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>OPTIMAL State of Living</Text>
      <Text style={styles.subtitle}>Powered by CODE&LOAD</Text>
      <Text style={styles.header}>EXERCISES</Text>

      <TouchableOpacity
        style={[styles.button, styles.greenButton]}
        onPress={() => navigation.navigate('BreathingExercise', { state })}
      >
        <Text style={styles.buttonText}>Breathing Exercise</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.blueButton]}
        onPress={() => navigation.navigate('OtherExercises', { state })}
      >
        <Text style={styles.buttonText}>MOVIES</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.blueButton]}
        onPress={() => navigation.navigate('RecommendedFoods', { state })}
      >
        <Text style={styles.buttonText}>Recommended Foods</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.orangeButton]}
        onPress={() => navigation.navigate('WatchVideo', { state })}
      >
        <Text style={styles.buttonText}>Watch Video</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 16,
  },
  logo: {
    width: 270,
    height: 110,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 40,
    color: '#666',
    fontStyle: 'italic',
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '85%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  greenButton: {
    backgroundColor: '#4caf50',
  },
  blueButton: {
    backgroundColor: '#2196f3',
  },
  orangeButton: {
    backgroundColor: '#ff9800',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
