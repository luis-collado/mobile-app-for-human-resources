import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {Button} from 'react-native-paper';

import styles from '../../styles/client/OfferStyles';
import OffersScreenController from '../../controllers/client/OffersController';

const OffersScreen = ({route, navigation}) => {
  const {email} = route.params;
  const { offers, selectedOffer, handleSelectOffer, handleApplyOffer, handleGoBack } = OffersScreenController(email);

  const applyOffer = async (offerId) => {
    const success = await handleApplyOffer(offerId);
    if (success) {
      Alert.alert(
        '¡Aplicación exitosa!',
        'Has aplicado correctamente a la oferta',
        [{ text: 'OK', onPress: () => handleGoBack() }],
      );
    }
  };
  

  if (selectedOffer) {
    console.log(selectedOffer);
    return (
      <View style={styles.container}>
        <ScrollView>
            <Button
                style={styles.applyButtonColor}
                onPress={() => {
                  if (selectedOffer.Estado == "Abierta") {
                    applyOffer(selectedOffer.Codigo);
                  } else {
                    Alert.alert('La oferta no está abierta.'); // o maneja el error como prefieras
                  }
                }}
          >
            Aplicar
          </Button>

          {/* Detalles de la oferta seleccionada */}
          <Text style={styles.title}>{selectedOffer.Oferta}</Text>
          <Text style={styles.description}>{selectedOffer.Empresa}</Text>

          {/* Muestra más información de la oferta aquí */}
          {Object.entries(selectedOffer).map(([key, value]) => (
            key !== 'Oferta' && key !== 'Empresa' ? (
              <View style={styles.fieldContainer} key={key}>
              <Text style={styles.fieldLabel}>{key}:</Text>
              <Text style={styles.fieldValue}>{value}</Text>
            </View>
          ) : null
        ))}
          <Button onPress={handleGoBack} style={styles.button}>
            Volver
          </Button>
        </ScrollView>
      </View>
    );
  }else {
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Ofertas</Text>
        <FlatList
  data={offers}
  renderItem={({item}) => (
    <TouchableOpacity
      onPress={() => handleSelectOffer(item)}
      style={styles.offerContainer}
    >
      <Text 
  style={[
    styles.title, 
    { 
      color: item.Estado === 'Abierta' ? 'green' : 
      item.Estado === 'Cerrada' ? 'red' : 
      item.Estado === 'En elaboración' ? 'yellow' : 
      'black' 
    }
  ]}
>
  {item.Oferta}
</Text>

    </TouchableOpacity>
  )}
  keyExtractor={(item, index) => index.toString()}
/>


      </View>
    );
  }
};


export default OffersScreen;      