import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import { getNotes } from '../api/noteAPI';
import NotePost from '../components/notePost';

export default function NoteScreen() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Fetching from your Rails API
        getNotes().then((data) => setNotes(data));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {notes && notes.map((note: any) => (
                    <View key={note.id}>
                        {/* Matching your Rails schema: note and status */}
                        <NotePost note={note.note} status={note.status} />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    }
});