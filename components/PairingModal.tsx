import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { ThemedText } from './ThemedText';

const FAKE_DEVICES = [
    { id: '1', name: 'Audífonos de Juan' },
    { id: '2', name: 'Smart TV Living' },
    { id: '3', name: 'Tempolift-A7B4' },
    { id: '4', name: 'HUAWEI P30' },
];

interface Props {
    isVisible: boolean;
    isConnecting: boolean;
    onSelectDevice: () => void;
}

export function PairingModal({ isVisible, isConnecting, onSelectDevice }: Props) {
    const [showDevices, setShowDevices] = useState(false);

    useEffect(() => {
        if (isVisible && !isConnecting) {
            // Simula el tiempo que tarda en encontrar dispositivos
            const timer = setTimeout(() => setShowDevices(true), 2000);
            return () => clearTimeout(timer);
        }
        if (!isVisible) {
            setShowDevices(false);
        }
    }, [isVisible, isConnecting]);

    const renderContent = () => {
        if (isConnecting) {
            return (
                <>
                    <ActivityIndicator size="large" color="#fff" />
                    <ThemedText style={styles.statusText}>Conectando a Tempolift...</ThemedText>
                </>
            );
        }

        if (!showDevices) {
            return (
                <>
                    <ActivityIndicator size="large" color="#fff" />
                    <ThemedText style={styles.statusText}>Buscando dispositivos cercanos...</ThemedText>
                </>
            );
        }

        return (
            <>
                <ThemedText style={styles.modalTitle}>Dispositivos Encontrados</ThemedText>
                <FlatList
                    data={FAKE_DEVICES}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.deviceItem, item.name.includes('Tempolift') ? {} : styles.disabledItem]}
                            onPress={item.name.includes('Tempolift') ? onSelectDevice : undefined}
                            disabled={!item.name.includes('Tempolift')}
                        >
                            <ThemedText style={styles.deviceName}>{item.name}</ThemedText>
                        </TouchableOpacity>
                    )}
                />
            </>
        );
    };

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {renderContent()}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#1c1c1e',
        borderRadius: 20,
        padding: 20,
        width: '85%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusText: {
        marginTop: 20,
        fontSize: 18,
        color: '#fff',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    deviceItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        width: '100%',
    },
    disabledItem: {
        opacity: 0.4,
    },
    deviceName: {
        color: '#fff',
        fontSize: 18,
    },
});