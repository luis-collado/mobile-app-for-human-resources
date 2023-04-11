import React, {useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {TextInput, Button, HelperText, Title} from 'react-native-paper';


const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');



   const handleRegister = async () => {
    // Aquí puedes implementar la lógica de registro con tu backend
    console.log('Nombre ', name);
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
    const result = await saveUserDataToMySQL(name, lastName, email, password);
    if (result.success) {
      navigation.navigate('LoginScreen');
    } else {
      if (result.error.includes('Failed to save user data to MySQL')) {
        Alert.alert('Error', 'El email ya está siendo utilizado');
      }
    }
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
          style={styles.input}
          secureTextEntry
          mode="outlined"
        />

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
          disabled={!isValidEmail(email) || password.length < 8}
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
    const response = await fetch('https://saveuserdata-2b2k6woktq-nw.a.run.app', {
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