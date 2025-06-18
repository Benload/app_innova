import { useState, useEffect, useRef } from 'react';

// Estados más completos para toda la experiencia
type AppState = 'disconnected' | 'scanning' | 'connecting' | 'ready' | 'lifting' | 'resting';

export interface TempoliftData {
    appState: AppState;
    reps: number;
    sets: number;
    heartRate: number;
    velocity: number;
    restProgress: number;
    connect: () => void;
    startWorkout: () => void;
    finishSet: () => void;
    disconnect: () => void;
}

export function useTempolift(): TempoliftData {
    const [appState, setAppState] = useState<AppState>('disconnected');
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);
    const [heartRate, setHeartRate] = useState(80);
    const [velocity, setVelocity] = useState(100);
    const [restProgress, setRestProgress] = useState(0);

    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (appState === 'lifting') {
            // Simulación de ejercicio
            intervalRef.current = setInterval(() => {
                setHeartRate(hr => Math.min(165, hr + Math.floor(Math.random() * 4) + 1));
                setReps(r => (r >= 12 ? 12 : r + 1));
                setVelocity(v => Math.max(40, v - 3));
            }, 1200);
        } else if (appState === 'resting') {
            // Simulación de descanso
            const recoveryThreshold = 110;
            let duration = Math.round((heartRate / 10) + 15);
            let elapsed = 0;

            intervalRef.current = setInterval(() => {
                elapsed++;
                setRestProgress(elapsed / duration);
                setHeartRate(hr => Math.max(recoveryThreshold, hr - 2));

                if (heartRate <= recoveryThreshold || elapsed >= duration) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setAppState('ready'); // Listo para la siguiente serie
                    setHeartRate(recoveryThreshold);
                }
            }, 1000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [appState, heartRate]);

    // Inicia la simulación de conexión
    const connect = () => {
        setAppState('scanning');
        setTimeout(() => {
            setAppState('connecting');
            setTimeout(() => {
                setAppState('ready');
            }, 2000); // Simula tiempo de conexión
        }, 3000); // Simula tiempo de escaneo
    };

    const startWorkout = () => {
        if (appState === 'ready') {
            setSets(1);
            setReps(0);
            setHeartRate(90);
            setVelocity(100);
            setAppState('lifting');
        }
    };

    const finishSet = () => {
        if (appState === 'lifting') {
            setAppState('resting');
            setRestProgress(0);
        }
    };

    const disconnect = () => {
        setAppState('disconnected');
        setSets(0);
        setReps(0);
        setHeartRate(80);
    }

    return {
        appState,
        reps,
        sets,
        heartRate,
        velocity,
        restProgress,
        connect,
        startWorkout,
        finishSet,
        disconnect
    };
}