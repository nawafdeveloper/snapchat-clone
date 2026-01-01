import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

interface Props {
    isExpanded: boolean;
}

const RightSideOverlayer = ({ isExpanded }: Props) => {
    const { width, height } = Dimensions.get('window');

    return (
        <>
            {isExpanded ? (
                <Animated.View
                    entering={FadeIn.duration(150)}
                    exiting={FadeOut.duration(150)}
                    key={'overlayer'}
                    style={styles.svg}>
                    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                        <Defs>
                            <LinearGradient id="grad" x1="100%" y1="50%" x2="0%" y2="50%">
                                <Stop offset="0" stopColor="#000000" stopOpacity="1" />
                                <Stop offset="1" stopColor="#000000" stopOpacity="0" />
                            </LinearGradient>
                        </Defs>
                        <Rect x="0" y="0" width={width} height={height} fill="url(#grad)" />
                    </Svg>
                </Animated.View>
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    svg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
});

export default RightSideOverlayer;