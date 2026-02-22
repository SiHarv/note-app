import React from "react";
import { SafeAreaView, StyleSheet, View, Platform, StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import NoteScreen from "./app/screens/noteScreen";
import Header from "./app/components/header";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function App() {
  return (
    
    <GluestackUIProvider mode="dark">
      <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <View style={styles.container}>
          <NoteScreen />
        </View>
      </SafeAreaView>
    </PaperProvider>
    </GluestackUIProvider>
  
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
