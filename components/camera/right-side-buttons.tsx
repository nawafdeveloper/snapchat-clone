import { Colors } from '@/constants/theme'
import * as Haptics from 'expo-haptics'
import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { UserPlusOutline } from '../icons'
import { ThemedView } from '../themed-view'
import RightSideArrowButton from './right-side-arrow-button'
import RightSideItem from './right-side-item'
import RightSideItemFirst from './right-side-item-first'
import { rightSideItemFirstList, rightSideItemList } from './right-side-item-list'
import RightSideOverlayer from './right-side-overlayer'

interface Props {

}

const RightSideButtons = ({ }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanding = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        setIsExpanded(prev => !prev);
    };

    return (
        <Animated.View style={styles.topRightContainer}>
            {!isExpanded && (
                <Pressable style={{ zIndex: 99 }}>
                    <UserPlusOutline size={22} color={Colors.dark.text} />
                </Pressable>
            )}
            <ThemedView style={styles.topRightColumn}>
                {rightSideItemFirstList.map((item, index) => (
                    <RightSideItemFirst
                        key={index}
                        title={item.title}
                        isExpanded={isExpanded}
                        icon={item.icons}
                        onPress={item.onPress}
                    />
                ))}
                <ThemedView
                style={styles.topRightColumnExpandable}
                >
                    {rightSideItemList.map((item, index) => (
                        <RightSideItem
                            index={index}
                            key={index}
                            title={item.title}
                            isExpanded={isExpanded}
                            icon={item.icons}
                            onPress={item.onPress}
                        />
                    ))}
                    <RightSideArrowButton
                        toggleExpanding={toggleExpanding}
                        isExpanded={isExpanded}
                        numOfItems={rightSideItemList.length}
                    />
                </ThemedView>
            </ThemedView>
            <RightSideOverlayer
                isExpanded={isExpanded}
            />
        </Animated.View>
    )
}

export default RightSideButtons

const styles = StyleSheet.create({
    topRightContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 20,
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'flex-end',
        padding: 16
    },
    topRightColumn: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: 15,
        backgroundColor: 'transparent',
        zIndex: 99
    },
    topRightColumnExpandable: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: 15,
        backgroundColor: 'transparent',
        zIndex: 99,
        paddingTop: 30
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white'
    },
    secondList: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: 15,
        backgroundColor: 'transparent',
    },
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