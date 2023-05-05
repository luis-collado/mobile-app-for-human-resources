import React, { useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { TextInput, Button, HelperText, Title } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import firebaseApp from "./firebaseConfig"; // Asume que has creado un archivo de configuración de Firebase




const RegisterScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const checkPasswordsMatch = () => {
    setPasswordsMatch(password === confirmPassword);
  };

  const handleRegister = async () => {
    const auth = getAuth(firebaseApp); // Utiliza getAuth con la configuración de Firebase
    const db = getFirestore(firebaseApp);

    const usernameQuery = query(
      collection(db, "users"),
      where("username", "==", username)
    );
    const querySnapshot = await getDocs(usernameQuery);

    if (!querySnapshot.empty) {
      setUsername({ ...username, error: "Username is already in use." });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("Account created!");
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: username,
        });

        try {
          const docRef = await setDoc(doc(db, "users", auth.currentUser.uid), {
            name: name,
            lastName: lastName,
            username: username,
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
          
              console.log("User data saved to MySQL successfully");
              return { success: true };
            } catch (error) {
              console.error("Error saving user data to MySQL:", error);
              return { success: false, error: error.message };
            }
          };



          await saveUserDataToMySQL(
            auth.currentUser.uid,
            name,
            lastName,
            email,
            username
          );
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          Alert.alert("Error", "El email ya está siendo utilizado");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

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
          source={require('./logo.png')} // Reemplaza esto con la ruta de tu logo
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    flexGrow: 2,
    paddingHorizontal: 30,
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
  backButton: {
    marginTop: 10,
  },
  backButtonLabel: {
    fontSize: 16,
    color: '#d5bf19',
  },
});

export default RegisterScreen;