import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
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
  import { Alert } from 'react-native';

  
  export const checkPasswordsMatch = (password, confirmPassword) => {
    if (password.length > 0 && confirmPassword.length > 0) {
      return password === confirmPassword;
    }
  };
  
  export const handleRegister = async (email, password, name, lastName, navigation) => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
  
    const usernameQuery = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(usernameQuery);
  
    if (!querySnapshot.empty) {
      Alert.alert("Error", "El email ya está siendo utilizado");
      return;
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name,
        });
  
        sendEmailVerification(user)
          .then(() => {
            console.log("Verification email sent!");
          })
          .catch((error) => {
            console.error("Error sending verification email:", error);
          });
  
        try {
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            id: auth.currentUser.uid,
            name: name,
            lastName: lastName,
            email: email,
          });
  
          await saveUserDataToMySQL(name, lastName, email, password);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        
        Alert.alert(
            "¡Registro exitoso!", 
            "La cuenta ha sido creada correctamente. Por favor, verifica tu cuenta con el correo que te enviamos. Si no ves el correo, puede estar en tu carpeta de spam."
          );
          
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        Alert.alert("Error", "El email ya está siendo utilizado");
        console.error(error);
      });
  };
  
  export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  //API que guarda usuarios al registrarse en GCP
  export const saveUserDataToMySQL = async (nombre, apellidos, email, contraseña) => {
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