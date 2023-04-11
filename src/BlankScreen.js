import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import Papa from 'papaparse';
import csvData from './ofertas.csv.js';

const BlankScreen = ({route, navigation}) => {
  //const {email} = route.params;
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const parseCSV = () => {
      Papa.parse(csvData, {
        header: true,
        delimiter: ";",
        complete: (results) => {
          setOffers(results.data);
        },
      });
    };

    parseCSV();
  }, []);

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.offersContainer}>
      {offers.map((offer, index) => (
  offer.Oferta && ( // Asegúrate de que 'Oferta' esté presente en el objeto 'offer'
    <TouchableOpacity
      key={index}
      onPress={() => navigation.navigate('OfferDetailsScreen', {offer: offer})}
      style={styles.offer}>
      <Text style={styles.offerTitle}>{offer.Oferta}</Text>
      <Text style={styles.offerDescription}>{offer.Empresa}</Text>
    </TouchableOpacity>
  )
))}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  offersContainer: {
    width: '100%',
  },
  offer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  offerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  offerDescription: {
    fontSize: 12,
    color: '#888',
  },
});

export default BlankScreen;
