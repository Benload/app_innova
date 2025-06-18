import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importamos las pantallas que creamos.
import HomeScreen from '../app/HomeScreen';
import WorkoutScreen from '../app/WorkoutScreen';
import HistoryScreen from '../app/HistoryScreen';

// Creamos un 'Stack Navigator'.
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        // 'initialRouteName' define qué pantalla se mostrará primero.
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Inicio - Tempolift' }}
            />
            <Stack.Screen
                name="Workout"
                component={WorkoutScreen}
                options={{ title: 'Entrenamiento en Vivo' }}
            />
            <Stack.Screen
                name="History"
                component={HistoryScreen}
                options={{ title: 'Tu Historial' }}
            />
        </Stack.Navigator>
    );
}