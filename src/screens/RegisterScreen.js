import React, { useState } from "react";
import { View,Image, Alert } from "react-native";
import { TextInput, Button, HelperText, Title } from "react-native-paper";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import firebaseApp from "../services/firebaseConfig"; 

import { useNavigation } from '@react-navigation/native';

import styles from '../styles/RegisterScreenStyles';






const RegisterScreen = ({ route}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const navigation = useNavigation();


  const checkPasswordsMatch = () => {
    if (password.length > 0 && confirmPassword.length > 0) {
      setPasswordsMatch(password === confirmPassword);
    }
  };

  const handleRegister = async () => {
    console.log("handleRegister called");
    const auth = getAuth(firebaseApp); // Utiliza getAuth con la configuración de Firebase
    const db = getFirestore(firebaseApp);

    const usernameQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(usernameQuery);

    if (!querySnapshot.empty) {
      setUsername({ ...email, error: "Email is already in use." });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("Account created! User credential:", userCredential);
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: username,
        });

        sendEmailVerification(user)
          .then(() => {
            console.log("Verification email sent!");
          })
          .catch((error) => {
            console.error("Error sending verification email:", error);
          });

        try {
          const docRef = await setDoc(doc(db, "users", auth.currentUser.uid), {
            id: auth.currentUser.uid,
            name: name,
            lastName: lastName,
            email: email,
          });
          console.log("User written with ID: ", auth.currentUser.uid);

          // Call the API to save user data to MySQL
          const saveUserDataToMySQL = async (nombre, apellidos, email, contraseña) => {
            try {
              const response = await fetch("https://saveuserdata-2b2k6woktq-nw.a.run.app/api/saveUserData", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, nombre, apellidos, contraseña }),
              });
          
              if (!response.ok) {
                throw new Error("Failed to save user data to MySQL" + JSON.stringify({ email, nombre, apellidos, contraseña }));
              }
          
              Alert.alert("Exito", "La cuenta ha sido creada correctamente, Verifica Cuenta con el email(puede star en el spam)");
              console.log("User data saved to MySQL successfully");
              return { success: true };
            } catch (error) {
              Alert.alert("Error", "El email ya está siendo utilizado");
              console.error("Error saving user data to MySQL:", error);
              return { success: false, error: error.message };
            }
          };



          await saveUserDataToMySQL(name, lastName, email, password);

        } catch (e) {
          Alert.alert("Error", "El email ya está siendo utilizado");
          console.error("Error adding document: ", e);
        }

        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          Alert.alert("Error", "El email ya está siendo utilizado");
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert("Error", "El email ya está siendo utilizado");
          console.log("That email address is invalid!");
        }
        Alert.alert("Error", "El email ya está siendo utilizado");
        console.error(error);
      });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
        onBlur={checkPasswordsMatch}
        style={styles.input}
        secureTextEntry
        mode="outlined"
      />
      <TextInput
        label="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onBlur={checkPasswordsMatch}
        style={styles.input}
        secureTextEntry
        mode="outlined"
      />
      <HelperText type="error" visible={!passwordsMatch}>
        Las contraseñas no coinciden
      </HelperText>

        <HelperText type="error" visible={!isValidEmail(email) && email!== ""}>
          Correo no válido
        </HelperText>

        <HelperText type="error" visible={password.length < 8 && password!== ""}>
          La contraseña debe tener al menos 8 caracteres
        </HelperText>
        <Button
          mode="contained"
          onPress={handleRegister}
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

//API que guarda usuarios al registrarse en GCP
const saveUserDataToMySQL = async (nombre, apellidos, email, contraseña) => {
  try {
    const response = await fetch('https://saveuserdata-2b2k6woktq-nw.a.run.app/api/saveUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, nombre, apellidos, contraseña}),
    });

    if (!response.ok) {
      throw new Error('Failed to save user data to MySQL' + JSON.stringify({email, nombre, apellidos, contraseña}));
    }

    console.log('User data saved to MySQL successfully');
    return {success: true};
  } catch (error) {
    console.error('Error saving user data to MySQL:', error);
    return {success: false, error: error.message};
  }
};

export default RegisterScreen;