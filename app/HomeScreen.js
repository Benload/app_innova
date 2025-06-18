import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// La función 'navigation.navigate' nos permitirá movernos a otras pantallas.
export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a Tempolift</Text>
            <Text style={styles.subtitle}>Tu asistente de entrenamiento personal</Text>
            <Button
                title="Comenzar Entrenamiento"
                onPress={() => navigation.navigate('Workout')}
            />
            <Button
                title="Ver Historial"
                onPress={() => navigation.navigate('History')}
            />
        </View>
    );
}

// Estilos para dar una apariencia básica a nuestra pantalla.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 30,
    },
});