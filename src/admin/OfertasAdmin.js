import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

const OfertasAdmin = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://readoffers-2b2k6woktq-nw.a.run.app/readOffers',
        );
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (selectedOffer) {
        try {
          const response = await fetch(
            `https://readapplicantsbyoffer-2b2k6woktq-nw.a.run.app/readApplicantsByOffer?ofertaId=${selectedOffer.Codigo}`,
          );
          const data = await response.json();
          setApplicants(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchApplicants();
  }, [selectedOffer]);

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
  };

  const handleGoBack = () => {
    setSelectedOffer(null);
  };

  if (selectedOffer) {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* Detalles de la oferta seleccionada */}
          <Text style={styles.title}>{selectedOffer.Oferta}</Text>
          <Text style={styles.description}>{selectedOffer.Empresa}</Text>
          {Object.entries(selectedOffer).map(([key, value]) => (
            key !== 'Oferta' && key !== 'Empresa' ? (
              <Text style={styles.info} key={key}>
                {key}: {value}
              </Text>
            ) : null
          ))}
          {/* Lista de nombres de solicitantes */}
          <Text style={styles.description}>Solicitantes:</Text>
          {applicants.map((applicant, index) => (
            <Text style={styles.info} key={index}>
              {applicant.Nombre}
            </Text>
          ))}
          <Button onPress={handleGoBack} style={styles.button}>
            Volver
          </Button>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          <Text style={styles.pageTitle}>Ofertas</Text>
          {offers.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.offerContainer}
              onPress={() => handleSelectOffer(item)}
            >
              <Text style={styles.title}>{item.Oferta}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
    contentContainer: {
    paddingBottom: 20,
    },
    offerContainer: {
    backgroundColor: '#b5b3b3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    },
    title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    },
    description: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '500',
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
    
    export default OfertasAdmin;