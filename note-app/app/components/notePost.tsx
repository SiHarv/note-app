import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, FAB, Headline, Switch, Text, TextInput } from "react-native-paper";
import { updateNote, deleteNote, Note } from "../api/noteAPI";
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, } from "@/components/ui/modal";
import { Pressable } from "react-native";

interface NotePostProps {
  id: number;
  note: string;
  status: boolean;
  activeNoteId: number | null;
  setActiveNoteId: (id: number | null) => void;
  onUpdated: (updated: Note) => void;
  onDeleted: (id: number) => void;
}

function NotePost(props: NotePostProps) {
  const [editedNote, setEditedNote] = useState(props.note);
  const [editedStatus, setEditedStatus] = useState(props.status);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const isActive = props.activeNoteId === props.id;

  const DeleteFabIcon = () => (
    <FAB icon="delete" customSize={40} mode="flat" style={styles.modalFabIcon} />
  );

  const handleUpdate = async () => {
    try {
      setSaving(true);
      const updated = await updateNote(props.id, {
        note: editedNote,
        status: editedStatus,
      });
      props.onUpdated(updated);
    } catch (e) {
      console.log("Update failed", e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteNote(props.id);
      props.onDeleted(props.id);
      setDeleteConfirmVisible(false);
    } catch (e) {
      console.log("Delete failed", e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Pressable
      onLongPress={() => props.setActiveNoteId(props.id)}
      >
      <Card style={styles.card}>
        <Card.Title title="Task" />
        <Card.Content>
          <TextInput
            mode="outlined"
            value={editedNote}
            onChangeText={setEditedNote}
            placeholder="Type note..."
          />

          <View style={styles.statusRow}>
            <Text>{editedStatus ? "Done" : "Unfinished"}</Text>
            <Switch value={editedStatus} onValueChange={setEditedStatus} color="#6200ee" />
          </View>
        </Card.Content>

        {isActive && (
          <Card.Actions style={styles.actionsRow}>
            <Button
              mode="outlined"
              onPress={() => setDeleteConfirmVisible(true)}
              loading={deleting}
              disabled={deleting}
            >
              Delete
            </Button>

            <Button
              mode="contained"
              onPress={handleUpdate}
              loading={saving}
              disabled={saving}
            >
              Update
            </Button>
          </Card.Actions>
        )}
      </Card>
      </Pressable>

      <Modal
        isOpen={deleteConfirmVisible}
        onClose={() => {
          if (!deleting) setDeleteConfirmVisible(false);
        }}
        size="sm"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <View style={styles.modalHeaderRow}>
              <FAB
                icon="delete"
                customSize={40}
                mode="flat"
                color="#d4472a"
                style={styles.modalFabIcon}
              />
              <Text variant="titleMedium" style={styles.modalTextWhite}>Delete Note</Text>
            </View>
          </ModalHeader>

          <ModalBody>
            <Text style={styles.modalTextWhite}>Are you sure you want to delete this note?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              mode="contained"
              onPress={() => setDeleteConfirmVisible(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button style={{ backgroundColor: "#d4472a" }}
              mode="contained"
              onPress={handleDelete}
              loading={deleting}
              disabled={deleting}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
  },
  noteText: {
    fontSize: 18,
    marginBottom: 10,
  },
  statusRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionsRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  modalTextWhite: {
    color: "white",
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
});

export default NotePost;