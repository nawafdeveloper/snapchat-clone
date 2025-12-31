import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'
import { StyleSheet } from 'react-native'

const Chats = () => {
    return (
        <ThemedView style={styles.main}>
            <ThemedText style={styles.text}>Hello World 5</ThemedText>
        </ThemedView>
    )
}

export default Chats

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 34,
        fontWeight: '700'
    }
})