import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, IconButton } from 'react-native-paper';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import styles from '../styles/RecuperarContraseñaScreenStyle';

const RecuperarContraseñaScreenEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleResetPassword = () => {
    if (!email) {
      // Muestra un mensaje de error si el campo de correo electrónico está vacío
      Alert.alert("Error", "Por favor, introduce tu correo electrónico.");
      return;
    }

    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Muestra un mensaje de éxito cuando se envía el correo electrónico de restablecimiento
        Alert.alert(
          "Correo enviado",
          "Se ha enviado un correo electrónico de restablecimiento de contraseña a la dirección proporcionada."
        );
      })
      .catch((error) => {
        // Muestra un mensaje de error en caso de que ocurra algún problema
        console.error("Error al enviar el correo electrónico de restablecimiento:", error);
        Alert.alert("Error", "No se pudo enviar el correo electrónico de restablecimiento.");
      });
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


export default RecuperarContraseñaScreenEmail;
