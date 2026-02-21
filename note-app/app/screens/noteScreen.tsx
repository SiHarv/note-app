import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native";
import { getNotes, Note } from "../api/noteAPI";
import NotePost from "../components/notePost";

export default function NoteScreen() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getNotes().then((data) => setNotes(data));
  }, []);

  const handleUpdated = (updated: Note) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  const handleDeleted = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notes.map((note) => (
          <View key={note.id}>
            <NotePost
              id={note.id}
              note={note.note}
              status={note.status}
              onUpdated={handleUpdated}
              onDeleted={handleDeleted}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});