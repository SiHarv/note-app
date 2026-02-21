import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Headline, Provider as PaperProvider } from "react-native-paper";
import NoteScreen from "./app/screens/noteScreen";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
      <View>
      <NoteScreen />
      </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: "#000"
  }
});
