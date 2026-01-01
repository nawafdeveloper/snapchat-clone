import { Colors } from '@/constants/theme'
import { useCameraStore } from '@/hooks/camera-store'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    cancelAnimation,
    runOnJS,
    useAnimatedProps,
    useSharedValue,
    withTiming,
    ZoomIn,
    ZoomOut
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'

const SIZE = 100
const STROKE_WIDTH = 10
const RADIUS = (SIZE - STROKE_WIDTH) / 2
const INNER_RADIUS = RADIUS - STROKE_WIDTH / 2
const CIRCUMFERENCE = 2 * Math.PI * INNER_RADIUS
const MAX_DISTANCE = 1000

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const RecorderButton = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [key, setKey] = useState(0);

    const { setZoom } = useCameraStore();

    const progress = useSharedValue(0);
    const opacity = useSharedValue(1);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const navigation = useNavigation();

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
        opacity: opacity.value,
    }))

    const startLoop = () => {
        progress.value = 0;
        opacity.value = 1;
        progress.value = withTiming(1, { duration: 10000 }, (finished) => {
            if (finished) {
                opacity.value = withTiming(0, { duration: 150 }, (fadeFinished) => {
                    if (fadeFinished) {
                        runOnJS(setKey)(prev => prev + 1);
                        runOnJS(startLoop)();
                    }
                });
            }
        });
    };

    const logDistance = (distance: number) => {
        // console.log(`Distance range: ${distance.toFixed(3)}`);
        setZoom(distance)
    };

    const longPressGesture = Gesture.Pan()
        .minDistance(0)
        .onBegin((event) => {
            startX.value = event.x;
            startY.value = event.y;
            runOnJS(navigation.setOptions)({ swipeEnabled: false });
            runOnJS(setIsRecording)(true);
            runOnJS(startLoop)();
        })
        .onUpdate((event) => {
            const deltaX = event.x - startX.value;
            const deltaY = event.y - startY.value;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const normalizedDistance = Math.min(distance / MAX_DISTANCE, 1);
            runOnJS(logDistance)(normalizedDistance);
        })
        .onFinalize(() => {
            runOnJS(navigation.setOptions)({ swipeEnabled: true });
            runOnJS(setIsRecording)(false);
            cancelAnimation(progress);
            cancelAnimation(opacity);
            progress.value = withTiming(0, { duration: 150 });
            opacity.value = 1;
        });

    return (
        <GestureDetector gesture={longPressGesture}>
            <Animated.View style={styles.container}>
                {isRecording ? (
                    <Animated.View
                        entering={ZoomIn.duration(150)}
                        exiting={ZoomOut.duration(150)}
                        key={'recording'}
                    >
                        <Svg width={SIZE} height={SIZE}>
                            <Circle
                                cx={SIZE / 2}
                                cy={SIZE / 2}
                                r={RADIUS}
                                fill={Colors.dark.yellow}
                            />
                            <AnimatedCircle
                                key={key}
                                cx={SIZE / 2}
                                cy={SIZE / 2}
                                r={INNER_RADIUS}
                                stroke="#97951aff"
                                strokeWidth={STROKE_WIDTH}
                                strokeDasharray={CIRCUMFERENCE}
                                animatedProps={animatedProps}
                                strokeLinecap="round"
                                fill="transparent"
                                rotation="-90"
                                originX={SIZE / 2}
                                originY={SIZE / 2}
                            />
                        </Svg>
                    </Animated.View>
                ) : (
                    <Animated.View
                        entering={ZoomIn.duration(150)}
                        exiting={ZoomOut.duration(150)}
                        key={'not-recording'}
                        style={styles.notRecordingButton} />
                )}
            </Animated.View>
        </GestureDetector>
    )
}

export default RecorderButton

const styles = StyleSheet.create({
    container: {
        width: SIZE,
        height: SIZE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notRecordingButton: {
        backgroundColor: 'transparent',
        borderWidth: 7,
        borderColor: Colors.dark.text,
        borderRadius: 99,
        padding: 35
    }
})