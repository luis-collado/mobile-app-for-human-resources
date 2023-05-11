// MyOffersScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

import styles from '../../styles/client/MyOffersStyles';
import MyOffersController from '../../controllers/client/MyOffersController';

const MyOffersScreen = ({route, navigation}) => {
  const { email } = route.params;
  const isFocused = useIsFocused();

  const {
    offers,
    selectedOffer,
    handleSelectOffer,
    handleGoBack,
    handleUnsubscribe,
  } = MyOffersController(email, isFocused);

  if (selectedOffer) {
    return (
      <View style={styles.container}>
        <Button onPress={handleUnsubscribe} style={styles.unsubscribeButton}>
          Desaplicar
        </Button>
        <ScrollView>
        {/* Detalles de la oferta seleccionada */}
        <Text style={styles.title}>{selectedOffer.Oferta}</Text>
        <Text style={styles.description}>{selectedOffer.Empresa}</Text>
        <Text style={styles.info}>Fecha: {selectedOffer.Fecha}</Text>
        <Text style={styles.info}>Estado: {selectedOffer.Estado}</Text>
        <Text style={styles.info}>Tipo Contrato: {selectedOffer['Tipo contrato']}</Text>
        <Text style={styles.info}>Duración: {selectedOffer.Duración}</Text>
        <Text style={styles.info}>Puestos: {selectedOffer.Puestos}</Text>
        {/* Muestra más información de la oferta aquí */}
        {Object.entries(selectedOffer).map(([key, value]) => (
          key !== 'Oferta' && key !== 'Empresa' && key !== 'Fecha' && key !== 'Estado' &&
          key !== 'Tipo contrato' && key !== 'Duración' && key !== 'Puestos' ? (
            <Text style={styles.info} key={key}>
              {key}: {value}
            </Text>
          ) : null
        ))}
        <Button onPress={handleGoBack} style={styles.button}>
          Volver
        </Button>
      </ScrollView>
    </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Mis Ofertas</Text>
      <FlatList
        data={offers}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleSelectOffer(item)}
            style={styles.offerContainer}
          >
            <Text style={styles.title}>{item.Oferta}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
    );
  }
};


  
  export default MyOffersScreen;