import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import { TextInput, Button, HelperText, Title } from "react-native-paper";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import firebaseApp from "../services/firebaseConfig";

import styles from '../styles/LoginScreenStyles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(firebaseApp);

  const handleLogin = async () => {
    if (email !== '' && password.length >= 8) {
    } else {
    }
    console.log('Email:', email);
    console.log('Password:', password);

    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        console.log("Signed in!");
        console.log(auth.currentUser.uid);
  
      // Obtén el rol del usuario desde Firestore
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const userRole = userData.role; // Asume que el rol está guardado en el campo "role"
  
        // Navega a la pantalla correspondiente según el rol del usuario
        if (userRole === "admin") {
          navigation.navigate("AdminScreen");
        } else {
          navigation.navigate("Welcome", { email: email });
        }
      } else {
        Alert.alert('Error', 'Error en la contraseña o el email');
        console.log("No such document!");
      }
      } else {
        Alert.alert(
          "Error",
          "Por favor, verifica tu correo electrónico antes de iniciar sesión."
        );
        console.log("Email not verified");
      }
    })
    .catch((error) => {
      Alert.alert('Error', 'Error en la contraseña o el email');
      console.log(error);
    });

  };

  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const handleForgotPassword = () => {
    navigation.navigate('RecuperarContraseñaScreenEmail');
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
