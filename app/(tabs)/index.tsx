import RecorderSection from '@/components/camera/recorder-section';
import RightSideButtons from '@/components/camera/right-side-buttons';
import ZoomAdjustmentToggler from '@/components/camera/zoom-adjustment-toggler';
import { SearchOutline } from '@/components/icons';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useCameraStore } from '@/hooks/camera-store';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Camera = () => {
    const isFocused = useIsFocused();
    const { zoom, face, flash } = useCameraStore();

    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        navigation.setOptions({
            tabBarStyle: {
                height: 95,
                borderTopWidth: 0,
                backgroundColor: Colors.dark.card,
                paddingTop: 15
            },
            tabBarActiveTintColor: Colors.dark.icons,
            tabBarInactiveTintColor: Colors.dark.icons,
            tabBarIndicator: () => null,
        })
    }, [navigation]);

    if (!permission) {
        return null;
    }

    if (!permission.granted) {
        const handlePermissionRequest = async () => {
            await requestPermission();
        };

        handlePermissionRequest();
    }

    return (
        <ThemedView style={[styles.main, { paddingTop: insets.top }]}>
            <ThemedView style={styles.content}>
                <ThemedView style={[StyleSheet.absoluteFill, styles.overlay]}>
                    <ThemedView style={styles.topContainer}>
                        <ThemedView style={styles.topLeftContainer}>
                            <Image
                                source={require('@/assets/images/bitmoji.png')}
                                resizeMode='contain'
                                style={styles.bitmoji}
                            />
                            <Pressable>
                                <SearchOutline size={22} color={Colors.dark.text} />
                            </Pressable>
                        </ThemedView>
                        <RightSideButtons />
                    </ThemedView>
                    <ThemedView style={styles.bottomContainer}>
                        <ZoomAdjustmentToggler />
                        <RecorderSection />
                    </ThemedView>
                </ThemedView>
                <CameraView
                    style={styles.camera}
                    facing={face}
                    active={isFocused}
                    zoom={zoom}
                    flash={flash ? "on" : "off"}
                />
            </ThemedView>
        </ThemedView>
    )
}

export default Camera

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'black'
    },
    content: {
        flex: 1,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        borderCurve: 'continuous',
        backgroundColor: 'gray',
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        backgroundColor: 'transparent',
        zIndex: 999
    },
    topContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flex: 1
    },
    bottomContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        gap: 20,
        padding: 16
    },
    topLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'transparent',
        padding: 16
    },
    bitmoji: {
        width: 35,
        height: 35,
        borderRadius: 99,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.15)'
    },
})