import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { FAB } from 'react-native-paper';


const MiPerfilScreen = ({route, navigation}) => {
  const {email} = route.params;

  const handleLogout = () => {
    // Aquí puedes implementar el proceso de cierre de sesión con tu backend si es necesario
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Mi Perfil</Text>
    {/* Agrega la información y elementos de perfil aquí */}
    <Text style={styles.info}>Nombre: John Doe</Text>
    <Text style={styles.info}>Correo electrónico: {email}</Text>
    <FAB
      style={styles.fab}
      icon="logout"
      onPress={handleLogout}
      label="Cerrar sesión"
    />
  </ScrollView>
  );
  }

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 60,
    flexDirection: 'column',
    paddingBottom: 80, // Agrega un espacio adicional al final del contenido
  },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      alignSelf: 'flex-start',
      textAlign: 'center',
    },
    info: {
      fontSize: 18,
      marginBottom: 10,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      top: 20,
      backgroundColor: '#d5bf19',
    },
  });
  

export default MiPerfilScreen;
