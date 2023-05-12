import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../../styles/client/UpdateProfileStyles';
import { useUpdateProfileController } from '../../controllers/client/UpdateProfileController';

const UpdateProfileScreen = ({ route, navigation }) => {
  const { userData, setUserData, error, updateProfile, handleChange } = useUpdateProfileController(route, navigation);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Actualizar Perfil</Text>
      <Button
        onPress={() => navigation.goBack()}
        style={[styles.buttonBack, { marginTop: 10 }]}
        color="#ffffff"
      >
        Volver
      </Button>
      {Object.keys(userData)
        .filter((key) => key !== 'mis_ofertas' && key !== 'foto_perfil' && key !== 'CV')
        .map((key) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{key}:</Text>
            <TextInput
              style={styles.input}
              value={userData[key] ? userData[key].toString() : ''}
              onChangeText={(value) => handleChange(key, value)}
              underlineColorAndroid="transparent"
            />
          </View>
        ))}

      {error && <Text style={styles.errorText}>Error al actualizar los datos: {error}</Text>}
      
      <Button mode="contained" onPress={updateProfile} style={styles.button}>
        Guardar cambios
      </Button>

     
    </ScrollView>
  );
};

export default UpdateProfileScreen;
