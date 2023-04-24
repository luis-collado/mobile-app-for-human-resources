import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const OfertasAdmin = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de ofertas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default OfertasAdmin;