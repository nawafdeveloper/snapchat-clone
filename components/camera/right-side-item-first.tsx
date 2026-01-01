import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Props {
    title: string;
    icon: React.ReactElement;
    onPress: () => void;
    isExpanded: boolean;
}

const RightSideItemFirst = ({ title, icon, onPress, isExpanded }: Props) => {
    const listProgress = useSharedValue(0);
    const iconScale = useSharedValue(1);

    useEffect(() => {
        if (isExpanded) {
            listProgress.value = withTiming(1, {
                duration: 200,
                easing: Easing.out(Easing.cubic),
            });
        } else {
            listProgress.value = withTiming(0, {
                duration: 200,
                easing: Easing.out(Easing.cubic),
            });
        }
    }, [isExpanded]);

    const onPressIn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        iconScale.value = withTiming(1.3, {
            duration: 150,
            easing: Easing.out(Easing.cubic)
        })
    };

    const onPressOut = () => {
        iconScale.value = withTiming(1, {
            duration: 150,
            easing: Easing.out(Easing.cubic)
        })
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(listProgress.value, [0, 1], [0, 1])
        }
    });

    const scaleAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(iconScale.value, [0, 1], [0, 1])
                }
            ]
        }
    });

    return (
        <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}
            style={styles.button}
        >
            {isExpanded && (
                <Animated.Text
                    key={title}
                    style={[styles.buttonText, animatedStyle]}
                >
                    {title}
                </Animated.Text>
            )}
            <Animated.View style={scaleAnimatedStyle}>
                {icon}
            </Animated.View>
        </Pressable>
    )
}

export default RightSideItemFirst

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white'
    },
})