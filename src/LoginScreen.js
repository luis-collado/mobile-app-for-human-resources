import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TextInput, Button, HelperText, Title} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const handleLogin = async () => {
    // Aquí puedes implementar la lógica de inicio de sesión con tu backend
    if (email !== '' && password.length >= 8) {
      
    } else {
      // Mostrar algún mensaje de error si es necesario
    }
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const response = await fetch("https://loginuser-2b2k6woktq-nw.a.run.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.text();
        console.log("Inicio de sesión exitoso:", data);
        navigation.navigate('BlankScreen', {email: email});
        
      } else {
        console.error("Error al iniciar sesión:", response.statusText);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }

  }
  

  

  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
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
      </View>
    </View>
  );
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
  registerButton: {
    marginTop: 10,
    borderColor: '#d5bf19',
  },
  registerButtonLabel: {
    fontSize: 18,
    color: '#d5bf19',
  },
});

export default LoginScreen;