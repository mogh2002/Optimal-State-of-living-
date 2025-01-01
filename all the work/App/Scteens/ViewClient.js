import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    Image,
    TouchableOpacity,
} from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ViewClientPage({ navigation }) {
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

    const renderClient = ({ item }) => (
        <View style={[styles.clientContainer, styles.clientBackground]}>
            <View style={styles.clientDetails}>
                <Text style={styles.clientText}>Name: {item.clientName || 'No Name Available'}</Text>
                <Text style={styles.clientText}>Email: {item.userEmail || 'No Email Available'}</Text>
            </View>
            <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewClient(item)}
            >
                <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
        </View>
    );

    const handleViewClient = async (client) => {
        try {
            const assessmentsRef = collection(firestore, 'Assessments');
            const q = query(assessmentsRef, where('email', '==', client.userEmail.trim()));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const assessments = querySnapshot.docs.map((doc) => doc.data());

                const lastAssessment = assessments.reduce((latest, current) => {
                    if (!latest || (current.lastDateUpdate && current.lastDateUpdate.seconds > latest.lastDateUpdate.seconds)) {
                        return current;
                    }
                    return latest;
                }, null);

                if (lastAssessment) {
                    const stateField = lastAssessment.state || lastAssessment.status;

                    if (stateField && Array.isArray(stateField) && stateField.length > 0) {
                        const allStates = stateField.map((state, index) => `${index + 1}. ${state}`).join('\n');

                        const lastUpdate = lastAssessment.lastDateUpdate
                            ? new Date(lastAssessment.lastDateUpdate.seconds * 1000).toLocaleString()
                            : 'No Last Update';

                        Alert.alert(
                            'Client Assessment',
                            `Name: ${client.clientName}\nEmail: ${client.userEmail}\nStates:\n${allStates}\nLast Update: ${lastUpdate}`
                        );
                    } else {
                        Alert.alert(
                            'No State Found',
                            `The client has no valid state data available.\nLast Assessment Date: ${
                                lastAssessment.lastDateUpdate
                                    ? new Date(lastAssessment.lastDateUpdate.seconds * 1000).toLocaleString()
                                    : 'Unknown'
                            }`
                        );
                    }
                } else {
                    Alert.alert('No Assessment Found', 'No valid assessment data found for this client.');
                }
            } else {
                Alert.alert('No Assessment Found', `No assessment data available for the email: ${client.userEmail}`);
            }
        } catch (error) {
            console.error('Error fetching assessment:', error);
            Alert.alert('Error', 'Failed to fetch assessment data.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image source={require('./../../assets/logo.png')} style={styles.logo} />

            {/* Title */}
            <Text style={styles.title}>View Clients</Text>

            {/* Client List */}
            {loading ? (
                <Text>Loading clients...</Text>
            ) : clients.length === 0 ? (
                <Text style={styles.noClientsText}>No clients found for this provider.</Text>
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
        backgroundColor: '#2196f3',
    },
    clientDetails: {
        flex: 1,
    },
    clientText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    viewButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    viewButtonText: {
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