import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';

const colorMap = {
  Yellow: '#ebae34',
  Red: 'red',
  Violet: '#5834eb',
  White: 'gray',
};

export default function ViewHistory({ navigation }) {
  const [history, setHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(collection(firestore, 'Assessments'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);

          const allHistory = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();

            if (data?.state && Array.isArray(data.state)) {
              const { state, lastDateUpdate } = data;

              // Format the entry for display
              allHistory.push({
                time: lastDateUpdate
                  ? new Date(lastDateUpdate.seconds * 1000).toISOString() // Use ISO format for sorting
                  : 'Unknown Time',
                status: state.map((color) => ({ color })), // Convert state to color objects
              });
            } else {
              console.warn('Invalid document structure:', data);
            }
          });

          // Sort the history by time (most recent first)
          allHistory.sort((a, b) => (a.time < b.time ? 1 : -1));

          setHistory(allHistory);
        } else {
          throw new Error('User not authenticated');
        }
      } catch (error) {
        console.error('Error fetching history:', error);
        setErrorMessage('Error fetching history: ' + error.message);
      }
    };

    fetchHistory();
  }, []);

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyRow}>
      <Text style={styles.historyTime}>
        {item.time !== 'Unknown Time' ? new Date(item.time).toLocaleString() : item.time}
      </Text>
      <View style={styles.statusContainer}>
        {item.status &&
          item.status.map((status, index) => (
            <View
              key={index}
              style={[
                styles.statusBox,
                { backgroundColor: colorMap[status.color] || '#000' }, // Map color name to actual color
              ]}
            >
              <Text style={styles.statusText}>{status.color}</Text>
            </View>
          ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderHistoryItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No history available</Text>}
        />
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('PatientPage')}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyTime: {
    fontSize: 16,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBox: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#ff9800',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
