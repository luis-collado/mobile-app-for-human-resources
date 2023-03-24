import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import LoginScreen from './src/LoginScreen';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <LoginScreen />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
