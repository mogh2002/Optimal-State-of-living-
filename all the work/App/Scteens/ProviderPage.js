import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProviderPage({ navigation }) {
  const [providerName, setProviderName] = useState('');

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const providerDoc = await getDoc(doc(firestore, 'Provider', user.uid));
            if (providerDoc.exists()) {
              const providerData = providerDoc.data();
              setProviderName(providerData.firstName); // Set the provider's first name
            }
          }
        });
      } catch (error) {
        console.error('Error fetching provider details:', error);
      }
    };
    fetchProviderDetails();
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('./../../assets/logo.png')} style={styles.logo} />

      {/* Welcome Message */}
      <Text style={styles.title}>Welcome, {providerName}!</Text>

      {/* Buttons */}
      <TouchableOpacity
        style={[styles.button, styles.addClientButton]}
        onPress={() => navigation.navigate('AddClient')}
      >
        <Text style={styles.buttonText}>Add Client</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.removeClientButton]}
        onPress={() => navigation.navigate('RemoveClient')}
      >
        <Text style={styles.buttonText}>Remove Client</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.viewClientsButton]}
        onPress={() => navigation.navigate('ViewClient')}
      >
        <Text style={styles.buttonText}>View Clients</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.settingsButton]}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Same background as other pages
    padding: 20,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
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
  addClientButton: {
    backgroundColor: '#4caf50', // Green
  },
  removeClientButton: {
    backgroundColor: '#2196f3', // Blue
  },
  viewClientsButton: {
    backgroundColor: '#2196f3', // Blue
  },
  settingsButton: {
    backgroundColor: '#ff9800', // Orange
  },
});
