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
  
  export const loginUser = async (email, password, navigation) => {
    const auth = getAuth(firebaseApp);
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
          console.log("No such document!");
          throw new Error("Error en la contraseña o el email");
        }
      } else {
        console.log("Email not verified");
        throw new Error(
          "Por favor, verifica tu correo electrónico antes de iniciar sesión."
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };
  