import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Headline,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";
import { updateNote, Note } from "../api/noteAPI";

interface NotePostProps {
  id: number;
  note: string;
  status: boolean; 
  onUpdated: (updated: Note) => void;
}

function NotePost(props: NotePostProps) {
  const [editedNote, setEditedNote] = useState(props.note);
  const [editedStatus, setEditedStatus] = useState(props.status); 
  const [saving, setSaving] = useState(false);

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

  return (
    <Card style={styles.card}>
      <Card.Title title="Task" />
      <Card.Content>
        <Headline style={styles.noteText}>Edit Note</Headline>
        <TextInput
          mode="outlined"
          value={editedNote}
          onChangeText={setEditedNote}
          placeholder="Type note..."
        />
      </Card.Content>

      <Card.Actions style={styles.actionsRow}>
        <Button mode="outlined">Delete</Button>

        <View style={styles.updateGroup}>
          <Text>{editedStatus ? "Done" : "Unfinished"}</Text>
          <Switch value={editedStatus} onValueChange={setEditedStatus} color="#6200ee" />
          <Button
            mode="contained"
            onPress={handleUpdate}
            loading={saving}
            disabled={saving}
          >
            Update
          </Button>
        </View>
      </Card.Actions>
    </Card>
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
  actionsRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  updateGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default NotePost;