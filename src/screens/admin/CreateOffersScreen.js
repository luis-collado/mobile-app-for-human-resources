// CreateOffersScreen.js
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles/admin/CreateOffersStyles';
import CreateOffersController from '../../controllers/admin/CreateOffersController';

const CreateOffersScreen = ({ route }) => {
  const navigation = useNavigation();
  const controller = CreateOffersController(navigation);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Crear Oferta</Text>
        <Button
          labelStyle={{color: '#ffffff'}}
          onPress={() => navigation.goBack()}
          style={[styles.button, { marginTop: 10 }]}
        >
          Volver
        </Button>
        {Object.keys(controller.offerData).map((key, index, arr) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{key}</Text>
            {key === 'Fecha' ? (
              <TouchableOpacity onPress={controller.showDatePicker}>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.dateInput}>{controller.offerData[key]}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TextInput
                style={styles.input}
                onChangeText={(text) => controller.handleChange(key, text)}
                value={controller.offerData[key]}
                keyboardType={controller.getKeyboardType(key)}
                multiline={key === 'Observaciones_duracion'}
                ref={controller.fieldRefs.current[key]}
                returnKeyType={controller.getReturnKeyType(index, arr)}
                onSubmitEditing={() => controller.onSubmitEditing(arr[index + 1])}
                blurOnSubmit={false}
              />
            )}
          </View>
        ))}
        <DateTimePickerModal
          isVisible={controller.isDatePickerVisible}
          mode="date"
          onConfirm={controller.handleConfirm}
          onCancel={controller.hideDatePicker}
          display="default" // Añade esta línea
        />
        <Button labelStyle={{color: '#ffffff'}} onPress={controller.handleSubmit} style={styles.button}>
          Enviar
        </Button>
      </View>
    </ScrollView>
  );
};

export default CreateOffersScreen;
