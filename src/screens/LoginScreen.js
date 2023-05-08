import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import { TextInput, Button, HelperText, Title } from "react-native-paper";

import styles from "../styles/LoginScreenStyles";
import { loginUser } from "../controllers/LoginController";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await loginUser(email, password, navigation);
  };

  const handleRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleForgotPassword = () => {
    navigation.navigate("RecuperarContraseñaScreenEmail");
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
