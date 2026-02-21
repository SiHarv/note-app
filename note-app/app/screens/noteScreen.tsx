import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native";
import { Searchbar, FAB, Portal, Modal, TextInput, Button, Switch, Text } from "react-native-paper";
import { getNotes, createNote, Note } from "../api/noteAPI";
import NotePost from "../components/notePost";

export default function NoteScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState("");

  const [createVisible, setCreateVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newStatus, setNewStatus] = useState(false);
  const [creating, setCreating] = useState(false);

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

  const openCreateModal = () => {
    setNewNote("");
    setNewStatus(false);
    setCreateVisible(true);
  };

  const closeCreateModal = () => {
    if (!creating) setCreateVisible(false);
  };

  const handleCreate = async () => {
    if (!newNote.trim()) return;
    try {
      setCreating(true);
      const created = await createNote({
        note: newNote.trim(),
        status: newStatus,
      });
      setNotes((prev) => [created, ...prev]);
      setCreateVisible(false);
      setNewNote("");
      setNewStatus(false);
    } catch (e) {
      console.log("Create failed", e);
    } finally {
      setCreating(false);
    }
  };

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

      <Portal>
        <Modal
          visible={createVisible}
          onDismiss={closeCreateModal}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>Create Note</Text>

          <TextInput
            mode="outlined"
            label="Note"
            placeholder="Type note..."
            value={newNote}
            onChangeText={setNewNote}
            style={styles.modalInput}
          />

          <View style={styles.modalStatusRow}>
            <Text>{newStatus ? "Done" : "Unfinished"}</Text>
            <Switch value={newStatus} onValueChange={setNewStatus} />
          </View>

          <View style={styles.modalActions}>
            <Button onPress={closeCreateModal} disabled={creating}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleCreate}
              loading={creating}
              disabled={creating || !newNote.trim()}
            >
              Create
            </Button>
          </View>
        </Modal>
      </Portal>

      <FAB icon="plus" style={styles.fab} onPress={openCreateModal} />
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
    paddingBottom: 100,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
  },
  modal: {
    margin: 24,
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#eeeeee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  modalInput: {
    marginBottom: 12,
  },
  modalStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
});