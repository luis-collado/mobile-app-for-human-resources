import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';

const CreateOfferScreen = () => {
  const [offerData, setOfferData] = useState({}); // Almacenar los datos del formulario

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://createoffer-2b2k6woktq-nw.a.run.app/createOffer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offerData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al crear la oferta: ${errorData.message}`);
      }
  
      Alert.alert('Oferta creada con éxito');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la oferta:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setOfferData({ ...offerData, name: text })}
      />
      
      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setOfferData({ ...offerData, description: text })}
      />
      
      <Text style={styles.label}>Precio:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setOfferData({ ...offerData, price: parseFloat(text) })}
      />
      
      <Text style={styles.label}>Cantidad:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setOfferData({ ...offerData, quantity: parseInt(text, 10) })}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear Oferta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CreateOfferScreen;