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


  
  export default MyOffersScreen;