// RecuperarContraseñaScreenEmailController.js
import { useState } from 'react';
import { Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const RecuperarContraseñaScreenEmailController = (navigation) => {
  const [email, setEmail] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert("Error", "Por favor, introduce tu correo electrónico.");
      return;
    }

    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Correo enviado",
          "Se ha enviado un correo electrónico de restablecimiento de contraseña a la dirección proporcionada."
        );
      })
      .catch((error) => {
        console.error("Error al enviar el correo electrónico de restablecimiento:", error);
        Alert.alert("Error", "No se pudo enviar el correo electrónico de restablecimiento.");
      });
  };

  return { email, setEmail, handleGoBack, handleResetPassword };
};

export default RecuperarContraseñaScreenEmailController;
