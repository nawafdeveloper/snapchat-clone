import { Colors } from '@/constants/theme';
import { useCameraStore } from '@/hooks/camera-store';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const ZoomAdjustmentToggler = () => {
    const colorScheme = useColorScheme();
    const { setZoom } = useCameraStore();

    const [selectedZoom, setSelectedZoom] = useState<'.5' | '1' | '3'>('1');

    const handleToggleZoom = (value: '.5' | '1' | '3', zoom: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        setSelectedZoom(value);
        setZoom(zoom)
    };

    return (
        <ThemedView style={styles.zoomContainer}>
            <Pressable
                onPress={() => handleToggleZoom('.5', 0.5)}
                style={[styles.button, { backgroundColor: selectedZoom === '.5' ? 'rgba(255,255,255,0.2)' : 'transparent' }]}
            >
                <ThemedText style={[styles.text, { fontSize: selectedZoom === '.5' ? 12 : 10, color: selectedZoom === '.5' ? Colors[colorScheme ?? 'dark'].yellow : Colors[colorScheme ?? 'dark'].text }]}>.5</ThemedText>
            </Pressable>
            <Pressable
                onPress={() => handleToggleZoom('1', 0)}
                style={[styles.button, { backgroundColor: selectedZoom === '1' ? 'rgba(255,255,255,0.2)' : 'transparent' }]}
            >
                <ThemedText style={[styles.text, { fontSize: selectedZoom === '1' ? 12 : 10, color: selectedZoom === '1' ? Colors[colorScheme ?? 'dark'].yellow : Colors[colorScheme ?? 'dark'].text }]}>1</ThemedText>
            </Pressable>
            <Pressable
                onPress={() => handleToggleZoom('3', 0.3)}
                style={[styles.button, { backgroundColor: selectedZoom === '3' ? 'rgba(255,255,255,0.2)' : 'transparent' }]}
            >
                <ThemedText style={[styles.text, { fontSize: selectedZoom === '3' ? 12 : 10, color: selectedZoom === '3' ? Colors[colorScheme ?? 'dark'].yellow : Colors[colorScheme ?? 'dark'].text }]}>3</ThemedText>
            </Pressable>
        </ThemedView>
    )
}

export default ZoomAdjustmentToggler

const styles = StyleSheet.create({
    zoomContainer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.07)',
        marginHorizontal: 'auto',
        padding: 1
    },
    button: {
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30
    },
    text: {
        fontWeight: '700'
    }
})