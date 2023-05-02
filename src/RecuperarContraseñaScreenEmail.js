import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, IconButton } from 'react-native-paper';

const RecuperarContraseñaScreenEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleResetPassword = () => {
    // Lógica para enviar el correo electrónico al servidor y solicitar la recuperación de la contraseña
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        color="#d5bf19"
        size={24}
        onPress={handleGoBack}
        style={styles.backButton}
      />
      <Title style={styles.title}>Introduce email para recuperar la contraseña</Title>
      <TextInput
        label="Introduce el correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        mode="outlined"
      />
      <Button
        mode="contained"
        onPress={handleResetPassword}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Enviar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#d5bf19',
  },
  buttonLabel: {
    fontSize: 18,
  },
});

export default RecuperarContraseñaScreenEmail;