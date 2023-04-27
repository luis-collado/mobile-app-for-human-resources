import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const ActualizarPerfilScreen = ({ route, navigation }) => {
  const { email, userData: initialUserData } = route.params;
  const [userData, setUserData] = useState(initialUserData);
  const [error, setError] = useState(null);
  useEffect(() => {
    setUserData(initialUserData);
  }, [initialUserData]);

  const actualizarPerfil = async () => {
    setError(null);

    const { mis_ofertas,foto_perfil, CV, ...updatedUserData } = userData;

    const requestBody = {
      email: email,
      userData: updatedUserData,
    };

    console.log('JSON enviado:', JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch('https://updateuserdata-2b2k6woktq-nw.a.run.app/updateUserData', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody, null, 2),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response;
      console.log('Datos actualizados:', data);
      navigation.navigate('PerfilScreen', { email });
    } catch (error) {
      setError(error.message);
      console.log('Error al actualizar los datos:', error);
    }
  };

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Actualizar Perfil</Text>
      {Object.keys(userData)
        .filter((key) => key !== 'mis_ofertas' && key !== 'foto_perfil' && key !== 'CV')
        .map((key) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{key}:</Text>
            <TextInput
              style={styles.input}
              value={userData[key] ? userData[key].toString() : ''} // Verificación añadida
              onChangeText={(value) => handleChange(key, value)}
            />
          </View>
        ))}
      {error && <Text>Error al actualizar los datos: {error}</Text>}
      <Button mode="contained" onPress={actualizarPerfil} style={styles.button}>
        Guardar cambios
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#d5bf19',
    alignSelf: 'flex-start',
  },
});

export default ActualizarPerfilScreen;