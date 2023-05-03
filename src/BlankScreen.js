import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView,Alert} from 'react-native';
import {Button} from 'react-native-paper';

const BlankScreen = ({route,navigation}) => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const {email} = route.params;
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

  const handleGoBack = () => {
    setSelectedOffer(null);
  };

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
  };

  const handleApplyOffer = async (email, offerId) => {
    try {
      const requestBody = {
        email: email,
        ofertaId: offerId,
      };
  
      console.log('Enviando JSON al servidor:', JSON.stringify(requestBody)); // Agrega esta línea
  
      const response = await fetch('https://applyoffers-2b2k6woktq-nw.a.run.app/applyOffers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        Alert.alert(
          '¡Aplicación exitosa!',
          'Has aplicado correctamente a la oferta',
          [{ text: 'OK', onPress: () => setSelectedOffer(null) }],
        );
      } else {
        const errorText = await response.text();
        throw new Error(` ${errorText}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  };
  

  if (selectedOffer) {
    console.log(selectedOffer);
    return (
      <View style={styles.container}>
        <ScrollView>
            <Button
              style={styles.applyButtonColor}
              onPress={() => handleApplyOffer(email, selectedOffer.Codigo)}
            >
              Aplicar
            </Button>
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
            key !== 'Tipo contrato' && key !== 'Duración' && key !== 'Puestos' && key !== 'ofertaId' ? (
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
              <Text style={styles.title}>{item.Oferta}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  offerContainer: {
    backgroundColor: '#b5b3b3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  titleContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 14,
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
  applyButtonColor: {
    alignSelf: 'stretch',
    backgroundColor: '#d5bf19',
    marginBottom: 20,
    borderRadius: 10,
    color :'#d5bf19',
  }
});

export default BlankScreen;      