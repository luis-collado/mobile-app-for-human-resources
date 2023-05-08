import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,Alert } from 'react-native';
import { Button } from 'react-native-paper';

import styles from '../../styles/client/ActualizarPerfilScreenStyles';

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
      Alert.alert(
        'Perfil Modificado',
        'El perfil ha sido modificado correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack({email}),
          },
        ]
      );
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
       <Button
          onPress={() => navigation.goBack()}
          style={[styles.buttonback, { marginTop: 10 }]}
        >
          Volver
        </Button>
    </ScrollView>
  );
};


export default ActualizarPerfilScreen;