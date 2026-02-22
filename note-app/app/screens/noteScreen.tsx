import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Platform, StatusBar } from "react-native";
import { Searchbar, FAB, Portal, TextInput, Button, Switch, Text } from "react-native-paper";
import { getNotes, createNote, Note } from "../api/noteAPI";
import NotePost from "../components/notePost";
import { Alert, AlertText, AlertIcon } from '@/components/ui/alert';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";

export default function NoteScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState("");

  const [createVisible, setCreateVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newStatus, setNewStatus] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showNoteAdded, setShowNoteAdded] = useState(false);
  const [showNoteUpdated, setShowNoteUpdated] = useState(false);
  const [showNoteDeleted, setShowNoteDeleted] = useState(false);

  const NoteAddedFabIcon = () => (
    <FAB icon="check-circle" customSize={40} mode="flat" style={styles.alertFabIcon} />
    );
  const NoteUpdatedFabIcon = () => (
    <FAB icon="check-all" customSize={40} mode="flat" style={styles.alertFabIcon} />
    );
  
  const NoteDeletedFabIcon = () => (
    <FAB icon="delete-circle" customSize={40} mode="flat" style={styles.alertFabIcon} />
    );

  useEffect(() => {
    getNotes().then((data) => setNotes(data));
  }, []);

  //new note effect wow
  useEffect(() => {
    if (!showNoteAdded) return;

    const timer = setTimeout(() => {
      setShowNoteAdded(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showNoteAdded]);

  // Edit note effect wow
  useEffect(() => {
    if (!showNoteUpdated) return;

    const timer = setTimeout(() => {
      setShowNoteUpdated(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showNoteUpdated]);

  // Delete note effect wow
  useEffect(() => {
    if (!showNoteDeleted) return;

    const timer = setTimeout(() => {
      setShowNoteDeleted(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showNoteDeleted]);

  const handleUpdated = (updated: Note) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    setShowNoteUpdated(true);
  };

  const handleDeleted = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setShowNoteDeleted(true);
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
      setShowNoteAdded(true);
    } catch (e) {
      console.log("Create failed", e);
    } finally {
      setCreating(false);
    }
  };

  function noteAdded() {
    return (
      <Alert action="success" variant="solid">
        <AlertIcon as={NoteAddedFabIcon} />
        <AlertText>Note Added!</AlertText>
      </Alert>
    );
  }

  function noteUpdated() {
    return (
      <Alert action="info" variant="solid">
        <AlertIcon as={NoteUpdatedFabIcon} />
        <AlertText>Note Updated!</AlertText>
      </Alert>
    );
  }

  function noteDeleted() {
    return (
      <Alert action="error" variant="solid">
        <AlertIcon as={NoteDeletedFabIcon} />
        <AlertText>Note Deleted!</AlertText>
      </Alert>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search note..."
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />

      <Portal>
        {showNoteUpdated && <View style={styles.alertHeaderRight}>{noteUpdated()}</View>}
        {showNoteDeleted && <View style={styles.alertHeaderRight}>{noteDeleted()}</View>}
      </Portal>
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
        {showNoteAdded && <View style={styles.alertHeaderRight}>{noteAdded()}</View>}
      </Portal>

      <Modal
        isOpen={createVisible}
        onClose={closeCreateModal}
        size="sm"
      >
        <ModalBackdrop />
        <ModalContent className="bg-black border-outline-200">
          <ModalHeader>
            <View style={styles.modalHeaderRow}>
              <FAB
                icon="plus-circle"
                customSize={40}
                mode="flat"
                color="#41a60f"
                style={styles.modalFabIcon}
              />
              <Text style={styles.modalTitle}>Create Note</Text>
            </View>
          </ModalHeader>

          <ModalBody>
            <TextInput
              mode="outlined"
              label="Note"
              placeholder="Type note..."
              value={newNote}
              onChangeText={setNewNote}
              style={styles.modalInput}
              textColor="#ffffff"
              placeholderTextColor="#cfcfcf"
              theme={{
                colors: {
                  primary: "#7ce647",
                  onSurfaceVariant: "#cfcfcf",
                  outline: "#666666",
                  background: "#111111",
                },
              }}
            />

            <View style={styles.modalStatusRow}>
              <Text style={styles.modalStatusText}>{newStatus ? "Done" : "Unfinished"}</Text>
              <Switch value={newStatus} onValueChange={setNewStatus} />
            </View>
          </ModalBody>

          <ModalFooter>
            <Button mode="contained" onPress={closeCreateModal} disabled={creating} labelStyle={styles.modalButtonLabel}>
              Cancel
            </Button>
            <Button
              style={styles.createButton}
              mode="contained"
              onPress={handleCreate}
              loading={creating}
              disabled={creating || !newNote.trim()}
              labelStyle={styles.modalButtonLabel}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <FAB icon="plus" style={styles.fab} onPress={openCreateModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  alertHeaderRight: {
    position: "absolute",
    top: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 8 : 8,
    right: 12,
    zIndex: 999,
    elevation: 10,
    width: 220,
    maxWidth: "70%",
  },
  alertFabIcon: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: "transparent",
    width: 18,
    height: 18,
    minWidth: 18,
    margin: 0,
    padding: 0,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  modalInput: {
    marginBottom: 16,
    backgroundColor: "#111111",
  },
  modalStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalStatusText: {
    color: "white",
  },
  modalButtonLabel: {
    color: "white",
  },
  createButton: {
    backgroundColor: "#41a60f",
  },
  modalFabIcon: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: "transparent",
    width: 18,
    height: 18,
    minWidth: 18,
    margin: 0,
    padding: 0,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  modalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});