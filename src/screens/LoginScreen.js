import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import { TextInput, Button, HelperText, Title } from "react-native-paper";

import styles from "../styles/LoginStyles";
import { loginUser } from "../controllers/LoginController";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const error = await loginUser(email, password, navigation);
    if (error) {
      let alertMessage;
      switch (error.code) {
        case "auth/wrong-password":
          alertMessage = "Email o contraseña incorrectos. Por favor, inténtalo de nuevo.";
          break;
          
        case "auth/email-not-verified":
          alertMessage = "Por favor, verifica tu correo electrónico antes de iniciar sesión.";
          break;
        
        case "auth/invalid-email":
          alertMessage = "La dirección de correo electrónico no es válida.";
          break;
        case "auth/user-not-found":
          alertMessage = "No se encontró ningún usuario con ese correo electrónico.";
          break;

        default:
          alertMessage = error.message; // Si no hay un mensaje personalizado, usa el mensaje de error predeterminado
          break;
      }
      Alert.alert("Error", alertMessage);
    }
  };

  const handleRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ResetPasswordScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')} // Reemplaza esto con la ruta de tu logo
          style={styles.logo}
        />
        <Title style={styles.title}>Timely Talent</Title>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          mode="outlined"
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          mode="outlined"
        />
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Iniciar sesión
        </Button>
        <Button
          mode="outlined"
          onPress={handleRegister}
          style={styles.registerButton}
          labelStyle={styles.registerButtonLabel}
        >
          Registrarse
        </Button>
        <Button
          mode="text"
          onPress={handleForgotPassword}
          style={styles.forgotPasswordButton}
          labelStyle={styles.forgotPasswordButtonLabel}
        >
          ¿Olvidaste la contraseña?
        </Button>
      </View>
    </View>
  );
};
export default LoginScreen;
