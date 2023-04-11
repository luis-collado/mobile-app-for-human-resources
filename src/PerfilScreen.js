import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MiPerfilScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      {/* Agrega la información y elementos de perfil aquí */}
      <Text style={styles.info}>Nombre: John Doe</Text>
      <Text style={styles.info}>Correo electrónico: john.doe@example.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
      paddingTop: 10,
      flexDirection: 'column',
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
  });
  

export default MiPerfilScreen;
