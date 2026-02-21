import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { getNotes, Note } from "../api/noteAPI";
import NotePost from "../components/notePost";

export default function NoteScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getNotes().then((data) => setNotes(data));
  }, []);

  const handleUpdated = (updated: Note) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  const handleDeleted = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => n.note.toLowerCase().includes(q));
  }, [notes, query]);

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search note..."
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredNotes.map((note) => (
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
  search: {
    marginHorizontal: 24,
    marginTop: 12,
    marginBottom: 4,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});