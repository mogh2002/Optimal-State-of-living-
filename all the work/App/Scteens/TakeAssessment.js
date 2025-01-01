import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function TakeAssessment({ navigation }) {
  const [selectedColors, setSelectedColors] = useState([]);
  const [pressedButton, setPressedButton] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            setEmail(userDoc.data().email);
          } else {
            Alert.alert('Error', 'User data not found.');
          }
        }
      });
    };
    fetchEmail();
  }, []);

  const toggleColorSelection = (color) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((item) => item !== color)
      : [...selectedColors, color];

    setSelectedColors(updatedColors);
  };

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert('Error', 'Email not found. Please try again.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        // Save a new document in Firestore
        const assessmentsCollection = collection(firestore, 'Assessments');
        await addDoc(assessmentsCollection, {
          state: selectedColors,
          email,
          userId: user.uid, // Storing user ID for easier querying
          lastDateUpdate: serverTimestamp(),
        });

        Alert.alert('Success', 'Your assessment has been saved.');
        setSelectedColors([]); // Reset state
        navigation.navigate('PatientPage'); // Navigate to patient page
      } else {
        Alert.alert('Error', 'User not authenticated.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to save status: ${error.message}`);
    }
  };

  const handleButtonPress = (button) => {
    setPressedButton(button);
    setTimeout(() => setPressedButton(null), 200); // Reset after a short delay
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select All That Apply</Text>

      {/* Emotion Wheel Image */}
      <Image
        source={require('./../../assets/states.jpeg')} // Adjust the path as needed
        style={styles.image}
      />

      {/* Buttons for Color Selection */}
      <View style={styles.colorButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.colorButton,
            { backgroundColor: 'red' },
            selectedColors.includes('Red') && styles.selectedButton,
            pressedButton === 'Red' && styles.pressedButton,
          ]}
          onPress={() => {
            toggleColorSelection('Red');
            handleButtonPress('Red');
          }}
        >
          <Text style={[styles.colorButtonText, selectedColors.includes('Red') && styles.selectedText]}>Red</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.colorButton,
            { backgroundColor: '#ebae34' },
            selectedColors.includes('Yellow') && styles.selectedButton,
            pressedButton === 'Yellow' && styles.pressedButton,
          ]}
          onPress={() => {
            toggleColorSelection('Yellow');
            handleButtonPress('Yellow');
          }}
        >
          <Text style={[styles.colorButtonText, selectedColors.includes('Yellow') && styles.selectedText]}>Yellow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.colorButton,
            { backgroundColor: '#5834eb' },
            selectedColors.includes('Violet') && styles.selectedButton,
            pressedButton === 'Violet' && styles.pressedButton,
          ]}
          onPress={() => {
            toggleColorSelection('Violet');
            handleButtonPress('Violet');
          }}
        >
          <Text style={[styles.colorButtonText, selectedColors.includes('Violet') && styles.selectedText]}>Violet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.colorButton,
            { backgroundColor: 'gray' },
            selectedColors.includes('White') && styles.selectedButton,
            pressedButton === 'White' && styles.pressedButton,
          ]}
          onPress={() => {
            toggleColorSelection('White');
            handleButtonPress('White');
          }}
        >
          <Text style={[styles.colorButtonText, selectedColors.includes('White') && styles.selectedText]}>White</Text>
        </TouchableOpacity>
      </View>

      {/* Back and Submit Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.backButton, pressedButton === 'Back' && styles.pressedButton]}
          onPress={() => {
            navigation.navigate('PatientPage'); // Navigate back to the patient page
            handleButtonPress('Back');
          }}
        >
          <Text style={styles.actionButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.submitButton, pressedButton === 'Submit' && styles.pressedButton]}
          onPress={() => {
            handleSubmit();
            handleButtonPress('Submit');
          }}
        >
          <Text style={styles.actionButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  colorButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selectedButton: {
    transform: [{ scale: 1.1 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  pressedButton: {
    opacity: 0.7,
  },
  colorButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedText: {
    textDecorationLine: 'underline',
    fontWeight: '900',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    backgroundColor: '#2196f3',
  },
  submitButton: {
    backgroundColor: '#ff9800',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
