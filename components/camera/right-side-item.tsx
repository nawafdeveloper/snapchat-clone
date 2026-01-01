import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const ITEM_HEIGHT = 28;
const ITEM_GAP = 15;

interface Props {
    title: string;
    icon: React.ReactElement;
    onPress: () => void;
    isExpanded: boolean;
    index: number;
}

const RightSideItem = ({ title, icon, onPress, isExpanded, index }: Props) => {
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
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
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
            transform: [
                {
                    translateY: interpolate(
                        listProgress.value,
                        [0, 1],
                        [0, index * (ITEM_HEIGHT + ITEM_GAP)]
                    )
                },
                {
                    scale: interpolate(listProgress.value, [0, 1], [0.9, 1])
                }
            ],
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
        <Animated.View
            style={[{
                position: 'absolute',
                height: ITEM_HEIGHT,
                width: '100%'
            }, animatedStyle]}
        >
            <Pressable
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={onPress}
                style={styles.button}
            >
                <Animated.Text
                    entering={FadeIn.duration(150)}
                    exiting={FadeOut.duration(150)}
                    key={title}
                    style={styles.buttonText}
                >
                    {title}
                </Animated.Text>
                <Animated.View style={scaleAnimatedStyle}>
                    {icon}
                </Animated.View>
            </Pressable>
        </Animated.View>
    )
}

export default RightSideItem

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