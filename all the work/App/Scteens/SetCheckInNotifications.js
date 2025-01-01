import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SetCheckInNotifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Set Check in Notifications Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});