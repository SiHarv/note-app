import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

function Header() {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content title="Note App" titleStyle={styles.title} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200ee', // Primary brand color
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default Header;