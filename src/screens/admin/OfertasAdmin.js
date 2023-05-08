import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView,Alert  } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

const OfertasAdmin = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const isFocused = useIsFocused();
  const [refreshOffers, setRefreshOffers] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused || refreshOffers) {
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
    }
  }, [isFocused, refreshOffers]);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (selectedOffer) {
        try {
          const response = await fetch(
            `https://readapplicantsbyoffer-2b2k6woktq-nw.a.run.app/readApplicantsByOffer?ofertaId=${selectedOffer.Codigo}`,
          );

          if (response.status === 404) {
            const message = await response.text();
            setApplicants(message);
          } else {
            const data = await response.json();
            setApplicants(data);
          }
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

  const handleDeleteOffer = async () => {
    try {
      const response = await fetch(`https://deleteoffer-2b2k6woktq-nw.a.run.app/deleteOffer`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: 'admin@gmail.com', // Reemplaza esto con el email que corresponda
          offerId: selectedOffer.Codigo,
        }),
      });
  
      if (response.ok) {
        setRefreshOffers(!refreshOffers);
        setSelectedOffer(null);
        Alert.alert('Éxito', 'La oferta se ha eliminado correctamente.');
      } else {
        const errorText = await response.text();
        console.error(`Error al eliminar la oferta: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  

  function parseJsonOrReturnText(input) {
    if (typeof input === 'string' && (input.trim().startsWith('{') || input.trim().startsWith('['))) {
      try {
        const parsedJson = JSON.parse(input);
        return parsedJson;
      } catch (error) {
        return input;
      }
    } else {
      return input;
    }
  }

  if (selectedOffer) {
    const parsedApplicants = parseJsonOrReturnText(applicants);
    const isArray = Array.isArray(parsedApplicants);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
      <Text style={styles.title}>{selectedOffer.Oferta}</Text>
      <Button onPress={handleDeleteOffer} style={styles.deleteButton}>
      Eliminar
      </Button>
      </View>
      <Text style={styles.description}>{selectedOffer.Empresa}</Text>
      {Object.entries(selectedOffer).map(([key, value]) => (
      key !== 'Oferta' && key !== 'Empresa' ? (
      <Text style={styles.info} key={key}>
      {key}: {value}
      </Text>
      ) : null
      ))}
      <Text style={styles.description}>Solicitantes:</Text>
      {isArray ? (
      parsedApplicants.map((applicant, index) => (
      <Text style={styles.info} key={index}>
      {applicant.Nombre}
      </Text>
      ))
      ) : (
      <Text style={styles.info}>{parsedApplicants}</Text>
      )}
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
      <View style={styles.header}>
      <Text style={styles.pageTitle}>Ofertas</Text>
      <Button
      onPress={() => navigation.navigate('CrearOfertas')}
      style={styles.createButton}
      >
      Crear
      </Button>
      </View>
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
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      createButton: {
        alignSelf: 'flex-end',
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
      deleteButton: {
        backgroundColor: '#d5bf19',
        borderRadius: 10,
      },
});

export default OfertasAdmin;