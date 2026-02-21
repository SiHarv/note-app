import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Headline, Paragraph, Switch, Text } from 'react-native-paper';

interface NotePostProps {
  note: string;
  status: boolean;
}

// Capitalized the function name to NotePost
function NotePost(props: NotePostProps) {
  return (
    <Card style={styles.card}>
      <Card.Title title="Task" />
      <Card.Content>
        <Headline style={styles.noteText}>{props.note}</Headline>
        <View style={styles.statusRow}>
          <Text>{props.status ? "Done" : "Unfinished"}</Text>
          {/* Using a Switch to represent the boolean status */}
          <Switch value={props.status} color="#6200ee" />
        </View>
      </Card.Content>
      <Card.Actions>
        <Button mode="outlined">Delete</Button>
        <Button mode="contained">Update</Button>
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
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  }
});

export default NotePost;