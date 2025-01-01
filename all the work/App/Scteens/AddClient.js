import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { doc, setDoc, getDocs, query, where, collection, serverTimestamp } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AddClient({ navigation }) {
  const [clientEmail, setClientEmail] = useState('');
  const [clientName, setClientName] = useState('');
  const [providerEmail, setProviderEmail] = useState('');

  // Fetch provider email on mount
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const providerDoc = await getDocs(query(collection(firestore, 'Provider'), where('email', '==', user.email)));
        providerDoc.forEach((doc) => {
          const providerData = doc.data();
          setProviderEmail(providerData.email);
        });
      }
    });
    return unsubscribe;
  }, []);

  const handleSearchClient = async () => {
    try {
      if (!clientEmail.trim()) {
        Alert.alert('Error', 'Please enter a valid email.');
        return;
      }

      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where('email', '==', clientEmail.trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setClientName(`${userData.firstName.trim()} ${userData.lastName.trim()}`);
        });
      } else {
        setClientName('Client not found.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to fetch client details: ${error.message}`);
    }
  };

  const handleAddClient = async () => {
    try {
      if (!clientName || clientName === 'Client not found.') {
        Alert.alert('Error', 'Please search for a valid client before adding.');
        return;
      }

      const clientRef = collection(firestore, 'clients');
      const existingClientQuery = query(clientRef, where('userEmail', '==', clientEmail.trim()));
      const existingClientSnapshot = await getDocs(existingClientQuery);

      if (!existingClientSnapshot.empty) {
        Alert.alert('Error', 'Client already exists.');
        return;
      }

      await setDoc(doc(firestore, 'clients', `${providerEmail}_${clientEmail}`), {
        providerEmail: providerEmail,
        userEmail: clientEmail,
        clientName: clientName,
        addedAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Client added successfully!');
      setClientEmail('');
      setClientName('');
    } catch (error) {
      Alert.alert('Error', `Failed to add client: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Add Client</Text>

      <Text style={styles.inputLabel}>Enter Client Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example@domain.com"
        placeholderTextColor="#888"
        value={clientEmail}
        onChangeText={setClientEmail}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchClient}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {clientName && clientName !== 'Client not found.' && (
        <Text style={styles.clientName}>{clientName}</Text>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddClient}>
        <Text style={styles.buttonText}>Add Client</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
    backgroundColor: '#f0f8ff',
    padding: 16,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    width: '85%',
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '85%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  clientName: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#555',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#ff9800',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '85%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '85%',
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
