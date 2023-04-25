import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CrearOfertas = ({ route }) => {
  const [offerData, setOfferData] = useState({
    Codigo: '',
    Fecha: '',
    Oferta: '',
    Empresa: '',
    Estado: '',
    Cubierta: '',
    Tipo_contrato: '',
    Duracion: '',
    Observaciones_duracion: '',
    Puestos: '',
    Expdte_asociados: '',
    Expdte_asociados_por_sondeo: '',
    Expdte_asociados_online: '',
    Enviados_entrevista: '',
    Contratados: '',
    CNAE: '',
    Idiomas: '',
    Vehiculo: '',
    Formacion: '',
    Tamaño_empresa: '',
    Persona_contacto: '',
    Telefono_contacto: '',
    Email_contacto: '',
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onSubmitEditing = (nextField) => {
    if (nextField && nextField.current) {
      nextField.current.focus();
    } else {
      Keyboard.dismiss();
    }
  };

  const fieldRefs = useRef(
    Object.keys(offerData).reduce((acc, key) => {
      acc[key] = React.createRef();
      return acc;
    }, {})
  );

  const handleConfirm = (date) => {
    handleChange('Fecha', date.toISOString().split('T')[0]);
    hideDatePicker();
  };

  const handleChange = (field, value) => {
    setOfferData({ ...offerData, [field]: value });
  };

  const handleSubmit = async () => {
    const email = 'admin@gmail.com';
    try {
      const response = await fetch(
        'https://createoffer-2b2k6woktq-nw.a.run.app/createOffer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, offerData }),
        }
      );
      const data = JSON.stringify({ email, offerData });
      console.log(email);
      const responseText = await response.text();
      console.log('Response text:', responseText);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Crear Oferta</Text>
        {Object.keys(offerData).map((key, index, arr) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{key}</Text>
            {key === 'Fecha' ? (
              <TouchableOpacity onPress={showDatePicker}>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.dateInput}>{offerData[key]}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange(key, text)}
                value={offerData[key]}
                keyboardType={
                  [
                    'Puestos',
                    'Enviados_entrevista',
                    'Contratados',
                    'Telefono_contacto',
                    'Expdte_asociados',
                    'Expdte_asociados_por_sondeo',
                    'Expdte_asociados_online',
                    'Enviados_entrevista',
                    'Contratados',
                  ].includes(key)
                    ? 'numeric'
                    : 'default'
                }
                multiline={key === 'Observaciones_duracion'}
                ref={fieldRefs.current[key]}
                returnKeyType={
                  index === arr.length - 1
                    ? 'done'
                    : 'next'
                }
                onSubmitEditing={() =>
                  onSubmitEditing(fieldRefs.current[arr[index + 1]])
                }
                blurOnSubmit={false}
              />
            )}
          </View>
        ))}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          display="default" // Añade esta línea
        />
        <Button onPress={handleSubmit} style={styles.button}>
          Enviar
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 40,
  },
  dateInputContainer: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },
  dateInput: {
    fontSize: 16,
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default CrearOfertas;