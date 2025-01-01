import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo and Title */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>OPTIMAL State of Living</Text>

      {/* Settings Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ChangeUserSettings')}
      >
        <Text style={styles.buttonText}>Change User Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SetCheckInNotifications')}
      >
        <Text style={styles.buttonText}>Set Check in Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ShareWith')}
      >
        <Text style={styles.buttonText}>Share With</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Light blue background matching Login page
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
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196f3', // Blue button
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '85%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
