import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const OfferDetailsScreen = ({route, navigation}) => {
  const {offer} = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{offer.Oferta}</Text>
      <Text style={styles.description}>{offer.Empresa}</Text>
      <Text style={styles.info}>Fecha: {offer.Fecha}</Text>
      <Text style={styles.info}>Estado: {offer.Estado}</Text>
      <Text style={styles.info}>Tipo Contrato: {offer['Tipo contrato']}</Text>
      <Text style={styles.info}>Duración: {offer.Duración}</Text>
      <Text style={styles.info}>Puestos: {offer.Puestos}</Text>
      {/* Muestra más información de la oferta aquí */}
      <Button onPress={handleGoBack} style={styles.button}>
        Volver
      </Button>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  description: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '500',
  },
  detailsContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 20,
    borderRadius: 10,
  },
});


export default OfferDetailsScreen;
