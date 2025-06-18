import { ThemedText } from '@/components/ThemedText';
import { PairingModal } from '@/components/PairingModal';
import { useTempolift } from '@/hooks/useTempolift';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { AnimatePresence, View as MotiView } from 'moti';
import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';

// ========================================================================
// Componente principal
// ========================================================================
export default function WorkoutScreen() {
  const hook = useTempolift();

  // Vista para cuando la app está desconectada
  const renderDisconnectedView = () => (
    <View style={styles.centered}>
      <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <ThemedText style={styles.brandTitle}>TEMPOLIFT</ThemedText>
      </MotiView>
      <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 200 }}>
        <TouchableOpacity style={styles.actionButton} onPress={hook.connect}>
          <ThemedText style={styles.buttonText}>CONECTAR MANCUERNA</ThemedText>
        </TouchableOpacity>
      </MotiView>
    </View>
  );

  // Vista para cuando la app está conectada y en uso
  const renderConnectedView = () => {
    const getButtonText = () => {
      if (hook.appState === 'lifting') return 'FINALIZAR SERIE';
      if (hook.appState === 'ready' && hook.sets === 0) return 'COMENZAR';
      if (hook.appState === 'ready' && hook.sets > 0) return 'SIGUIENTE SERIE';
      if (hook.appState === 'resting') return 'RECUPERANDO...';
      return '';
    };

    const handlePress = () => {
      if (hook.appState === 'lifting') hook.finishSet();
      else if (hook.appState === 'ready') hook.startWorkout();
    }

    return (
      <View style={styles.flexContainer}>
        {/* Usamos un Spacer para empujar el contenido hacia arriba y el botón hacia abajo */}
        <View style={{ flex: 0.5 }} />

        {/* --- Círculo Principal --- */}
        <MotiView from={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={styles.circleContainer}>
          <ThemedText style={styles.bpmValue}>{hook.heartRate}</ThemedText>
          <ThemedText style={styles.bpmLabel}>BPM</ThemedText>
        </MotiView>

        {/* --- Métricas Secundarias --- */}
        <View style={styles.metricsGrid}>
          <MetricDisplay icon="speedometer-outline" label="Velocidad" value={`${hook.velocity}%`} />
          <MetricDisplay icon="barbell-outline" label="Reps" value={String(hook.reps)} />
          <MetricDisplay icon="layers-outline" label="Serie" value={String(hook.sets > 0 ? hook.sets : '-')} />
        </View>

        <View style={{ flex: 1 }} />

        {/* --- Botón de Acción --- */}
        <TouchableOpacity style={styles.actionButton} onPress={handlePress} disabled={hook.appState === 'resting'}>
          <ThemedText style={styles.buttonText}>{getButtonText()}</ThemedText>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <LinearGradient colors={['#111', '#000']} style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        {hook.appState === 'disconnected' ? renderDisconnectedView() : renderConnectedView()}
      </SafeAreaView>
      <PairingModal
        isVisible={hook.appState === 'scanning' || hook.appState === 'connecting'}
        isConnecting={hook.appState === 'connecting'}
        onSelectDevice={hook.connect}
      />
    </LinearGradient>
  );
}

// ========================================================================
// Componente para las métricas secundarias
// ========================================================================
const MetricDisplay = ({ icon, label, value }: { icon: any; label: string; value: string }) => (
  <View style={styles.metricBox}>
    <Ionicons name={icon} size={24} color="#8A8A8E" />
    {/* CORRECCIÓN: Contenedor con altura mínima para el valor */}
    <View style={styles.metricValueContainer}>
      <ThemedText style={styles.metricValue}>{value}</ThemedText>
    </View>
    <ThemedText style={styles.metricLabel}>{label}</ThemedText>
  </View>
);

// ========================================================================
// Estilos
// ========================================================================
const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Espacio inferior para el botón
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 30,
  },
  brandTitle: {
    fontSize: 52,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
  },
  disconnectedSubtitle: {
    fontSize: 18,
    color: '#8A8A8E',
  },
  circleContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#1c1c1e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  bpmValue: {
    fontSize: 90,
    color: 'white',
    fontWeight: '200',
    // CORRECCIÓN: includeFontPadding evita recortes extra en Android
    ...Platform.select({ android: { includeFontPadding: false } })
  },
  bpmLabel: {
    fontSize: 20,
    color: '#8A8A8E',
    marginTop: -10,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  metricBox: {
    alignItems: 'center',
    gap: 8,
    minWidth: 90, // Asegura un ancho mínimo para cada métrica
  },
  // CORRECCIÓN CLAVE: Contenedor con altura fija para el número
  metricValueContainer: {
    height: 40, // Altura garantizada para el texto grande
    justifyContent: 'center',
  },
  metricValue: {
    fontSize: 36,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: 13,
    color: '#8A8A8E',
    textTransform: 'uppercase',
  },
  actionButton: {
    backgroundColor: '#0A84FF',
    width: '90%',
    padding: 18,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center', // Asegura que esté centrado si el flex lo empuja
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});