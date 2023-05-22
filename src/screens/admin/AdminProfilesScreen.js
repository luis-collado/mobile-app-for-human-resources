import React, {useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { Button, FAB } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from '../../styles/admin/AdminProfilesStyles';

import useAdminProfilesController from '../../controllers/admin/AdminProfilesController';

const AdminProfilesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Obtiene información sobre la ruta actual

  const {
    users,
    selectedUser,
    handleSelectUser,
    handleGoBack,
    handleOpenCv,
  } = useAdminProfilesController(route.params?.selectedUser);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };


  if (selectedUser) {
    return (
      <View style={styles.container}>
          <Text style={styles.pageTitle}>Perfil de {selectedUser.Nombre}</Text>
        <ScrollView>
          {/* Detalles del usuario seleccionado */}
          <Text style={styles.title}>{selectedUser.nombre}</Text>
          <Text style={styles.description}>{selectedUser.correo}</Text>
          <View style={styles.profileImageContainer}>
          <Image
              style={styles.profileImage}
              source={
                selectedUser && selectedUser.foto_perfil
                  ? { uri: selectedUser.foto_perfil}
                  : require('../../assets/logo.png') // Reemplaza con la ruta de la imagen predeterminada
              }
            />

            
          </View>
          <Button onPress={() => handleOpenCv(selectedUser.CV)} style={styles.cvButton} color="#d5bf19">
              Ver CV
            </Button>

               {/* Mostrar el nombre primero */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Nombre:</Text>
              <Text style={styles.fieldValue}>{selectedUser.Nombre}</Text>
            </View>

            <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Apellidos:</Text>
            <Text style={styles.fieldValue}>{selectedUser.Apellido1} {selectedUser.Apellido2}</Text>
            </View>


          {Object.entries(selectedUser)
            .filter(([key]) => key !== 'Nombre' && key !== 'Apellido1' && key !== 'Apellido2' && key !== 'Referencia' && key !== 'correo' && key !== 'foto_perfil' && key !== 'CV' && key !== 'mis_ofertas')
            .map(([key, value]) => (
              <View style={styles.fieldContainer} key={key}>
                <Text style={styles.fieldLabel}>{key}:</Text>
                <Text style={styles.fieldValue}>{value}</Text>
              </View>
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
        <FAB
          style={styles.fab}
          icon="logout"
          onPress={handleLogout}
          label="Cerrar sesión"
        />
          <Text style={styles.text}>Perfiles de usuarios</Text>
          {users.map((user, index) => (
            <TouchableOpacity
              key={index}
              style={styles.userContainer}
              onPress={() => handleSelectUser(user)}
            >
              <Text style={styles.userName}>{user.Nombre+" "+user.Apellido1 + " " + user.Apellido2}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    );
  }
};


    
    export default AdminProfilesScreen;
