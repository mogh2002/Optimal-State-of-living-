import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChangeUserSettings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Change User Settings Page</Text>
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