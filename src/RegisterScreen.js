import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TextInput, Button, HelperText, Title} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleRegister = () => {
    // Aquí puedes implementar la lógica de registro con tu backend
    console.log('Nombre completo:', fullName);
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
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
          value={fullName}
          onChangeText={setFullName}
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
        <HelperText type="error" visible={password.length < 8}>
          La contraseña debe tener al menos 8 caracteres
        </HelperText>
        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.button}
          labelStyle={styles.buttonLabel}
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
});

export default RegisterScreen;