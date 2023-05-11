import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import { TextInput, Button, HelperText, Title } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

import styles from '../styles/RegisterStyles';
import { handleRegister, isValidEmail, checkPasswordsMatch } from '../controllers/RegisterController';


const RegisterScreen = ({ route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const navigation = useNavigation();

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
          label="Nombre completo"
          value={name}
          onChangeText={setName}
          style={styles.input}
          autoCapitalize="words"
          mode="outlined"
        />
        <TextInput
          label="Apellidos"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          autoCapitalize="words"
          mode="outlined"
        />
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
          onBlur={() => setPasswordsMatch(checkPasswordsMatch(password, confirmPassword))}
          style={styles.input}
          secureTextEntry
          mode="outlined"
        />
        <TextInput
          label="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onBlur={() => setPasswordsMatch(checkPasswordsMatch(password, confirmPassword))}
          style={styles.input}
          secureTextEntry
          mode="outlined"
        />
        <HelperText type="error" visible={!passwordsMatch}>
          Las contraseñas no coinciden
        </HelperText>
        <HelperText type="error" visible={!isValidEmail(email) && email !== ""}>
          Correo no válido
        </HelperText>
        <HelperText type="error" visible={password.length < 8 && password !== ""}>
          La contraseña debe tener al menos 8 caracteres
        </HelperText>
        <Button
          mode="contained"
          onPress={() => handleRegister(email, password, name, lastName, navigation)}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          disabled={!isValidEmail(email) || password.length < 8 || !passwordsMatch}
        >
          Registrarse
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          labelStyle={styles.backButtonLabel}
        >
          Volver al inicio de sesión
        </Button>
      </View>
    </View>
  );
};

export default RegisterScreen;
