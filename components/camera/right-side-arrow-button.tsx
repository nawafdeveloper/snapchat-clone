import { Colors } from '@/constants/theme'
import React, { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { ChevronUpOutline } from '../icons'

const ITEM_SPACE = 43;

interface Props {
    toggleExpanding: () => void;
    isExpanded: boolean;
    numOfItems: number;
}

const RightSideArrowButton = ({ toggleExpanding, isExpanded, numOfItems }: Props) => {
    const listProgress = useSharedValue(0);

    useEffect(() => {
        listProgress.value = withSpring(isExpanded ? 1 : 0, {
            damping: 18,
            stiffness: 180,
            mass: 0.6,
            overshootClamping: false,
        });
    }, [isExpanded]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: interpolate(
                    listProgress.value,
                    [0, 1],
                    [0, numOfItems * ITEM_SPACE]
                ),
            },
            {
                rotate: `${interpolate(
                    listProgress.value,
                    [0, 1],
                    [180, 0]
                )}deg`,
            },
        ],
    }));


    return (
        <Animated.View
            style={[animatedStyle, {
                position: 'absolute',
            }]}
        >
            <Pressable onPress={toggleExpanding} style={styles.expandButton}>
                <ChevronUpOutline size={16} color={Colors.dark.text} />
            </Pressable>
        </Animated.View>
    )
}

export default RightSideArrowButton

const styles = StyleSheet.create({
    expandButton: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.07)',
        paddingVertical: 4,
        paddingHorizontal: 8
    }
})