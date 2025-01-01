import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import all screens
import LoginPage from './App/Scteens/Login';
import NewAccountPage from './App/Scteens/NewAccount';
import ForgotPasswordPage from './App/Scteens/ForgotPassword';
import ProviderPage from './App/Scteens/ProviderPage';
import PatientPage from './App/Scteens/PatientPage';
import AddClientPage from './App/Scteens/AddClient';
import RemoveClient from './App/Scteens/RemoveClient';
import ViewClient from './App/Scteens/ViewClient';
import Settings from './App/Scteens/Settings';
import ChangeUserSettings from './App/Scteens/ChangeUserSettings';
import SetCheckInNotifications from './App/Scteens/SetCheckInNotifications';
import ShareWith from './App/Scteens/ShareWith';
import ViewHistory from './App/Scteens/ViewHistory';
import TakeAssessment from './App/Scteens/TakeAssessment';
import ViewCurrentExercises from './App/Scteens/ViewCurrentExercises';
import BreathingExercise from './App/Scteens/BreathingExercise';
import Movies from './App/Scteens/Movies';
import RecommendedFoods from './App/Scteens/RecommendedFoods';
import WatchVideo from './App/Scteens/WatchVideo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#2196f3' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Login' }} />
        <Stack.Screen name="NewAccount" component={NewAccountPage} options={{ title: 'New Account' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} options={{ title: 'Forgot Password' }} />

        {/* Patient Screens */}
        <Stack.Screen name="PatientPage" component={PatientPage} options={{ title: 'Patient Page' }} />
        <Stack.Screen name="TakeAssessment" component={TakeAssessment} options={{ title: 'Take Assessment' }} />
        <Stack.Screen
          name="ViewCurrentExercises"
          component={ViewCurrentExercises}
          options={{ title: 'View Current Exercises' }}
        />
        <Stack.Screen name="ViewHistory" component={ViewHistory} options={{ title: 'View History' }} />

        {/* Exercise Detail Screens */}
        <Stack.Screen
          name="BreathingExercise"
          component={BreathingExercise}
          options={{ title: 'Breathing Exercise' }}
        />
        <Stack.Screen name="OtherExercises" component={Movies} options={{ title: 'Movies' }} />
        <Stack.Screen
          name="RecommendedFoods"
          component={RecommendedFoods}
          options={{ title: 'Recommended Foods' }}
        />
        <Stack.Screen name="WatchVideo" component={WatchVideo} options={{ title: 'Watch Video' }} />

        {/* Provider Screens */}
        <Stack.Screen name="ProviderPage" component={ProviderPage} options={{ title: 'Provider Page' }} />
        <Stack.Screen name="AddClient" component={AddClientPage} options={{ title: 'Add Client' }} />
        <Stack.Screen name="RemoveClient" component={RemoveClient} options={{ title: 'Remove Client' }} />
        <Stack.Screen name="ViewClient" component={ViewClient} options={{ title: 'View Client' }} />

        {/* Settings Screens */}
        <Stack.Screen name="Settings" component={Settings} options={{ title: 'Settings' }} />
        <Stack.Screen
          name="ChangeUserSettings"
          component={ChangeUserSettings}
          options={{ title: 'Change User Settings' }}
        />
        <Stack.Screen
          name="SetCheckInNotifications"
          component={SetCheckInNotifications}
          options={{ title: 'Set Notifications' }}
        />
        <Stack.Screen name="ShareWith" component={ShareWith} options={{ title: 'Share With' }} />

        {/* Fallback Screen */}
        <Stack.Screen
          name="NotFound"
          component={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, color: 'red' }}>Page Not Found!</Text>
            </View>
          )}
          options={{ title: 'Error' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
