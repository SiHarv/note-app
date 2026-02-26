import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import NoteScreen from "./app/screens/noteScreen";
import Header from "./app/components/header";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
