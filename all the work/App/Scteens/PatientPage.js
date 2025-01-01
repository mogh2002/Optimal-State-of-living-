import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { getDoc, doc, query, collection, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function PatientPage({ navigation }) {
  const [userName, setUserName] = useState('');
  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userDoc = await getDoc(doc(firestore, 'users', user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUserName(userData.firstName || 'Guest');

              const assessmentDoc = await getDoc(doc(firestore, 'Assessments', user.uid));
              setState(assessmentDoc.exists() ? assessmentDoc.data().state || [] : []);
            } else {
              console.log('User document not found');
              Alert.alert('Error', 'User data not found.');
            }
          } else {
            console.log('No user is signed in');
          }
        });
        return () => unsubscribe(); // Clean up subscription on unmount
      } catch (error) {
        console.error('Error fetching user details:', error);
        Alert.alert('Error', 'Unable to fetch user details.');
      }
    };

    fetchUserDetails();
  }, []);

  const handleViewExercises = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'User is not authenticated.');
        return;
      }
  
      // جلب جميع المستندات في مجموعة Assessments بدون استخدام orderBy
      const assessmentsCollection = collection(firestore, 'Assessments');
      const q = query(
        assessmentsCollection,
        where('email', '==', user.email) // فلترة فقط بالإيميل
      );
  
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        Alert.alert('Error', 'No assessments found. Please take an assessment first.');
        navigation.navigate('TakeAssessment');
        return;
      }
  
      // تصفية البيانات محليًا لاختيار أحدث تقييم
      let latestAssessment = null;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!latestAssessment || (data.lastDateUpdate && data.lastDateUpdate.seconds > latestAssessment.lastDateUpdate.seconds)) {
          latestAssessment = data;
        }
      });
  
      if (!latestAssessment || !latestAssessment.state || latestAssessment.state.length === 0) {
        Alert.alert('Error', 'No exercises found in the latest assessment.');
        return;
      }
  
      navigation.navigate('ViewCurrentExercises', { state: latestAssessment.state });
    } catch (error) {
      console.error('Error fetching assessments:', error);
      Alert.alert('Error', 'Failed to fetch assessment data.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>OPTIMAL State of Living</Text>
      <Text style={styles.subtitle}>Powered by CODE&LOAD</Text>
      <Text style={styles.welcomeMessage}>
        Welcome, <Text style={styles.userName}>{userName}</Text>!
      </Text>

      <TouchableOpacity
        style={[styles.button, styles.greenButton]}
        onPress={() => navigation.navigate('TakeAssessment', { state: [] })}
      >
        <Text style={styles.buttonText}>Take Assessment</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.blueButton]}
        onPress={handleViewExercises}
      >
        <Text style={styles.buttonText}>View Current Exercises</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.blueButton]}
        onPress={() => navigation.navigate('ViewHistory')}
      >
        <Text style={styles.buttonText}>View History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.orangeButton]}
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
  welcomeMessage: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
  },
  userName: {
    color: 'blue',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#ffcc80',
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
