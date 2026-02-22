import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, StatusBar } from 'react-native';

const HEADER_COLOR = '#6200ee';

function Header() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={HEADER_COLOR}
        translucent={false}
      />
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Note App" titleStyle={styles.title} />
      </Appbar.Header>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: HEADER_COLOR,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default Header;