import { Colors } from '@/constants/theme'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { StudioOutline } from '../icons'
import { ThemedView } from '../themed-view'
import RecorderButton from './recorder-button'

const RecorderSection = () => {
    return (
        <ThemedView style={styles.main}>
            <Pressable style={styles.studioButton}>
                <StudioOutline size={32} color={Colors.dark.text} />
            </Pressable>
            <RecorderButton />
        </ThemedView>
    )
}

export default RecorderSection

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        gap: 20,
        marginHorizontal: 'auto',
        paddingHorizontal: 50,
        position: 'relative'
    },
    studioButton: {
        position: 'absolute',
        left: 0
    }
})