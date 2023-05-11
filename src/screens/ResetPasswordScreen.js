// RecuperarContraseñaScreenEmail.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, IconButton } from 'react-native-paper';

import styles from '../styles/ResetPasswordStyle';
import RecuperarContraseñaScreenEmailController from '../controllers/ResetPasswordController';

const ResetPasswordScreen = ({ navigation }) => {
  const { email, setEmail, handleGoBack, handleResetPassword } = RecuperarContraseñaScreenEmailController(navigation);

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


export default ResetPasswordScreen;

