import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WorkoutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pantalla de Entrenamiento</Text>
            <Text>Aquí se mostrarán los datos en tiempo real.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});