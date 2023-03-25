import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

const BlankScreen = ({route, navigation}) => {
  const {email} = route.params;

  const handleLogout = () => {
    // Navega de vuelta a la pantalla de inicio de sesión
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, {email}</Text>
      <View style={styles.logoutButtonContainer}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          labelStyle={styles.logoutButtonLabel}>
          Cerrar sesión
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#d5bf19',
    paddingHorizontal: 25,
  },
  logoutButtonLabel: {
    fontSize: 18,
  },
});

export default BlankScreen;
