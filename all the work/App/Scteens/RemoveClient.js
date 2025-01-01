import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import { collection, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function RemoveClientPage({ navigation }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [providerEmail, setProviderEmail] = useState('');

  useEffect(() => {
    const fetchProviderEmail = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setProviderEmail(user.email); // حفظ بريد البروفايدر
        }
      });
    };

    fetchProviderEmail();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      if (!providerEmail) return; // انتظار تحميل بريد البروفايدر

      try {
        const q = query(
          collection(firestore, 'clients'),
          where('providerEmail', '==', providerEmail)
        );

        const querySnapshot = await getDocs(q);
        const clientsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setClients(clientsList);
      } catch (error) {
        console.error('Error fetching clients:', error);
        Alert.alert('Error', 'Failed to fetch clients.');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [providerEmail]);

  const handleRemoveClient = async (client) => {
    try {
      await deleteDoc(doc(firestore, 'clients', client.id));
      setClients((prevClients) => prevClients.filter((item) => item.id !== client.id));
      Alert.alert('Success', `${client.clientName} (${client.userEmail}) has been removed successfully!`);
    } catch (error) {
      console.error('Error removing client:', error);
      Alert.alert('Error', 'Failed to remove client.');
    }
  };

  const renderClient = ({ item }) => (
    <View style={[styles.clientContainer, styles.clientBackground]}>
      <View style={styles.clientDetails}>
        <Text style={styles.clientText}>
          Name: {item.clientName && item.clientName.trim() !== '' ? item.clientName : 'No Name Provided'}
        </Text>
        <Text style={styles.clientText}>Email: {item.userEmail || 'No Email Available'}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveClient(item)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('./../../assets/logo.png')} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Remove Client</Text>

      {/* Client List */}
      {loading ? (
        <Text>Loading clients...</Text>
      ) : clients.length === 0 ? (
        <Text style={styles.noClientsText}>No clients available to remove.</Text>
      ) : (
        <FlatList
          data={clients}
          renderItem={renderClient}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* Back Button */}
      <TouchableOpacity
        style={[styles.button, styles.backButton]}
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
    backgroundColor: '#f0f8ff',
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
  clientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  clientBackground: {
    backgroundColor: '#2196f3', // Same blue color as the Remove Client button
  },
  clientDetails: {
    flex: 1,
  },
  clientText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#ff9800',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noClientsText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});
