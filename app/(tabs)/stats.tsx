import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{ data: [1200, 1350, 1300, 1500, 1650, 1800] }],
};

const statsData = [
    { label: 'Récord de Volumen', value: '1800 kg', icon: 'trophy-outline' },
    { label: 'Descanso Promedio', value: '42s', icon: 'time-outline' },
    { label: 'Entrenamientos/Mes', value: '12', icon: 'calendar-outline' },
    { label: 'Consistencia', value: '89%', icon: 'checkmark-circle-outline' },
];

export default function StatsScreen() {
    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedText type="title" style={styles.title}>Tu Progreso</ThemedText>

                <View style={styles.card}>
                    <ThemedText type="subtitle" style={styles.cardTitle}>Volumen Mensual (kg)</ThemedText>
                    <LineChart
                        data={chartData}
                        width={screenWidth - 40}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#1E1E1E',
                            backgroundGradientFrom: '#1E1E1E',
                            backgroundGradientTo: '#1E1E1E',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})`,
                            propsForDots: { r: '4', strokeWidth: '2', stroke: '#fff' },
                        }}
                        bezier
                        style={{ borderRadius: 16 }}
                    />
                </View>

                <View style={styles.grid}>
                    {statsData.map((item) => (
                        <View key={item.label} style={styles.statItem}>
                            <Ionicons name={item.icon as any} size={32} color="#007AFF" />
                            <ThemedText style={styles.statLabel}>{item.label}</ThemedText>
                            <ThemedText style={styles.statValue}>{item.value}</ThemedText>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    scrollContent: { paddingTop: 80, paddingHorizontal: 20, paddingBottom: 40 },
    title: { color: 'white', marginBottom: 20 },
    card: {
        backgroundColor: '#1E1E1E',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    cardTitle: { color: 'white', marginBottom: 10 },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statItem: {
        backgroundColor: '#1E1E1E',
        borderRadius: 16,
        width: '48%',
        padding: 20,
        marginBottom: 15,
        gap: 8,
    },
    statLabel: { color: '#aaa', fontSize: 16 },
    statValue: { color: 'white', fontSize: 24, fontWeight: 'bold' },
});