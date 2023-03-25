import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const BlankScreen = ({route}) => {
  const {email} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, {email}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default BlankScreen;