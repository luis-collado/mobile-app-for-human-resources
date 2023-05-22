import React from 'react';
import { View, StyleSheet, FlatList,Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles/admin/AdminOffersStyles';
import useAdminOffersController from '../../controllers/admin/AdminOffersController';

const AdminOffersScreen = () => {
  const {
    offers,
    selectedOffer,
    applicants,
    handleSelectOffer,
    handleGoBack,
    handleDeleteOffer,
    parseJsonOrReturnText,
  } = useAdminOffersController();

  const navigation = useNavigation();
  
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
          <View style={styles.container}>
            <Text style={styles.pageTitle}>Ofertas</Text>
            <Button
      onPress={() => navigation.navigate('CreateOffersScreen')}
      style={styles.createButton}
      >
      Crear Ofertas
      </Button>
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

      

export default AdminOffersScreen;