import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const breathingExercises = {
  White: [
    {
      title: '4-7-8 Breathing',
      description: `
        1-Sit or lie down in a quiet space.

        2-Inhale deeply through your nose for 4 
        seconds.

        3-Hold your breath for 7 seconds.

        4-Exhale slowly through your mouth for 8 
        seconds.

        **This pattern slows your heart rate and centers your focus. Repeat 4 times.**
      `,
    },
  ],
  Violet: [
    {
      title: 'Box Breathing',
      description: `
        1-Sit upright and close your eyes.

        2-Inhale through your nose for 4 seconds.

        3-Hold your breath for 4 seconds.

        4-Exhale through your mouth
            for 4 seconds.

        **Hold your breath for another 4 seconds 
          before repeating.**
        **Continue for 4–6 cycles to restore 
            balance and clarity.**
      `,
    },
  ],
  Red: [
    {
      title: 'Cooling Breath',
      description:
        `
        1-Sit in a comfortable position and relax 
        your shoulders.

        2-Inhale deeply through your mouth as if 
        you are sipping air through a straw.

        3-Close your mouth and exhale slowly 
        through your nose.

        4-Focus on the cooling sensation during  
        the inhale to calm heated emotions.

        **Repeat for 2–5 minutes**
      `,
    },
  ],
  Yellow: [
    {
      title: 'Mindful Breathing',
      description: `
        1-Sit comfortably and close your eyes.

        2-Breathe naturally and focus on the 
        sensation of air entering and 
        leaving your nostrils.

        3-If your mind wanders, gently guide your 
        attention back to your breath.

        4-Practice for 5–10 minutes to maintain a 
        calm and steady state.
      `,
    },
  ],
};

const titleColors = {
  White: '#808080', // Gray
  Violet: '#800080', // Purple
  Red: '#FF0000', // Red
  Yellow: '#FFD700', // Gold
};

export default function BreathingExercise({ route }) {
  const { state } = route.params;
  const exercises = state
    .flatMap((color) => breathingExercises[color] || [])
    .map((exercise, index) => ({ ...exercise, color: state[index] }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercises</Text>
      <ScrollView style={styles.exerciseContainer}>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseCard}>
            <Text style={[styles.exerciseTitle, { color: titleColors[exercise.color] }]}>
              {exercise.title}
            </Text>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
          </View>
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
    color: '#333',
    textAlign: 'center',
  },
  exerciseContainer: {
    flex: 1,
    marginTop: 10,
  },
  exerciseCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  exerciseDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});
